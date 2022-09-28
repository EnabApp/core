import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp, useUser } from "#imports";
import Conversation from "../models/Conversation";

export const useSupport = defineStore("support-store", {
  state: () => ({
    supportChannel: null,
    messages: [],

    isConnected: null,
    miniProfileState: false,
    isMessagesLoaded: false,
    isSendingMessage: false,
    newMessage: false,

    // Assistant
    conversations: [],
    selectedConversation: null,

    // conversations
    unSolvedConversations: [],
    solvedConversations: [],

    //profile
    profile: null,


  }),

  getters: {
    getConversations: (state) => state.conversations,
    getSelectedConversation: (state) => state.selectedConversation,
    getSelectedConversationId: (state) => state.selectedConversation?.id,
    getUnSolvedConversations: (state) => state.unSolvedConversations,
    getSolvedConversations: (state) => state.solvedConversations,

    getMessages: (state) => state.messages?.reverse(),
    hasNewMessage: (state) => state.newMessage,

    getProfile: (state) => state.profile,

  },

  actions: {
    // Join Support Channel
    async join() {
      const supabase = useSupabaseClient();
      const user = useUser();

      this.supportChannel = supabase.channel("support", {
        config: {
          presence: { key: user.value.id },
        },
      });

      this.supportChannel
        .on("presence", { event: "sync" }, () => this.changeOnlineState())
        .subscribe();
    },

    // Initiate Support Assistant Conversations Real Time Updates
    async initAssistant() {
      const supabase = useSupabaseClient();
      const user = useUser();

      supabase
        .channel("public:support_conversations")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "support_conversations",
            filters: `assistant_id=eq.null,eq.${user.value.id}`,
          },
          () => this.fetchUnSolvedConversations()
        )
        .subscribe((state) => {
          if (state === "SUBSCRIBED") this.isConnected = true;
          else this.isConnected = false;
        });
    },

    // // Fetch Support Assistant Conversations
    // async fetchConversations() {
    //   const supabase = useSupabaseClient();

    //   // let { data: conversations, error } = await supabase.functions.invoke('core-get-conversations', {
    //   //     body: JSON.stringify({ conversations_type: false }),
    //   // })
    //   // if (error) return error;
    //   // this.conversations = conversations.data?.map(conversation => new Conversation(conversation))

    //   const { data, error } = await supabase
    //     .from("support_conversations")
    //     .select(
    //       `id, assistant_id, user_id (id, username), support_messages(id, message)`
    //     )
    //     .limit(1, { foreignTable: "support_messages" })
    //     .order("id", { ascending: false, foreignTable: "support_messages" });
    //   //   .order('id', { ascending: false })
    //   if (data) {
    //     this.conversations = data;
    //     this.conversations.isOnline = false;
    //   }
    // },

    // Select Support Assistant Conversation
    async selectConversation(conversation) {
      const supabase = useSupabaseClient();
      const user = useUser();
      this.selectedConversation = conversation;
      if (!conversation.assistant_id) {
        const { data, error } = await supabase
          .from("support_conversations")
          .update({ assistant_id: user.value.id })
          .eq("id", conversation.id);
      }
    },

    // Unselect Support Assistant Conversation
    unselectConversation() {
      this.selectedConversation = null;
      this.messages = [];
    },

    // // Fetch Support Assistant Conversation Messages
    // async fetchMessages() {
    //   const supabase = useSupabaseClient();
    //   const { data, error } = await supabase
    //     .from("support_messages")
    //     .select("id, message, sender_id(id, username)")
    //     .eq("conversation_id", this.selectedConversation?.id)
    //     .order("id", { ascending: false })
    //     .limit(100);
    //   if (error) return error;
    //   this.messages = data;

    //   // Has message support
    //   // if (this.selectedConversation.support_messages[0]) {
    //   //     this.selectedConversation.support_messages[0].message = data[0]?.message;
    //   // }
    // },

    // Initiate Conversation Message for Support Assistant
    async initConversationMessages() {
      this.isMessagesLoaded = false;
      const supabase = useSupabaseClient();

      supabase
        .channel("public:support_messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "support_messages",
            filters: `conversation_id=${this.selectedConversation?.id}`,
          },
          () => {
            this.fetchMessages(this.selectedConversation?.id);
            this.newMessage = true;
          }
        )
        .subscribe((state) => {
          if (state === "SUBSCRIBED") {
            this.isMessagesLoaded = true;
          } else {
            this.isMessagesLoaded = false;
          }
        });
      await this.fetchMessages(this.selectedConversation?.id);
    },

    // Send Support Assistant Message to User
    async sendMessage(message) {
      this.isSendingMessage = false;

      const supabase = useSupabaseClient();
      const user = useUser();

      await supabase.from("support_messages").insert({
        conversation_id: this.selectedConversation?.id,
        message: message,
        sender_id: user.value.id,
      });

      this.isSendingMessage = true;
    },

    // Change online state
    async changeOnlineState() {
      const newState = this.supportChannel.presenceState();
      if (this.conversations) {
        this.conversations = this.conversations.map((conversation) => {
          newState[conversation.user_id.id]
            ? (conversation.isOnline =
                newState[conversation.user_id.id][0]?.isOnline)
            : (conversation.isOnline = false);
          return conversation;
        });
      }
    },

    //fetchUnSolvedConversations method
    async fetchUnSolvedConversations() {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-support-app', {
        body: JSON.stringify({ conversations_type: 1, function_number: 1 }),
      })
      if (error) return error;
      this.unSolvedConversations = data.data?.map(conversation => new Conversation(conversation))

    },

    //fetchSolvedConversations method
    async fetchSolvedConversations() {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-support-app', {
        body: JSON.stringify({ conversations_type: 2, function_number: 1 }),
      })
      if (error) return error;
      this.solvedConversations = data
    },

    //fetchProfile by id method
    async fetchProfile(id) {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-support-app', {
        body: JSON.stringify({ profile_id: id, function_number: 2 }),
      })
      if (error) return error;
      this.profile = data.data.profile

    },

    //closeConversation method
    async closeConversation(id) {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-support-app', {
        body: JSON.stringify({ conversation_id: id, function_number: 3 }),
      })
      if (error) return error;
      return data;
    },

    //setAssistant method
    async setAssistant(id) {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-support-app', {
        body: JSON.stringify({ conversation_id: id, function_number: 4 }),
      })
      if (error) return error;
      return data;
    },

    //fetchMessages method
    async fetchMessages(id) {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-support-app', {
        body: JSON.stringify({ conversation_id: id, function_number: 5 }),
      })
      if (error) return error;
      this.messages = data.data;
    },

       // startConversation method
    async startConversation(question, section_id) {
      const supabase = useSupabaseClient()
      let { data, error } = await supabase.functions.invoke('core-support-app', {
        body: JSON.stringify({ function_number: 6, question: question, section_id: section_id }),
      })
      if (error) return error
      console.log(data)
    },

    setNewMessage(state = false) {
      this.newMessage = state;
    },

    // Responsive Related
    showMiniProfile() {
      this.miniProfileState = true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupport, import.meta.hot));
}

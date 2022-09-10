import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp, useUser } from '#imports'
import Conversation from "../models/Conversation";

export const useSupport = defineStore("support-store", {
    state: () => ({
        supportChannel: null,
        messages: [],

        isConnected: null,
        miniProfileState: false,
        isMessagesLoaded: false,

        // Assistant
        conversations: [],
        selectedConversation: null,
    }),

    getters: {
        getConversations: state => state.conversations,
        getSelectedConversation: state => state.selectedConversation,
        getSelectedConversationId: state => state.selectedConversation?.id,

        getMessages: state => state.messages,
    },

    actions: {
        // Join Support Channel
        async join(){
            const supabase = useSupabaseClient()
            const user = useUser()

            this.supportChannel = supabase.channel("support", {
                config: {
                  presence: { key: user.value.id },
                },
            })

            this.supportChannel.on("presence", { event: "sync" }, () => this.changeOnlineState()).subscribe();
        },

        // Initiate Support Assistant Conversations Real Time Updates
        async initAssistant(){
            const supabase = useSupabaseClient()
            const user = useUser()

            supabase.channel("public:support_conversations")
                .on(
                    "postgres_changes",
                    {
                    event: "INSERT",
                    schema: "public",
                    table: "support_conversations",
                    filters: `assistant_id=eq.null,eq.${user.value.id}`,
                    },
                    () => this.fetchConversations()
                )
                .subscribe((state) => {
                    if (state === "SUBSCRIBED") this.isConnected = true;
                    else this.isConnected = false;
                })
        },

        // Fetch Support Assistant Conversations
        async fetchConversations() {
            const supabase = useSupabaseClient();

            // let { data: conversations, error } = await supabase.functions.invoke('core-get-conversations', {
            //     body: JSON.stringify({ conversations_type: false }),
            // })
            // if (error) return error;
            // this.conversations = conversations.data?.map(conversation => new Conversation(conversation))


            const { data, error } = await supabase
              .from("support_conversations")
              .select(`id, assistant_id, user_id (id, username)`);
            if (data) {
              this.conversations = data;
              this.conversations.isOnline = false;
            }
        },

        // Select Support Assistant Conversation
        async selectConversation(conversation){
            const supabase = useSupabaseClient();
            const user = useUser()
            this.selectedConversation = conversation;
            if (!conversation.assistant_id) {
                const { data, error } = await supabase
                  .from("support_conversations")
                  .update({ assistant_id: user.value.id })
                  .eq("id", conversation.id);
            }
        },

        // Unselect Support Assistant Conversation
        unselectConversation(){
            this.selectedConversation = null;
            this.messages = [];
        },

        // Fetch Support Assistant Conversation Messages
        async fetchMessages() {
            const supabase = useSupabaseClient()
            const { data, error } = await supabase
                .from("support_messages")
                .select("message, sender_id(id, username)")
                .eq("conversation_id", this.selectedConversation?.id);
            if (data) this.messages = data;
        },

        // Initiate Conversation Message for Support Assistant
        async initConversationMessages(){
            this.isMessagesLoaded = false
            const supabase = useSupabaseClient()
            
            supabase
                .channel("public:support_messages")
                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "support_messages",
                        filters: `conversation_id=${this.selectConversation?.id}`,
                    },
                    () => this.fetchMessages()
                )
                .subscribe((state) => {
                    if (state === "SUBSCRIBED") {
                        this.isMessagesLoaded = true;
                    } else {
                        this.isMessagesLoaded = false;
                    }
                });
            await this.fetchMessages()

        },

        // Send Support Assistant Message to User
        async sendMessage(message){
            const supabase = useSupabaseClient()
            const user = useUser()

            await supabase
                .from("support_messages")
                .insert({
                    conversation_id: this.selectConversation?.id,
                    message: message.value,
                    sender_id: user.value.id,
            });
        },


        // Change online state
        async changeOnlineState(){
            const newState = this.supportChannel.presenceState();
            if (this.conversations){
                this.conversations = this.conversations.map((conversation) => {
                    newState[conversation.user_id.id]
                    ? (conversation.isOnline = newState[conversation.user_id.id][0]?.isOnline)
                    : (conversation.isOnline = false);
                    return conversation;
                });
            }
        },





        // Responsive Related
        showMiniProfile(){
            this.miniProfileState = true;
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSupport, import.meta.hot));
}
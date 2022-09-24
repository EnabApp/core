export default class Conversation {
    id: string;
    user: any;
    assistant_id: string;
    created_at: string;
    isOnline: boolean;
    notReadMessages: number;
    support_messages: any;

    constructor(args) {
      this.id = args?.id;
      this.user = args?.user;
      this.assistant_id = args?.assistant_id;
      this.created_at = args?.created_at;
      this.support_messages = args?.support_messages;
    }
  }

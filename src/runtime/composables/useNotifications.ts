import { acceptHMRUpdate, defineStore } from "pinia";
import { useSupabaseClient, useNuxtApp, useUser } from '#imports'

type Notification = {
    user_id: String,
    app_id: Number,
    datas: Object,
    message: String,
    title: String,
    dates?: Date,
    notSeen?: Boolean,
}

export const useNotifications = defineStore("notifications-store", {
    state: () => ({
        data: null,
        notifications: [],
        connected: false,
        toasts: [],
    }),

    getters: {
        getNotificationsObject: state => state.data,
        getNotifications: state => state.notifications,
        getShowedNotifications: state => state.notifications.filter((notification: Notification) => notification.showed),
        isConnected: state => state.connected,
        getNotSeenLength: state => state.notifications.filter(notification => notification.notSeen)?.length,
    },

    actions: {
        join() {
            const supabase = useSupabaseClient()
            const notifications = supabase
                .from('notifications')
                .on('INSERT', payload => this.recieveNotification(payload.new))
                .subscribe(async (state) => {
                    if (state === 'SUBSCRIBED') {
                        this.connected = true
                    } else {
                        this.connected = false
                    }
                })
            
                
            this.data = notifications
            this.fetch()
        },

        async fetch() {
            const supabase = useSupabaseClient()
            let { data: notifications, error } = await supabase
                .from('notifications')
                .select('*')
                .limit(10)
                .lte('dates', new Date().toISOString())
                .order('id', { ascending: false })

            this.notifications = notifications
        },
        
        recieveNotification(newNotification){
            newNotification.notSeen = true
            this.notifications.unshift(newNotification)
        },

        async sendNotification(notification: Notification){
            const user = useUser()
            const supabase = useSupabaseClient()

            let { data, error } = await supabase.rpc('sendNotification', notification)
            return data || error
        },

        setSeenAll(){
            this.notifications.forEach(notification => notification.notSeen = false)
        }
    }
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useNotifications, import.meta.hot));
}
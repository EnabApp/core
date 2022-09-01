import { acceptHMRUpdate, defineStore } from "pinia";
import App from "../classes/App"
import Widget from "../classes/Widget"
import { useSupabaseClient, useNuxtApp, useUser, useRouter } from '#imports'

export const useUserProfile = defineStore("user-profile", {
    state: () => ({
        data: null
    }),

    getters: {
        getProfile: state => state.data,
        getUsername: state => state.data?.username
    },

    actions: {
        async fetch() {
            const supabase = useSupabaseClient()
            const user = useUser()
            const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
            if (error) {
                const { $toast } = useNuxtApp()
                $toast.error('حدث خطأ اثناء تحميل الملف الشخصي')
                return;
            }

            if (data) {
                this.data = data
            }
        },

        async updateUsername(username: String) {
            const { $toast } = useNuxtApp()
            const supabase = useSupabaseClient()
            const user = useUser()

            const { data, error } = await supabase.from('profiles').update({
                username: username
            }).eq('id', user.value.id).single()

            if (error) {
                $toast.error('حدث خطأ اثناء تحديث الأسم')
                return false;
            }

            this.data = data
            return true;
        },

        async updateProfile(properties) {
            const supabase = useSupabaseClient()
            const user = useUser()

            const { data, error } = await supabase.from('profiles').update(properties).match({ id: user.value.id })

            if (error) {
                const { $toast } = useNuxtApp()
                $toast.error('حدث خطأ اثناء تحديث الملف الشخصي')
                return;
            }
        },
        async logout() {
            const supabase = useSupabaseClient();
            const router = useRouter();
            const { error } = await supabase.auth.signOut()
            if (error) {
                const { $toast } = useNuxtApp()
                $toast.error('حدث خطأ اثناء تسجيل الخروج')
                return;
            }
            router.push('/auth')
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserProfile, import.meta.hot));
}
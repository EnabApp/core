import { acceptHMRUpdate, defineStore } from "pinia";
import App from "../models/App"
import Widget from "../models/Widget"
import { useSupabaseClient, useNuxtApp, useUser, useRouter } from '#imports'

export const useUserProfile = defineStore("user-profile", {
    state: () => ({
        data: null,
        userProtected: null
    }),

    getters: {
        getProfile: state => state.data,
        getUsername: state => state.data?.username,
        getPoints: state => state.userProtected?.points,
        isSupport: state => state.userProtected?.is_support
    },

    actions: {
        async fetch() {
            const supabase = useSupabaseClient()
            const user = useUser()
            const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
            const { data: userProtected, error: userProtectedError } = await supabase.from('user_protected').select('*').single()
            if (error) {
                console.log('حدث خطأ اثناء تحميل الملف الشخصي')
                return;
            }
            if (userProtectedError) {
                console.log('حدث خطأ اثناء تحميل المعلومات المحمية')
                return;
            }

            if (data) this.data = data
            if (userProtected) this.userProtected = userProtected
        },

        async updateUsername(username: String) {
            // const { $toast } = useNuxtApp()
            const supabase = useSupabaseClient()
            const user = useUser()

            const { data, error } = await supabase.from('profiles').update({
                username: username
            }).eq('id', user.value.id).single()

            if (error) {
                console.log('حدث خطأ اثناء تحديث الأسم')
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
                // const { $toast } = useNuxtApp()
                console.log('حدث خطأ اثناء تحديث الملف الشخصي')
                return;
            }
        },
        async logout() {
            const supabase = useSupabaseClient();
            const router = useRouter();
            const { error } = await supabase.auth.signOut()
            if (error) {
                // const { $toast } = useNuxtApp()
                console.log('حدث خطأ اثناء تسجيل الخروج')
                return;
            }
            router.push('/auth')
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUserProfile, import.meta.hot));
}
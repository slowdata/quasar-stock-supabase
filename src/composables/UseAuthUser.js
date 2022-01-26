import { ref } from 'vue'

import useSupabase from 'boot/supabase'

let user = ref(null)

export default function useAuthUser() {

    const { supabase } = useSupabase()

    let login = async ({ email, password }) => {
        let { user, error } = await supabase.auth.signIn({ email, password })
        if (error) throw error
        return user
    }

    let loginWithSocialProvider = async (provider) => {
        let { user, error } = await supabase.auth.signIn({ provider })
        if (error) throw error
        return user
    }


    let logout = async () => {
        let { error } = await supabase.auth.signOut()

        if (error) throw error

    }

    let isLoggedIn = () => {
        return !!user.value
    }

    let register = async ({ email, password, ...meta }) => {
        const { user, error } = await supabase.auth.signUp({ email, password }, {
            data: meta,
            redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation`
        })

        if (error) throw error

        return user
    }


    let update = async (data) => {
        let { user, error } = await supabase.auth.update(data)
        if (error) throw error
        return user
    }

    let sendPasswordResetEmail = async (email) => {
        let { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
        if (error) throw error
        return user
    }

    const resetPassword = async (accessToken, newPassword) => {
        const { user, error } = await supabase.auth.api.updateUser(
            accessToken,
            { password: newPassword }
        )
        if (error) throw error;
        return user
    }


    return {
        user,
        login,
        loginWithSocialProvider,
        logout,
        isLoggedIn,
        register,
        update,
        sendPasswordResetEmail,
        resetPassword
    }
}
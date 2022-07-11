<template>
    <div class="form-signin">
        <form @submit.prevent="handleSubmit">
            <div class="error mb-2">{{error}}</div>
            <div class="form-floating mb-2">
                <input id="floatingEmail" v-model="email" type="email" required class="form-control" placeholder="mein.name@iubh-fernstudium.com">
                <label for="floatingEmail">Meine IU E-Mail-Adresse</label>
            </div>
            <button id="reset-password" class="w-100 btn btn-lg btn-primary" type="submit">Passwort erneuern</button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import useResetPassword from "../composables/useResetPassword";
export default {
    setup(props, context) {
        const email = ref("");
        const { error, resetPassword } = useResetPassword();
        const handleSubmit = async () => {
            await resetPassword(email.value);
            if (!error.value) {
                context.emit("resetPassword");
            }
        };
        return { email, resetPassword, handleSubmit, error };
    },
};
</script>

<style>
</style>
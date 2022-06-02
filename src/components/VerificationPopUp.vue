<template>
    <div class="container" id="VerificationPopUp">
        <div>
            <h1>Verfiziere deine E-Mail</h1>
            <img src="../assets/mail-verification.svg" width="200" />
            <br />
            <p>
                Du musst deine E-Mail-Adresse verfizieren, um deine
                Registrierung abzuschließen. Dazu haben wir eine E-Mail mit
                Verfizierungslink an Deine E-Mail-Adresse {{ email }} gesendet.
                Bitte bestätigen Sie diese.
            </p>
            <button type="button" @click="toLogin" class="btn btn-primary">
                Zum Login
            </button>
        </div>
    </div>
</template>

<script>
export default {
    setup(props, context) {
        const toLogin = () => {
            context.emit("toLoginComponent");
        };

        return { toLogin };
    },
};
</script>

<style>
</style>
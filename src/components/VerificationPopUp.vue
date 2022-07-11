<template>
    <div id="VerificationPopUp" class="container">
        <div>
            <h1>Verifiziere Deine E-Mail</h1>
            <img src="../assets/mail-verification.svg" width="200" />
            <br />
            <p>
                Du musst Deine E-Mail-Adresse verifizieren, um Deine
                Registrierung abzuschließen. Dazu haben wir eine E-Mail mit
                Verifizierungslink an Deine E-Mail-Adresse {{ email }} gesendet.
                Bitte bestätige diese. Es könnte sein, dass die E-Mail in Deinem Spam-Ordner landet.
            </p>
            <button type="button" class="btn btn-primary" @click="toLogin">
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
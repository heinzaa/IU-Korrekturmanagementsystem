<template>
    <div id="template">
        <TemplateHeader />
        <div class="container content-small">
            <h1>Mein Konto</h1>
            <hr />
            <p>Diese folgenden Kontodaten können lediglich eingesehen, jedoch nicht geändert werden.</p>
            <!-- Kontodaten -->
            <div class="form-signin">
                <div class="error mb-2">{{error}}</div>
                <div class="form-floating mb-2">
                    <input type="text" required class="form-control" id="floatingEmail" value="Max" readonly>
                    <label for="floatingEmail">Name</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="email" required class="form-control" id="floatingEmail" value="mein.name@iubh-fernstudium.de" readonly>
                    <label for="floatingEmail">IU E-Mail-Adresse</label>
                </div>
            </div>
            <p>&nbsp;</p>

            <!-- Passwort Formular -->
            <div class="form-signin">
                <h3 style="text-align:center;">Passwort ändern</h3>
                <form>
                    <div class="error mb-2">{{error}}</div>
                    <div class="form-floating mb-3">
                        <input type="password" required class="form-control" id="floatingPassword1" placeholder="Aktuelles Passwort" v-model="password">
                        <label for="floatingPassword1">Aktuelles Passwort</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" required class="form-control" id="floatingPassword2" placeholder="Neues Passwort" v-model="password">
                        <label for="floatingPassword2">Neues Passwort</label>
                    </div>
                    <button class="w-100 btn btn-primary" type="submit">Übernehmen</button>
                </form>
            </div>
            <p>&nbsp;</p>
            <hr />
            <p>&nbsp;</p>

            <!-- Konto-Löschung -->
            <p style="text-align:center;">
                <button type="button" class="btn btn-outline-secondary" onclick="alert('Im Prototyp (noch) nicht implementiert.');">Benutzerkonto löschen?</button>
            </p>
        </div>
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import { useRouter } from "vue-router";
export default {
    components: {
        TemplateHeader,
        TemplateFooter
    },
    mounted(){
        document.querySelector('#mainmenu li a').classList.remove('active');
        document.getElementById('navbarDropdownAccount').classList.add('active');
    },
    setup() {
    
    },
};
</script>

<style>
</style>
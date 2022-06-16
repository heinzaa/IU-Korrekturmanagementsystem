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
                    <input type="text" required class="form-control" id="floatingEmail" v-model="user.displayName" readonly>
                    <label for="floatingEmail">Vorname</label>
                </div>
                <div class="form-floating mb-2">
                    <input type="email" required class="form-control" id="floatingEmail" v-model="user.email" readonly>
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
                        <input type="password" required class="form-control" id="floatingPassword1" placeholder="Aktuelles Passwort" v-model="passwordOld">
                        <label for="floatingPassword1">Aktuelles Passwort</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" required class="form-control" id="floatingPassword2" placeholder="Neues Passwort" v-model="passwordNew">
                        <label for="floatingPassword2">Neues Passwort</label>
                    </div>
                     <div class="form-floating mb-3">
                        <input type="password" required class="form-control" id="floatingPassword2" placeholder="Neues Passwort" v-model="passwordNewControl">
                        <label for="floatingPassword2">Passwort wiederholen</label>
                    </div>
                    <div>
                    <p v-if="passwordNewEqualsOld"> Passwort Neu darf nicht das Alte sein </p>
                    <p v-else-if="passwordNewEqualsControl"> Die neuen Passwörter stimmen nicht überein </p>
                    </div>
                    <div>
                    <button v-if="!isPending" class="w-100 btn btn-primary" @click="changePassword" type="submit">Übernehmen</button>
                    <button v-else class="w-100 btn btn-primary" disabled @click="changePassword" type="submit">Password update...</button>
                    </div>
                </form>
            </div>
            <p>&nbsp;</p>
            <hr />
            <p>&nbsp;</p>

            <!-- Konto-Löschung -->
            <div style="text-align:center;">
                <button id="buttonForConfirm" type="button" class="btn btn-outline-secondary" onclick="document.getElementById('confirmArea').style.display='block'; this.style.display='none';">Benutzerkonto löschen?</button>
                <div id="confirmArea" style="display:none;">
                    <h3>Konto wirklich löschen?</h3>
                    <p>Mit der Löschung deines Benutzerkontos werden deine Kontodaten sowie eingereichte Tickets gelöscht. Der Vorgang kann nicht rückgängig gemacht werden.
                        Anschließend ist eine Neuregistrierung jederzeit wieder möglich.
                    </p>
                    <button id="deleteUser" type="button" class="btn btn-danger" @click="deleteUserAccount">Löschung durchführen</button>
                    <div class="mb-3"></div>
                    <button type="button" class="btn btn-outline-secondary" onclick="document.getElementById('buttonForConfirm').style.display='inline-block'; this.parentNode.style.display='none';">Abbrechen</button>
                </div>
            </div>
            <div v-if="deleteUserError" class="error">{{deletionFailed}}</div>
            <p>&nbsp;</p>
        </div>
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import { useRouter } from "vue-router";
import getUser from "../composables/getUser";
import { ref } from "@vue/reactivity";
import useDeleteUser from "../composables/useDeleteUser";

import useUpdatePassword from "../composables/useUpdatePassword";

export default {
    components: {
        TemplateHeader,
        TemplateFooter,
    },
    mounted() {
        document.querySelector("#mainmenu li a").classList.remove("active");
        document
            .getElementById("navbarDropdownAccount")
            .classList.add("active");
    },
    setup() {
        const router = useRouter();
        const { error, updatePassword } = useUpdatePassword();
        const { user } = getUser();
        const passwordOld = ref("");
        const passwordNew = ref("");
        const passwordNewControl = ref("");
        const passwordNewEqualsOld = ref(false);
        const passwordNewEqualsControl = ref(false);
        const isPending = ref("");

        const { deleteUserError, deleteUserHehe, isPendingDeleteUser } =
            useDeleteUser();

        const changePassword = async () => {
            isPending.value = true;

            if (passwordOld.value == passwordNew.value) {
                passwordNewEqualsOld.value = true;
                passwordNewEqualsControl.value = false;
            }
            if (passwordNew.value != passwordNewControl.value) {
                passwordNewEqualsControl.value = true;
                passwordNewEqualsOld.value = false;
            }

            await updatePassword(passwordNew.value);

            isPending.value = false;
        };

        const deleteUserAccount = async () => {
            await deleteUserHehe();
            router.push('/');
        };

        return {
            user,
            passwordOld,
            passwordNew,
            passwordNewControl,
            passwordNewEqualsOld,
            passwordNewEqualsControl,
            isPending,
            changePassword,
            deleteUserAccount,
            deleteUserError,
        };
    },
};
</script>

<style>
</style>
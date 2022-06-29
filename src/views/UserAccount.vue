<template>
    <div id="template">
        <TemplateHeader />
        <div class="container content-small">
            <h1>Mein Konto</h1>
            <hr />
            <p>Diese folgenden Kontodaten können lediglich eingesehen, jedoch nicht geändert werden.</p>
            <!-- Kontodaten -->
            <div class="form-signin">
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
                        <input v-bind:type="[showPasswordOld ? 'text' : 'password']" required class="form-control" id="floatingPassword1" placeholder="Aktuelles Passwort" v-model="passwordOld">
                        <span class="showPasswordIcon" @click="showPasswordOld = !showPasswordOld">
                            <b-icon-eye v-if="!showPasswordOld"></b-icon-eye>
                            <b-icon-eye-slash v-if="showPasswordOld"></b-icon-eye-slash>
                        </span>
                        <label for="floatingPassword1">Aktuelles Passwort</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-bind:type="[showPasswordNew ? 'text' : 'password']" required class="form-control" id="floatingPassword2" placeholder="Neues Passwort" v-model="passwordNew">
                        <span class="showPasswordIcon" @click="showPasswordNew = !showPasswordNew">
                            <b-icon-eye v-if="!showPasswordNew"></b-icon-eye>
                            <b-icon-eye-slash v-if="showPasswordNew"></b-icon-eye-slash>
                        </span>
                        <label for="floatingPassword2">Neues Passwort</label>
                    </div>
                     <div class="form-floating mb-3">
                        <input v-bind:type="[showPasswordNewControl ? 'text' : 'password']" required class="form-control" id="floatingPassword3" placeholder="Neues Passwort" v-model="passwordNewControl">
                        <span class="showPasswordIcon" @click="showPasswordNewControl = !showPasswordNewControl">
                            <b-icon-eye v-if="!showPasswordNewControl"></b-icon-eye>
                            <b-icon-eye-slash v-if="showPasswordNewControl"></b-icon-eye-slash>
                        </span>
                        <label for="floatingPassword3">Passwort wiederholen</label>
                    </div>
                    <div>
                    <p v-if="passwordNewEqualsOld" class="error">Neues Passwort darf nicht das Alte sein.</p>
                    <p v-else-if="passwordNewEqualsControl" class="error">Die neuen Passwörter stimmen nicht überein.</p>
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
                    <p>Mit der Löschung deines Benutzerkontos werden deine Kontodaten gelöscht, deine Tickets stehen dir nicht mehr zur Verfügung. Der Vorgang kann nicht rückgängig gemacht werden.
                        Eine Neuregistrierung ist jederzeit wieder möglich.
                    </p>
                    <p class="error">{{deleteAccountErrorTutor}}</p>
                    <button id="deleteUser" type="button" class="btn btn-danger" @click="deleteUser">Löschung durchführen</button>
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
import tutor_course from "../assets/tutor_course.json";

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
        const showPasswordNewControl = ref(false);
        const showPasswordNew = ref(false);
        const showPasswordOld = ref(false);
        const deleteAccountErrorTutor = ref('')


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

        // Tutor kann seinen Account nicht selbst löschen 
        const deleteUser = async () => {
              let emailValid = tutor_course.find(item => item.email === user.value.email);

              if(emailValid){
                  deleteAccountErrorTutor.value = 'Tutoren können ihr Benutzerkonto nicht selbst löschen.'
              }
              else{
                  await deleteUserHehe();
                  router.push('/');
              }
        }
        

        

        return {
            user,
            error,
            deleteAccountErrorTutor,
            passwordOld,
            passwordNew,
            passwordNewControl,
            passwordNewEqualsOld,
            passwordNewEqualsControl,
            isPending,
            changePassword,
            deleteUser,
            deleteUserError,
            showPasswordNewControl,
            showPasswordNew,
            showPasswordOld
        };
    },
};
</script>

<style>
</style>
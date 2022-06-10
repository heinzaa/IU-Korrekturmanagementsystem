<template>
    <div id="template">
        <TemplateHeaderStudent />
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
            <p style="text-align:center;">
                <button type="button" class="btn btn-outline-secondary" onclick="alert('Im Prototyp (noch) nicht implementiert.');">Benutzerkonto löschen?</button>
            </p>
        </div>
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeaderStudent from "../components/TemplateHeaderStudent.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import { useRouter } from "vue-router";
import getUser from '../composables/getUser'
import { ref } from "@vue/reactivity";
import { projectAuth } from '../firebase/config';
import useUpdatePassword from '../composables/useUpdatePassword';

export default {
    components: {
        TemplateHeaderStudent,
        TemplateFooter
    },
    mounted(){
        document.querySelector('#mainmenu li a').classList.remove('active');
        document.getElementById('navbarDropdownAccount').classList.add('active');
    },
    setup() {
        
        
        const { error, updatePassword } = useUpdatePassword();
        const { user } = getUser();
        const passwordOld = ref('');
        const passwordNew = ref('');
        const passwordNewControl = ref('');
        const passwordNewEqualsOld = ref(false);
        const passwordNewEqualsControl = ref(false);   
        const isPending = ref('');
        

        

       const changePassword = async() => {     
            
            isPending.value = true;

           if(passwordOld.value == passwordNew.value ){
               passwordNewEqualsOld.value = true;
               passwordNewEqualsControl.value = false;
               
           }
           if(passwordNew.value != passwordNewControl.value){
               passwordNewEqualsControl.value = true
               passwordNewEqualsOld.value = false;
               
           } 

           await updatePassword(passwordNew.value); 

            isPending.value = false;
            

       }



       return { user, passwordOld, passwordNew, passwordNewControl, passwordNewEqualsOld, passwordNewEqualsControl, isPending, changePassword }

       

    
    },
};
</script>

<style>
</style>
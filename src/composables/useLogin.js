import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import getUser from '../composables/getUser'
import useIsTutor from '../composables/useIsTutor';
import useLogout from './useLogout';



const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {

    const { user } = getUser()
    const { isTutor } = useIsTutor();
    const { logout } = useLogout();
    console.log("🚀 ~ file: useLogin.js ~ line 15 ~ login ~ isTutor", isTutor)

    error.value = null;
    isPending.value = true;

    

    try {

        
        const res = await projectAuth.signInWithEmailAndPassword(email, password);
       
        // prüfen ob User verified - aber nur falls es kein Tutor ist
        if(isTutor.value == true){  
            
            error.value = null;
            isPending.value = false;            
            return res;
        }
        

        else if (res.user.emailVerified) {
           
            error.value = null;
            isPending.value = false;            
            return res;
        }
        else {
            await logout();       
            error.value = 'Du musst zuerst Deine E-Mail-Adresse verifizieren.'
            isPending.value = false;
        }
    } catch (err) {        
        error.value = 'Ungültige Anmeldedaten oder bereits angemeldet!';
        isPending.value = false;
    }

}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin
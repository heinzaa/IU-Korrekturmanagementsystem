import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import getUser from '../composables/getUser'
import useIsTutor from '../composables/useIsTutor';


const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {

    const { user } = getUser()
    const { isTutor } = useIsTutor();

    error.value = null;
    isPending.value = true;

    try {


        // prüfen ob User verified - aber nur falls es kein Tutor ist
        if(isTutor){               

            const res = await projectAuth.signInWithEmailAndPassword(email, password);
            error.value = null;
            isPending.value = false;
            return res;


        }

        if (res.user.emailVerified) {
            error.value = null;
            isPending.value = false;
            return res;
        }
        else {
            error.value = 'Du musst zuerst Deine E-Mail-Adresse verifizieren.'
            isPending.value = false;
        }
    } catch (err) {
        console.log(err.value);
        error.value = 'Ungültige Anmeldedaten oder bereits angemeldet!';
        isPending.value = false;
    }

}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin
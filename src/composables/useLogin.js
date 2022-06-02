import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import getUser from '../composables/getUser'

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {

    const { user } = getUser()

    error.value = null;
    isPending.value = true;

    try {


        // prüfen ob User verified


        const res = await projectAuth.signInWithEmailAndPassword(email, password);

        if (res.user.emailVerified) {
            error.value = null;
            isPending.value = false;
            return res;
        }
        else {
            error.value = 'Du musst zuerst Deine E-Mail-Adresse verfizieren.'
            isPending.value = false;
        }
    } catch (err) {
        console.log(err.value);
        error.value = 'Ungültige Anmeldedaten!';
        isPending.value = false;
    }

}

const useLogin = () => {
    return { error, login, isPending }
}

export default useLogin
import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import { useRouter } from 'vue-router';
import getUser from '../composables/getUser';
const error = ref(null)
const email = ref(null);
const isPending = ref(false);
const router = useRouter();

const signup = async (email, password, displayName) => {

    error.value = null;
    isPending.value = true;
  
    /* Diese E-Mail-Endungen überprüfen */
    const validEmailDomains = ['iubh-fernstudium.de', 'iu-fernstudium.de', 'iubh.de', 'iu.org'];
    const regexEmail = '[^@]+@(' + validEmailDomains.join('|') + ')';
    let regex_iubh = new RegExp(regexEmail);
   
    console.log(passwordLength)
    const { user } = getUser();

    if(password.length < 8){
        error.value = 'Passwort muss mind. 8 Stellen haben.'
        return;
    } 
    else{       
        try {          
            
            const response = await projectAuth
                .createUserWithEmailAndPassword(email, password);

            await response.user.sendEmailVerification({
                url: "https://korrekturmanagement.de"
                });
        

            if (!response) {
                throw new Error('Could not Sign up!');
            }

            await response.user.updateProfile({ displayName });
            error.value = null;
            isPending.value = false;
            return response
        } catch (err) {
            console.log(err.message);
            error.value = "Die Email Adresse existiert bereits, wurder aber noch nicht bestätigt." // err.message;
            isPending.value = false;
        }
    }

}

const useSignup = () => {
    return { error, signup, isPending }
}

export default useSignup
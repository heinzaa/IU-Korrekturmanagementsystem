import { ref } from 'vue'
import { projectAuth } from '../firebase/config'


const error = ref(null)

const isPending = ref(false);


const signup = async (email, password, displayName) => {

    error.value = null;
    isPending.value = true;
  
    /* Diese E-Mail-Endungen überprüfen */
    const validEmailDomains = ['iubh-fernstudium.de', 'iu-fernstudium.de', 'iubh.de', 'iu.org'];
    const regexEmail = '[^@]+@(' + validEmailDomains.join('|') + ')';
    let regex_iubh = new RegExp(regexEmail);
 
    console.log(regex_iubh + "true:" + regex_iubh != email)

    
    if(!regex_iubh.test(email)){
        error.value = "Die Email-Domaine muss aus einer der folgenden Domainen sein: iubh-fernstudium.de, iu-fernstudium.de, iubh.de, iu.org.";
        return;
    }

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
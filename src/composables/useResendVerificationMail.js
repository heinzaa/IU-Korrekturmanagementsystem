import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import getUser from '../composables/getUser'

const error = ref(null)

const resendVerificationMail = async (email, password) => {

    error.value = null;

    try{
        const { user } = getUser();

        //const res = await projectAuth.signInWithEmailAndPassword(email, password);
        
        await user.value.sendEmailVerification({
            url: "https://korrekturmanagement.de"
            });
      
        console.log(response);
        return response;
    }catch(err){
        console.log(err.value);
        error.value = 'Incorrect email';
    }

}

const useResendVerification = () => {
    return { error, resendVerificationMail }
}

export default useResendVerification
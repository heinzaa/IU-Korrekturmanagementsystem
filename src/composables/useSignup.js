import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

const signup = async (email, password, displayName) => {
    error.value = null

    

    try{

      const response =   await projectAuth
        .createUserWithEmailAndPassword(email, password);
        
        // Route to return to -> domain name
        await response.user.sendEmailVerification({
            url: "http://localhost:8081"
        });
        
      if(!response){
            throw new Error('Could not Sign up!');
        }
        await response
        await response.user.updateProfile({ displayName });
        error.value = null;
        return response
    }catch(err){

        console.log(err.message);
        error.value = err.message;

    }



}

const useSignup = () => {
    return { error, signup }
}

export default useSignup
import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const email = ref(null);
const isPending = ref(false);

const signup = async (email, password, displayName) => {

    error.value = null;
    isPending.value = true;
  

    let regex_student = new RegExp('[a-z0-9]+@iubh-fernstudium.de')
    let regex_tutor = new RegExp('[a-z0-9]+@iubh-tutor.de')
   
    
    
 

    try{

      const response =   await projectAuth
        .createUserWithEmailAndPassword(email, password);      

        // Route to return to -> domain name
        await response.user.sendEmailVerification({
            url: "http://localhost:8080/Dashboard"
        });
        
      if(!response){
            throw new Error('Could not Sign up!');
        }
       
       // await response.user.updateProfile({ displayName });
        error.value = null;
        isPending.value = false;
        return response
    }catch(err){

        console.log(err.message);
        error.value = err.message;
        isPending.value = false;

    }



}

const useSignup = () => {
    return { error, signup, isPending }
}

export default useSignup
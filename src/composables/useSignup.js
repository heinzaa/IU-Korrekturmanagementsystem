import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const email = ref(null);

const signup = async (email, password, displayName) => {

    error.value = null;
  

    let regex_student = new RegExp('[a-z0-9]+@iubh-fernstudium.de')
    let regex_tutor = new RegExp('[a-z0-9]+@iubh-tutor.de')
   
    
    
    
   /* if(!regex_student.test(email)){
        console.log(email)
        console.log(regex_tutor.test(email))
        error.value = "Falsches Pattern";
        return  error;
    }; */

    try{

      const response =   await projectAuth
        .createUserWithEmailAndPassword(email, password);      

        // Route to return to -> domain name
        await response.user.sendEmailVerification({
            url: "http://localhost:8081/Dashboard"
        });
        
      if(!response){
            throw new Error('Could not Sign up!');
        }
       
       // await response.user.updateProfile({ displayName });
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
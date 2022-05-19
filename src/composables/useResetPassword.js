import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)

const resetPassword = async (email) => {

    error.value = null;

    try{
        const response = await projectAuth.sendPasswordResetEmail(email, { url:"http://localhost:8081" })
        console.log(response);
        return response
    }catch(err){
        console.log(err.value)
        error.value = 'Incorrect email'
    }

}

const useResetPassword = () => {
    return { error, resetPassword }
}

export default useResetPassword
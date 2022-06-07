import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)


const updatePassword = async (newPassword) => {

    error.value = null;

    try{
        const response = await projectAuth.currentUser.updatePassword(newPassword)
        console.log(response);
        return response;
    }catch(err){
        console.log(err.value)
        error.value = 'Update fehlgeschlagen, es muss mind. 8 Stellen haben.'
    }
}

const useUpdatePassword = () => {
    return { error, updatePassword }
}

export default useUpdatePassword
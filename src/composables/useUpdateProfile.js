import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)


const updateDisplayName = async (displayName) => {

    error.value = null;

    try{
        const response = await projectAuth.currentUser.updateProfile({displayName: displayName})
        console.log(response);
        return response;
    }catch(err){
        console.log(err.value)
        error.value = 'Update des Benutzernamen fehlgeschlagen.'
    }
}

const useUpdateDisplayName = () => {
    return { error, updateDisplayName }
}

export default useUpdateDisplayName
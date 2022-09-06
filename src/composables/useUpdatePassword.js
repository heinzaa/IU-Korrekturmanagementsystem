import { ref } from 'vue'
import { projectAuth } from '../firebase/config'


const error = ref(null)


const updatePassword = async (newPassword) => {

    error.value = null;

    try{
        const auth = projectAuth;

        const user = auth.currentUser;

        
        
        await user.updatePassword(newPassword);

        error.value = "Passwort erfolgreich aktualisiert."

        //return error.value;
        return error.value;
    }catch(err){
        
        if(newPassword.length < 8 ){
        error.value = 'Update fehlgeschlagen, es muss mind. 8 Stellen haben.'
        }
        else{
            error.value = err
        }
    }
}

const useUpdatePassword = () => {
    return { error, updatePassword }
}

export default useUpdatePassword
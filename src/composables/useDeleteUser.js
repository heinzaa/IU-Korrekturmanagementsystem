import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import 'firebase/auth'



const deleteUserError = ref(null);
const isPending = ref(false);


const deleteUserHehe = async () => {

  

    deleteUserError.value = null;
    isPending.value = true;


    try {
       
       await projectAuth.currentUser.delete()
       
       
    } catch (err) {
      
        deleteUserError.value = "Konto konnte nicht gelöscht werden!";
        isPending.value = false;
    }

}

const useDeleteUser = () => {
   
    return { deleteUserError, deleteUserHehe, isPending }
}

export default useDeleteUser
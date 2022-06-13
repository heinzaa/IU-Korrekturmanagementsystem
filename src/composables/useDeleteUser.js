import { ref } from 'vue'
import { projectAuth } from '../firebase/config'
import { useRouter } from 'vue-router';
import getUser from '../composables/getUser'
import 'firebase/auth'



const deleteUserError = ref(null);
const isPending = ref(false);
const router = useRouter();

const deleteUserHehe = async () => {

  

    deleteUserError.value = null;
    isPending.value = true;

    console.log("ich komme hier nicht rein")

    try {
       
       await projectAuth.currentUser.delete()
       
       
    } catch (err) {
        console.log(err.value);
        deleteUserError.value = "Konto konnte nicht gelöscht werden!";
        isPending.value = false;
    }

}

const useDeleteUser = () => {
   
    return { deleteUserError, deleteUserHehe, isPending }
}

export default useDeleteUser
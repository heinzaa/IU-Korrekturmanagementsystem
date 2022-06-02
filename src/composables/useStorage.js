import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser();


const useStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);


    // Wher to store in storage
    const uploadImage = async (file) => {
        filePath.value = `tickets/ticket-${user.value.uid}/${file.name}`;
        const storageRef = projectStorage.ref(filePath.value);

        try{

            const res = await storageRef.put(file);
            url.value = res.ref.getDownloadURL();

        }
        catch(error){
            error.value = error.message;

        }
    }


    return { url, filePath, error, uploadImage }
}

export default useStorage
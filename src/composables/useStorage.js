import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser();


const useStorage = () => {
    const error = ref(null);
    const url = ref(null);
    const filePath = ref(null);


    // Wher to store in storage
    const uploadFile = async (file) => {
        filePath.value = `anhaenge/user-${user.value.uid}/${file.name}`;
        const storageRef = projectStorage.ref(filePath.value);

        try{

            const res = await storageRef.put(file);
            url.value = await res.ref.getDownloadURL();

        }
        catch(error){
            error.value = error.message;

        }
    }


    return { url, filePath, error, uploadFile }
}

export default useStorage
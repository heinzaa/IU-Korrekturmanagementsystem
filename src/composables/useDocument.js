import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'


const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false);

    let documentRef = projectFirestore.collection(collection).doc(id);

    const updateDoc = async (updates) =>{
        isPending.value = true;
        error.value = null;

        try{
            const res = await documentRef.update(updates)
            isPending.value = false;
            return res;
        } catch(err){
            
            isPending.value = false;
            error.value = 'Ticket konnte nicht aktualisiert werden.'
        }
    }
    return {error, isPending, updateDoc}
}

export default useDocument
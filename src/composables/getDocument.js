import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {

    const document = ref(null);
    const error = ref(null);


    let documentRef = projectFirestore.collection(collection).doc(id);
       
        

    const unsub = documentRef.onSnapshot( doc => {
        if(doc.data()){
            document.value = {...doc.data(), id: doc.id};
            error.value = null;
        }else{
            error.value = "Ticket existiert nicht";
        }        
        
    }, err => {
        console.log(err.message);
        error.value = "Daten konnten nicht geladen werden";
    })

    watchEffect((onInValidate) => {
        onInValidate(() => unsub());
    });
    
    return { error, document }

}

export default getDocument
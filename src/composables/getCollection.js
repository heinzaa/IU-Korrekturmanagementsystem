import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query) => {

    const documents = ref(null);
    const error = ref(null);


    let collectionRef = projectFirestore.collection(collection)
    .where()
        

    const unsub = collectionRef.onSnapshot( snap => {
        let results = [];
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        });

        documents.value = results;
        error.value = null;
    }, err => {
        console.log(err.message);
        documents.value = null;
        error.value = "Daten konnten nicht geladen werden";
    })

    watchEffect((onInValidate) => {
        onInValidate(() => unsub());
    });
    
    return { error, documents }

}

export default getCollection
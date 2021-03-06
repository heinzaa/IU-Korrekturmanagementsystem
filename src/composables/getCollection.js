import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection, query) => {

    const documents = ref(null);
    const error = ref(null);


    let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt', 'desc');

    if(query){
        collectionRef = collectionRef.where(...query);
    }

    const unsub = collectionRef.onSnapshot( snap => {
        let results = [];
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        });

        documents.value = results;
        error.value = null;
    }, () => {
        documents.value = null;
        error.value = "Daten konnten nicht geladen werden";
    })

    watchEffect((onInValidate) => {
        onInValidate(() => unsub());
    });
    
    return { error, documents }

}

export default getCollection
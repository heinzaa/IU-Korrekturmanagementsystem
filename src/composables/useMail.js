
import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const useMail = () => {
    const error = ref(null);
    const isPending = ref(null);


    const addMail = async () => {
        error.value = null;
        isPending.value = true;
        
        try {
            await projectFirestore.collection('mail').add({
                to: 'heintz.marc@web.de',
                message: {
                  subject: 'Hello from Firebase!',
                  text: 'This is the plaintext section of the email body.',
                  html: 'This is the <code>HTML</code> section of the email body.',
                }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
        }
        catch(err)
        {
            console.log(err.message);
            error.value = "could not send the message";
            isPending.value = false;
        }
    }

    return { error, addMail, isPending }

}

export default useMail
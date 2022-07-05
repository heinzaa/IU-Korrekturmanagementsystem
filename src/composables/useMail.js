
import { ref } from 'vue';
import { projectFirestore } from '../firebase/config';

const useMail = (status, toMail, feedback, course, tutorName, title ) => {
    const error = ref(null);
    const isPending = ref(null);

    const URL = 'https://korrekturmanagement.de'
    



    const addMail = async (status, toMail, feedback, course, name, title) => {
        error.value = null;
        isPending.value = true;
        
        try {
            if(status == 'Eingereicht'){
            await projectFirestore.collection('mail').add({
                to: toMail,
                message: {
                  subject: `KorrekturManagementSystem | Neues Ticket zu Kurs ${course}`,
                  html: `Hallo ${name},
                        <br><br>es wurde ein neues Ticket im Kurs erstellt.
                        <br><br>Titel: ${title}
                        <br>Kurs: ${course}
                        <br>Status: Offen
                        <br><br>Du kannst dies unter folgender URL abrufen: ${URL},
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br>${URL} `,
                }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
            }
            
            else if(status == 'In Arbeit'){
            await projectFirestore.collection('mail').add({
                to: toMail,
                message: {
                  subject: `KorrekturManagementSystem | Dein Ticket ist IN ARBEIT`,
                  html: `Hallo ${name}, 
                        <br><br>Dein Ticketstatus wurde vom zuständigen Tutor aktualisiert.
                        <br><br>Titel: ${title}
                        <br>Kurs: ${course}
                        <br>Status: ${status}
                        <br>Feedback: <i>${feedback}</i>
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br>${URL} `,
                }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
            }
            else if(status == 'Abgelehnt'){
            await projectFirestore.collection('mail').add({
                to: toMail,
                message: {
                  subject: `KorrekturManagementSystem | Dein Ticket wurde ABGELEHNT`,
                  html: `Hallo ${name}, 
                        <br><br>Dein Ticketstatus wurde vom zuständigen Tutor aktualisiert.
                        <br><br>Titel: ${title}
                        <br>Kurs: ${course}
                        <br>Status: ${status}
                        <br>Feedback: <i>${feedback}</i>
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br>${URL} `,
                }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
            }
            else if(status == 'Erledigt'){
            await projectFirestore.collection('mail').add({
                to: toMail,
                message: {
                  subject: `KorrekturManagementSystem | Dein Ticket wurde ERLEDIGT`,
                  html: `Hallo ${name}, 
                        <br><br>Dein Ticketstatus wurde vom zuständigen Tutor aktualisiert.
                        <br><br>Titel: ${title}
                        <br>Kurs: ${course}
                        <br>Status: ${status}
                        <br>Feedback: <i>${feedback}</i>
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br>${URL} `,
                  }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
            }
        }
        catch(err)
        {
            console.log(err.message);
            error.value = "Email konnte nicht versendet werden.";
            isPending.value = false;
        }
    }

    return { error, addMail, isPending }

}

export default useMail
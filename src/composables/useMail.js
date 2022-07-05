
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
                        <br><br>es wurde ein neues Ticket erstellt mit folgenden Angaben...
                        <br>
                        <br><b>Titel:</b> ${title}
                        <br><b>Kurs:</b> ${course}
                        <br><b>Status:</b> Offen
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br><a href="${URL}">${URL}</a> `,
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
                        <br><br>Dein Ticketstatus wurde vom zuständigen Tutor wie folgt aktualisiert...
                        <br>
                        <br><b>Titel:</b> ${title}
                        <br><b>Kurs:</b> ${course}
                        <br><b>Status:</b> ${status}
                        <br><b>Feedback:</b> <i>${feedback}</i>
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br><a href="${URL}">${URL}</a> `,
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
                        <br><br>Dein Ticketstatus wurde vom zuständigen Tutor wie folgt aktualisiert...
                        <br>
                        <br><b>Titel:</b> ${title}
                        <br><b>Kurs:</b> ${course}
                        <br><b>Status:</b> ${status}
                        <br><b>Feedback:</b> <i>${feedback}</i>
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br><a href="${URL}">${URL}</a> `,
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
                        <br><br>Dein Ticketstatus wurde vom zuständigen Tutor wie folgt aktualisiert...
                        <br>
                        <br><b>Titel:</b> ${title}
                        <br><b>Kurs:</b> ${course}
                        <br><b>Status:</b> ${status}
                        <br><b>Feedback:</b> <i>${feedback}</i>
                        <br><br>Mit freundlichen Grüßen,
                        <br><br>Dein Team vom Korrekturmanagementsystem
                        <br><br><a href="${URL}">${URL}</a> `,
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
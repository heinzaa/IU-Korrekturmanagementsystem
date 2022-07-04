
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
                  subject: `Neues Ticket ${course} mit dem Betreff ${title}`,
                  html: `Hallo ${name},
                         es wurde ein neues Ticket für dich erstellt. 
                         Du kannst dies unter folgender URL abrufen : ${URL},
                         Mit freundlichen Grüßen,
                         Dein Team vom Korrekturmanagementsystem.`,
                }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
            }
            
            else if(status == 'In Arbeit'){
            await projectFirestore.collection('mail').add({
                to: toMail,
                message: {
                  subject: `Antwort auf dein Ticket ${title} für das Fach ${course}`,                  
                  html: `Hallo ${name}, Dein Ticketstatus wurde von deinem Tutor auf ${status} mit dem Feedback: ${feedback} gesetzt. 
                  Du kannst Dein Ticket unter folgender URL abrufen : ${URL}.
                  Mit freundlichen Grüßen,
                  Dein Team vom Korrekturmanagementsystem.`,
                }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
            }
            else if(status == 'Abgelehnt'){
            await projectFirestore.collection('mail').add({
                to: toMail,
                message: {
                  subject: `Antwort auf dein Ticket ${title} für das Fach ${course}`,
                  html: `Hallo ${name}, Dein Ticketstatus wurde von deinem Tutor auf ${status} mit dem Feedback: ${feedback} gesetzt. 
                        Du kannst Dein Ticket unter folgender URL abrufen : ${URL}.
                        Mit freundlichen Grüßen,
                        Dein Team vom Korrekturmanagementsystem.`,
                }
              }).then(() => console.log('Queued email for delivery!'));
            isPending.value = true;
            }
            else if(status == 'Erledigt'){
            await projectFirestore.collection('mail').add({
                to: toMail,
                message: {
                    subject: `Antwort auf Dein Ticket ${title} für das Fach ${course}`,
                    html: `Hallo ${name}, Dein Ticketstatus wurde von deinem Tutor auf ${status} mit dem Feedback: ${feedback} gesetzt. 
                          Du kannst Dein Ticket unter folgender URL abrufen : ${URL}.
                          Mit freundlichen Grüßen,
                          Dein Team vom Korrekturmanagementsystem.`,
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
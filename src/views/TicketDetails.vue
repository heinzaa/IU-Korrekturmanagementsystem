<template>
    <div id="template">
        <TemplateHeader />

        <div class="container content-small">
            <h1>Ticketinformationen</h1>
            <p v-if="document.status == 'Erledigt' || document.status == 'Abgelehnt'">
                Ticket geschlossen am {{String(document.modifiedAt.toDate().getDate()).padStart(2,'0')}}.{{String(document.modifiedAt.toDate().getMonth()+1).padStart(2,'0')}}.{{document.modifiedAt.toDate().getFullYear()}}
                - {{String(document.modifiedAt.toDate().getHours()).padStart(2,'0')}}:{{String(document.modifiedAt.toDate().getMinutes()).padStart(2,'0')}} Uhr
            </p>
            <hr />

            <div v-if="error" class="error" style="margin:1em 0; text-align:center;"> {{ error }} </div>

            <div v-if="document">
                <form action="">
                    <div class="mb-4">
                        <label class="view">Titel (Überschrift):</label>
                        <div>{{ document.title }}</div>
                    </div>
                    <div class="mb-4">
                        <label class="view">Kurs:</label>
                        <div>{{document.courseInformation.course}} </div>
                    </div>
                    <div class="row">
                        <div class="mb-4 col-md-6">
                            <label class="view">Kategorie, Art der Meldung:</label>
                            <div>{{document.category}}</div>
                        </div>
                        <div class="mb-4 col-md-3">
                            <label class="view">Priorität:</label>
                            <div v-if="showStatusInformation">
                              <select name="issueIssuePrio" v-model="priority" class="form-select" id="issueIssuePrio" required>
                                   <option value="" disabled>{{document.priority}}</option> 
                                    <option v-for="item in priorityList" :value="item.priorityTitle" :key="item.id" >
                                    {{ item.priorityTitle }}
                                    </option>
                                </select>  
                            </div>
                            <div v-else>
                               <span v-if="document.priority == 'Niedrig'" class="text-black-50">Niedrig</span>
                                <span v-if="document.priority == 'Mittel' " class="">Mittel</span>
                                <span v-if="document.priority == 'Hoch'"  class="text-danger">Hoch</span> 
                            </div>
                        </div>
                        <div class="mb-4 col-md-3">
                            <label class="view">Status:</label>
                            <div>
                                <strong v-if="document.status == 'Erledigt'" class="ticket-status rounded-pill bg-success" title="Erledigt"></strong>
                                <strong v-if="document.status == 'Offen'" class="ticket-status rounded-pill bg-danger" title="Offen"></strong>
                                <strong v-if="document.status == 'Abgelehnt'" class="ticket-status rounded-pill bg-info" title="Abgelehnt"></strong>
                                <strong v-if="document.status == 'In Arbeit'" class="ticket-status rounded-pill bg-warning" title="In Arbeit"></strong>
                                {{document.status}}
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <p><label class="view">Betroffenen Medien:</label></p>
                        <ul>
                            <li v-if="document.LearnApp_Fehler[0]">
                                <label>Learn App/IU Reader:</label>
                                <div>{{ document.LearnApp_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.PDF_Skript_Fehler[0]">
                                <label>Skript <span class="form-text">(PDF)</span></label>
                                <div>{{ document.PDF_Skript_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.Druckskript_Fehler[0]">
                                <label>Skript <span class="form-text">(Druck)</span></label>
                                <div>{{ document.Druckskript_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.Video_Fehler[0]">
                                <label>Video <span class="form-text">(Vodcast, Tutorium)</span></label>
                                <div>{{ document.Video_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.Audio_Fehler[0]">
                                <label>Audio <span class="form-text">(Podcast)</span></label>
                                <div>{{ document.Audio_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.OnlineTest_Fehler[0]">
                                <label>Online-Test <span class="form-text">(MyCampus)</span></label>
                                <div>{{ document.OnlineTest_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.Repetitorium_Fehler[0]">
                                <label>Repetitorium</label>
                                <div>{{ document.Repetitorium_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.Musterklausur_Fehler[0]">
                                <label>Musterklausur</label>
                                <div>{{ document.Musterklausur_Fehler[1] }}</div>
                            </li>
                            <li v-if="document.Sonstige_Fehler[0]">
                                <label>Sonstiges</label>
                                <div>{{ document.Sonstige_Fehler[1] }}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="mb-4">
                        <label class="view">Beschreibung:</label>
                        <div style="white-space:pre-wrap;">{{document.description}}</div>
                    </div>
                    <div class="mb-4">
                        <label class="view">Dateien:</label>
                        <div v-if="document.filePath">
                            <!-- Vorschau, wenn es ein Bild ist -->
                            <a v-if="document.fileType == 'image/jpg' || document.fileType == 'image/jpeg' || document.fileType == 'image/png'" :href="document.fileUrl" target="_blank"><img :src="document.fileUrl" class="img-preview" /></a>
                            <iframe v-if="document.fileType == 'application/pdf'" :src="document.fileUrl" style="width:300px; height:240px; border:0;"></iframe>
                            <!-- Download-Link -->
                            <br><b-icon-paperclip style="color:#999; margin-left:-0.15em;"></b-icon-paperclip> 
                            <a :href="document.fileUrl" target="_blank">{{document.filePath.replace(/^.*[\\\/]/, '')}}</a>
                        </div>
                        <div v-else>Keine Datei vorhanden.</div>
                    </div>
                    <div class="row">
                        <div class="mb-4 col-md-6">
                            <label class="view">Erstellt am:</label>
                            <div>
                                {{String(document.createdAt.toDate().getDate()).padStart(2,'0')}}.{{String(document.createdAt.toDate().getMonth()+1).padStart(2,'0')}}.{{document.createdAt.toDate().getFullYear()}}
                                - {{String(document.createdAt.toDate().getHours()).padStart(2,'0')}}:{{String(document.createdAt.toDate().getMinutes()).padStart(2,'0')}} Uhr
                         </div>
                        </div>
                        <div class="mb-4 col-md-6">
                            <label class="view">Autor:</label>
                            <div>{{document.authorName}}</div>
                        </div>
                    </div>

                    <hr>
                    <h3>Anmerkung des Tutors</h3>

                    <div class="mb-4">
                        <label v-if="document.modifiedAt" class="view" for="feedbackComment">
                            Statusänderung am {{String(document.modifiedAt.toDate().getDate()).padStart(2,'0')}}.{{String(document.modifiedAt.toDate().getMonth()+1).padStart(2,'0')}}.{{document.modifiedAt.toDate().getFullYear()}}
                            - {{String(document.modifiedAt.toDate().getHours()).padStart(2,'0')}}:{{String(document.modifiedAt.toDate().getMinutes()).padStart(2,'0')}} Uhr
                        </label>
                        <div v-if="document.feedback">                            
                            <div style="white-space:pre-wrap;">{{document.feedback}}</div>
                        </div>
                        <div v-else>
                            <i>Kein Feedback vorhanden.</i>
                        </div>
                    </div>
                    <div v-if="showStatusInformation">
                        <div>
                            <label class="view">Feedback Aktualisierung hier eintragen:</label>
                            <textarea :disabled="hideTextarea" class="form-control" v-model="feedback" name="feedbackComment" id="feedbackComment" style="min-height:100px;"></textarea>
                        </div>
                        <div class="mt-4">
                            <label class="view">Status ändern:</label>
                            <div class="mt-1">
                                <button type="button" @click="inProgressTicket" class="btn btn-warning">In Arbeit</button> &nbsp; 
                                <button type="button" @click="closeTicket" class="btn btn-success">Erledigt</button> &nbsp;                        
                                <button type="button" @click="rejectTicket" class="btn btn-info" >Abgelehnt</button>
                            </div>
                            <div class="mt-2">
                                <small>Hinweis: Bei Änderung des Status auf "Erledigt" oder "Abgelehnt" wird das Ticket geschlossen.</small>
                            </div>
                        </div>
                    </div>
                    <hr>
                </form>
            </div>

        </div>
        <TemplateFooter />
     </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import ticket_priority from "../assets/ticket_priority.json";
import getDocument from "../composables/getDocument";
import useDocument from "../composables/useDocument";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { computed } from 'vue';
import { timestamp } from "../firebase/config";
import useIsTutor from '../composables/useIsTutor';
import useMail from '../composables/useMail';

export default {
    components: { TemplateHeader, TemplateFooter },
    props: ["id"],

    data() {
        return {                   
            priorityList: ticket_priority,
        };
    },

    setup(props) {
       
        const router = useRouter();
        const { error, document } = getDocument("tickets", props.id);
        const { updateDoc } = useDocument("tickets", props.id);
        const { isTutor } = useIsTutor();
        const { addMail } = useMail();

        const priority = ref('')
       
        const feedback = ref('')

        
        const showStatusInformation = computed(() =>{

            if(isTutor){
                return true;
            }
            else{
                return false;
            }
        })
       
        
        

        const rejectTicket = async(e) => {

              if(priority.value == ''){
                 priority.value = document.value.priority;
             }           
        
            await updateDoc({
                status: 'Abgelehnt',
                feedback: feedback.value,
                modifiedAt: timestamp(),
                 priority: priority.value
            });
            await addMail('Abgelehnt', document.value.authorMail, document.value.description, document.value.courseInformation.course, document.value.authorName, document.value.title);

            router.push({name: 'Dashboard'});
            
         }      
         const inProgressTicket = async(e) => {

               if(priority.value == ''){
                 priority.value = document.value.priority;
                
                }


             
            await updateDoc({
                status: 'In Arbeit',
                feedback: feedback.value,
                modifiedAt: timestamp(),
                priority: priority.value               
            });
            await addMail('In Arbeit', document.value.authorMail, document.value.description, document.value.courseInformation.course, document.value.authorName, document.value.title);
            router.push({name: 'Dashboard'});           
         }      
         const closeTicket = async(e) => {

             if(priority.value == ''){
                 priority.value = document.value.priority;
             }
            
        
            await updateDoc({
                status: 'Erledigt',
                feedback: feedback.value,
                modifiedAt: timestamp(),
                priority: priority.value
            })
            await addMail('Erledigt', document.value.authorMail, document.value.description, document.value.courseInformation.course, document.value.authorName, document.value.title);
           router.push({name: 'Dashboard'});
         }      

          const hideTextarea = computed(() => {
            if(!isTutor){
                return true;
            }
            if(document.value.status == 'In Arbeit' || document.value.status == 'Offen'){               
               return false;     
            }
            else{
                return true;
            }

        })

        return { error, document, rejectTicket ,inProgressTicket, closeTicket, feedback, hideTextarea, showStatusInformation, priority};
    },
};
</script>

<style>
label.view {
    font-weight:bold;
}
.img-preview {
    max-width:240px; height:auto;
}
</style>
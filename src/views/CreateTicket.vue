<template>
    <div id="template">
        <TemplateHeader />
        
    <div class="container content-small">
            <h1>Neues Ticket erstellen</h1>
            <hr />
            <p>Bitte fülle das Formular möglichst detailliert aus, damit der gefundene Fehler bzw. die vorgeschlagene Verbesserung effizient angenommen und umgesetzt werden kann.</p>
            <p style="font-size:0.8em;">Alle Formularfelder - außer als optional gekennzeichnete - sind Pflichtfelder.</p>
            <p>&nbsp;</p>
            
            <form @submit.prevent="handleSubmit">
                <div class="error mb-4">{{error}}</div>
                
                <div class="mb-4">
                    <label for="issueTitle" class="view">Titel (Überschrift):</label>
                    <input id="issueTitle" v-model="title" type="text"  class="form-control" name="issueTitle" maxlength="80" required>
                </div>
                <div class="mb-4">
                    <label for="issueCourse" class="view">Kurs:</label>
                    <select id="issueCourse" v-model="course" name="issueCourse" class="form-select" required>
                        <option  value="" disabled>Kurs auswählen</option>
                        <option v-for="item in courseList" :key="item.id" :value="item">
                        {{ item.course }}
                        </option>
                    </select>
                </div>
                <div class="row">
                    <div class="mb-4 col-md-6">
                        <label for="issueIssueType" class="view">Kategorie, Art der Meldung:</label>
                        <select id="issueIssueType" v-model="category" name="issueIssueType" class="form-select" required>
                            <option value="" disabled>Kategorie auswählen</option>
                            <option v-for="item in categoryList" :key="item.id" :value="item.categoryText">
                            {{ item.categoryText }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-4 col-md-6">
                        <label for="issueIssuePrio" class="view">Priorität:</label>
                        <select id="issueIssuePrio" v-model="priority" name="issueIssuePrio" class="form-select" required>
                            <option v-for="item in priorityList" :key="item.id" :value="item.priorityTitle">
                            {{ item.priorityTitle }}
                            </option>
                        </select>
                    </div>
                </div>
                <div id="mediaList" class="mb-4">
                    <p><label class="view">Betroffenen Medien:</label></p>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaApp" v-model="arrLearnApp" class="form-check-input" type="checkbox" name="media[]" value="Learn App/IU Reader">
                            <label class="form-check-label" for="mediaApp">Learn App/IU Reader</label>
                        </div>
                        <div class="form-group">
                            <input id="AppPosition" v-model="arrLearnAppDescription" class="form-control" type="text" placeholder="Position eingeben (Seite, Kapitel)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaPdf" v-model="arrSkriptPDF" class="form-check-input" type="checkbox" name="media" value="Skript-PDF">
                            <label class="form-check-label" for="mediaPdf">Skript <span class="form-text">(PDF)</span></label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrSkriptPDFDescription" class="form-control" type="text" placeholder="Position eingeben (Seite, Kapitel, Version)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaPrint" v-model="arrSkriptDruck" class="form-check-input"  type="checkbox" name="media" value="Skript-Druck">
                            <label class="form-check-label" for="mediaPrint">Skript <span class="form-text">(Druck)</span></label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrSkriptDruckDescription" class="form-control" type="text" placeholder="Position eingeben (Seite, Kapitel, Version)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaVideo" v-model="arrVideo" class="form-check-input" type="checkbox" name="media" value="Video">
                            <label class="form-check-label" for="mediaVideo">Video <span class="form-text">(Vodcast, Tutorium)</span></label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrVideoDescription" class="form-control" type="text" placeholder="Position eingeben (Zeit in Minuten, Dateiname)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaAudio" v-model="arrAudio" class="form-check-input" type="checkbox" name="media" value="Audio">
                            <label class="form-check-label" for="mediaAudio">Audio <span class="form-text">(Podcast)</span></label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrAudioDescription" class="form-control" type="text" placeholder="Position eingeben (Zeit in Minuten, Dateiname)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaTest" v-model="arrOnlineTest" class="form-check-input" type="checkbox" name="media" value="Online-Test">
                            <label class="form-check-label" for="mediaTest">Online-Test <span class="form-text">(MyCampus)</span></label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrOnlineTestDescription" class="form-control" type="text" placeholder="Position eingeben (Kapitel, Frage-Nr.)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaRepetitorium" v-model="arrRepetitorium" class="form-check-input" type="checkbox" name="media" value="Repetitorium">
                            <label class="form-check-label" for="mediaRepetitorium">Repetitorium</label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrRepetitoriumDescription" class="form-control" type="text" placeholder="Position eingeben (Frage-Nr., Seite)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaMusterklausur" v-model="arrMusterklausur" class="form-check-input" type="checkbox" name="media" value="Musterklausur">
                            <label class="form-check-label" for="mediaMusterklausur">Musterklausur</label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrMusterklausurDescription" class="form-control" type="text" placeholder="Position eingeben (Klausur-Nr., Frage-Nr., Seite)" maxlength="100">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input id="mediaSonstiges" v-model="arrSonstiges" class="form-check-input" type="checkbox" name="media" value="Sonstiges">
                            <label class="form-check-label" for="mediaSonstiges">Sonstiges <span class="form-text">(bitte u. ausführen)</span></label>
                        </div>
                        <div class="form-group">
                            <input v-model="arrSonstigesDescription"  class="form-control" type="text" placeholder="Medium und Position eingeben" maxlength="100">
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="issueDescription" class="view">Beschreibe Deine Ticketmeldung:</label>
                    <textarea id="issueDescription" v-model="issueDescription" required class="form-control" name="issueDescription" style="min-height:200px; max-height:70vh;"></textarea>
                </div>
                
                <div class="mb-4">
                    <label for="issueFile" class="view">Upload von Dateien (optional):</label>
                    <input id="issueFile" type="file" class="form-control" name="issueFile" accept="image/png, image/jpeg, .pdf, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .mp4" @change="handleChange">
                    <div v-if="fileError" class="error ">{{fileError}}</div>
                    <div class="form-text">Erlaubte Dateiformate: Bilder (jpg, jpeg, png), PDF, MP4-Video und MS Word. <br>Dateigröße: max. 5 MB</div>
                </div>
                
                <div class="mt-4">
                    <button v-if="!isPending" class="btn btn-lg btn-primary" type="submit">Ticket einreichen</button>
                    <button v-else disabled class="btn btn-lg btn-primary" type="submit">Ticket wird erstellt...</button>
                    &nbsp;
                    <button type="button" class="btn btn-lg btn-outline-secondary" onclick="if(confirm('Alle aktuellen Eingaben gehen verloren.\nMöchtest Du alle Eingaben verwerfen und zum Dashboard wechseln?')) location.href='/dashboard';">Abbrechen</button>
                </div>
            </form>
        </div> 
        <TicketModal :modal-active="modalActive" @close="navToDashboard" @cancel="closeModal">
            <div>
                <b-icon-send-check style="font-size:3em; margin:15px; color:green;"></b-icon-send-check> 
                <h2>Dein Ticket wurde erfolgreich erstellt und eine Benachrichtigung an den Tutor gesendet.</h2>
                <p>Vielen Dank für Deine Meldung. Mit Deiner Unterstützung werden wir noch besser!
                <br />Was möchtest Du als nächstes tun?</p>
            </div>
        </TicketModal>
        
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
import getUser from "../composables/getUser";
import useStorage from "../composables/useStorage";
import useCollection from "../composables/useCollection";
import useMail from "../composables/useMail";
import { timestamp } from "../firebase/config";
import tutor_course from "../assets/tutor_course.json";
import ticket_category from "../assets/ticket_category.json";
import ticket_priority from "../assets/ticket_priority.json";
import TicketModal from "@/components/Modals/TicketModal.vue" 

export default {
    components: {
        TemplateHeader,
        TemplateFooter,
        TicketModal       
    },
    setup() {
        const router = useRouter();
        const { filePath, url, uploadFile } = useStorage();

        
        const { error, addDoc } = useCollection("tickets");
        const { user } = getUser();
        const { addMail } = useMail();
        // Referenzen für die eingaben
        const title = ref(null);
        const course = ref(null);
        const category = ref(null);
        const priority = ref('Niedrig');
        const fileType = ref(null);

        const modalActive = ref(false);

        let arrLearnApp = ref([]);
        const arrLearnAppDescription = ref('');

        let arrSkriptPDF = ref([]);
        const arrSkriptPDFDescription = ref('');

        let arrSkriptDruck = ref([]);
        const arrSkriptDruckDescription = ref('');
        let arrVideo = ref([]);
        const arrVideoDescription = ref('');

        let arrAudio = ref([]);
         const arrAudioDescription = ref('');

        let arrOnlineTest = ref([]);
        const arrOnlineTestDescription = ref('');

        let arrRepetitorium = ref([]);
        const arrRepetitoriumDescription = ref('');

        let arrMusterklausur = ref([]);
        const arrMusterklausurDescription = ref('');

        let arrSonstiges = ref([]);
        const arrSonstigesDescription = ref('');

        const issueDescription = ref("");
        const file = ref(null);
        const fileError = ref(null);
        const isPending = ref(false);
        const status = ref("Offen");
        
        const handleSubmit = async () => {
            isPending.value = true;
            if (file.value) {
                await uploadFile(file.value);
            }
            await addDoc({
                title: title.value,
                courseInformation: course.value,
                category: category.value,
                priority: priority.value,                    
                LearnApp_Fehler: [...arrLearnApp.value, arrLearnAppDescription.value],
                PDF_Skript_Fehler: [...arrSkriptPDF.value,arrSkriptPDFDescription.value],
                Druckskript_Fehler: [...arrSkriptDruck.value,arrSkriptDruckDescription.value], 
                Video_Fehler: [...arrVideo.value, arrVideoDescription.value],
                Audio_Fehler: [...arrAudio.value, arrAudioDescription.value],
                OnlineTest_Fehler: [...arrOnlineTest.value,arrOnlineTestDescription.value],
                Repetitorium_Fehler: [...arrRepetitorium.value,arrRepetitoriumDescription.value],
                Musterklausur_Fehler: [...arrMusterklausur.value,arrMusterklausurDescription.value],
                Sonstige_Fehler: [...arrSonstiges.value, arrSonstigesDescription.value],
                description: issueDescription.value,
                author: user.value.uid,
                authorName: user.value.displayName,
                authorMail: user.value.email,
                fileUrl: (url.value ? url.value : null),
                filePath: (filePath.value ? filePath.value : null),
                fileType: fileType.value,
                status: status.value,                
                createdAt: timestamp(),
            });
            await addMail('Eingereicht', course.value.email, issueDescription.value, course.value.course, course.value.tutor, title.value )
            isPending.value = false;
            if (!error.value) {
                modalActive.value = !modalActive.value;
                       
               
            }
           
            
        };        

         const closeModal = () => {
           
           //re-render Page, damit die Form wieder zurückgestezt wird          
           router.go();
            
       
        }

        const navToDashboard = () =>{
             router.push({name: 'Dashboard'});
        }

        const types = ["image/png", "image/jpeg", "application/pdf", "video/mp4"];
        const handleChange = (e) => {
            const selected = e.target.files[0];
          
            //console.log(selected);
            let fileSizePermitted = e.target.files[0].size < 6000000;
            //console.log(fileSizePermitted);
            if (selected && types.includes(selected.type) && fileSizePermitted ) {
                //console.log("hallo Change");
                file.value = selected;
                fileError.value = null;
                fileType.value = selected.type
                //console.log(selected);
                return;
            }
            if(fileSizePermitted == false){
                e.target.value = '';
                fileError.value = "Dateigröße überschreitet die zulässigen 5 MB!"
            }            
        };

       

       
        return {
            title,
            course,
            modalActive,
            category,
            priority,           
            arrLearnApp,
            arrLearnAppDescription,
            arrSkriptPDF,
            arrSkriptPDFDescription,
            arrSkriptDruck,
            arrSkriptDruckDescription,
            arrVideo,
            arrVideoDescription,
            arrAudio,
            arrAudioDescription,
            arrOnlineTest,
            arrOnlineTestDescription,
            arrRepetitorium,
            arrRepetitoriumDescription,
            arrMusterklausur,
            arrMusterklausurDescription,
            issueDescription,
            arrSonstiges,
            arrSonstigesDescription,
            fileError,
            handleSubmit,
            handleChange,
            isPending,
            navToDashboard,
            closeModal, 
             
            
        };
    },
    data() {
        return {
            courseList: tutor_course,
            categoryList: ticket_category,
            priorityList: ticket_priority,
        };
    },
    mounted() {
        document.querySelector("#mainmenu li a").classList.remove("active");
        document
            .getElementById("navbarDropdownAccount")
            .classList.add("active");
        let items = document.querySelectorAll("#mediaList .media-input");
        for (let i = 0; i < items.length; i++) {
            let checkbox = items[i].querySelector("input[type=checkbox]");
            let inputDiv = items[i].querySelector(".form-group");
            let input = items[i].querySelector(".form-group input[type=text]");
            checkbox.addEventListener("click", function () {
                if (this.checked) {
                    inputDiv.style.display = "block";
                    input.focus();
                } else {
                    inputDiv.style.display = "none";
                }
            });
        }
    },
};
</script>

<style>
label.view {
    font-weight:bold;
}

#mediaList .media-input {
    margin-bottom:5px;
}
#mediaList .media-input::before,
#mediaList .media-input::after {
    content: " ";
    display: table;
}
#mediaList .media-input:after {
    clear: both;
}
#mediaList .form-check {
    display:block;
    padding-top:6px;
    padding-bottom:6px;
    float:left;
}
#mediaList .form-group {
    margin-left:40%;
    display:none;
}
@media screen and (max-width: 767px) {
    #mediaList .form-group {
        margin-left:0;
    }
}
</style>
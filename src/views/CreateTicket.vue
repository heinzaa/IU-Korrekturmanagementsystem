<template>
    <div id="template">
        <TemplateHeader />
        <div class="container content-small">
            <h1>Neue Meldung erstellen</h1>
            <hr />
            <p>Bitte fülle das Formular möglichst detailliert aus, damit der gefundene Fehler bzw. die vorgeschlagene Verbesserung effizient angenommen und umgesetzt werden kann.</p>
            <p>Alle Felder sind Pflichtangaben, außer als optional gekennzeichnete Felder.</p>
            <p>&nbsp;</p>
            
            <form  @submit.prevent="handleSubmit" action="" >
                <div class="error mb-3">{{error}}</div>
                
                <div class="mb-4">
                    <label for="issueTitle">Titel (Überschrift):</label>
                    <input type="text" class="form-control" v-model="title"  name="issueLocal" id="issueTitle" required>
                </div>
                <div class="mb-4">
                    <label for="issueCourse">Kurs:</label>
                    <select name="issueCourse" v-model="course" class="form-select" id="issueCourse" required>
                        <option  value="" disabled>Kurs auswählen</option>
                        <option v-for="item in courseList" :value="item" :key="item.id">
                        {{ item.course }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="issueIssueType">Kategorie, Art der Meldung:</label>
                    <select name="issueIssueType" v-model="category" class="form-select" id="issueIssueType">
                        <option value="" disabled>Kategorie auswählen</option>
                        <option v-for="item in categoryList" :value="item.categoryText" :key="item.id">
                        {{ item.categoryText }}
                        </option>
                    </select>
                </div>
                <div class="mb-4" id="mediaList">
                    <p><label>Betroffenen Medien:</label></p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media[]" v-model="arrMedium" id="mediaApp" value="Learn App/IU Reader">
                        <label class="form-check-label" for="mediaApp">Learn App/IU Reader</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaPdf" value="Skript-PDF">
                        <label class="form-check-label" for="mediaPdf">Skript <span class="form-text">(PDF)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media"  v-model="arrMedium" id="mediaPrint" value="Skript-Druck">
                        <label class="form-check-label" for="mediaPrint">Skript <span class="form-text">(Druck)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaVideo" value="Video">
                        <label class="form-check-label" for="mediaVideo">Video <span class="form-text">(Vodcast, Shortcast)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaAudio" value="Audio">
                        <label class="form-check-label" for="mediaAudio">Audio <span class="form-text">(Podcast)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaTest" value="Online-Test">
                        <label class="form-check-label" for="mediaTest">Online-Test <span class="form-text">(MyCampus)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaRepetitorium" value="Repetitorium">
                        <label class="form-check-label" for="mediaRepetitorium">Repetitorium</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaMusterklausur" value="Musterklausur">
                        <label class="form-check-label" for="mediaMusterklausur">Musterklausur</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaSonstiges" value="Sonstiges">
                        <label class="form-check-label" for="mediaSonstiges">Sonstiges <span class="form-text">(bitte u. ausführen)</span></label>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="issueLocal">Medien-Lokalisierung:</label>
                    <input type="text" v-model="localisation" class="form-control" name="issueLocal" id="issueLocal">
                    <div class="form-text">Z.B. Seitennr., Zeit in Minuten, Version, Dateiname, Frage-Nr., etc.</div>
                </div>
                <div class="mb-4">
                    <label for="issueDescription">Beschreibe deine Meldung:</label>
                    <textarea required class="form-control" v-model="issueDescription" name="issueDescription" id="issueDescription" style="min-height:200px; max-height:70vh;"></textarea>
                </div>
                <div class="mb-4">
                    <label for="issueFile">Upload von Dateien (optional):</label>
                    <input type="file" class="form-control" @change="handleChange" name="issueFile" id="issueFile" accept="image/png, image/jpeg, .pdf, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .mp4">
                    <div class="form-text">Erlaubte Dateiformate: Bilder (jpg, jpeg, png), PDF, MP4-Video und MS Word. <br>Dateigröße: max. 5 MB</div>
                </div>
                <div class="mt-4">
                    <button v-if="!isPending" class="btn btn-lg btn-primary" type="submit">Meldung einreichen</button>
                    <button v-else disabled class="btn btn-lg btn-primary" type="submit">Ticket wird erstellt...</button>
                </div>
            </form>
        </div>
        
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import getUser from '../composables/getUser'
import useStorage from "../composables/useStorage" 
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";
import tutor_course from "../assets/tutor_course.json";
import ticket_category from "../assets/ticket_category.json";
export default {
    components: {
        TemplateHeader,
        TemplateFooter,
    },

    getTutorForCourse(){

    },

    mounted(){
        document.querySelector('#mainmenu li a').classList.remove('active');
        document.getElementById('navbarDropdownAccount').classList.add('active');
    },
    data() {
    return {
      courseList: tutor_course,
      categoryList: ticket_category
    };
  },

    


    setup(props, context) {

        const { filePath, url, uploadFile } = useStorage();
        const { error, addDoc } = useCollection('tickets')
        const { user } = getUser();
        
        // Referenzen für die eingaben 
        const title = ref(null);
        const course = ref(null);
        const category = ref(null);
        const arrMedium = ref([]);
        const localisation = ref('');
        const issueDescription = ref('');
        const file = ref(null);
        const fileError = ref(null);
        const isPending = ref(false);
        const status = ref('Offen');

        const getTutor = (val) =>{
        return "Marc";
        }

        const handleSubmit = async () => {
            if (file.value){
                isPending.value = true;
                await uploadFile(file.value);
                await addDoc({
                    title: title.value,
                    course: course.value,
                    category: category.value,
                    medium: arrMedium.value,
                    localisation: localisation.value,
                    description: issueDescription.value,
                    author:  user.value.uid,
                    userName: user.value.displayName,
                    fileUrl: url.value,
                    status: status.value,
                    filePath: filePath.value,
                    tutor: getTutor(course.value),
                    createdAt: timestamp(),
                })
                isPending.value = false;
                if(!error.value){
                    console.log('ticket added');
                }
            }
        }

        const types = ['image/png', 'image/jpeg', 'application/pdf'];

        const handleChange = (e) => {
            const selected = e.target.files[0];
            console.log(selected);

            if(selected && types.includes(selected.type)){
                console.log("hallo Change")
                file.value = selected;
                fileError.value = null;
            }
        }



        return { title, course, category, arrMedium, localisation, issueDescription, fileError, handleSubmit, handleChange, isPending, getTutor };


    
    },
};
</script>

<style>
#mediaList .form-check-inline {
    min-width:31%;
}

@media screen and (max-width: 767px) {
    #mediaList .form-check-inline {
        width:auto;
        display:block;
    }
}
</style>
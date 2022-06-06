<template>
    <div id="template">
        <TemplateHeader />
        <div class="container content-small">
            <h1>Neue Meldung erstellen</h1>
            <hr />
            <p>Bitte fülle das Formular möglichst detailliert aus, damit der gefundene Fehler bzw. die vorgeschlagene Verbesserung effizient angenommen und umgesetzt werden kann.</p>
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
                        <option value="" disabled>Kurs wählen</option>
                        <option value="1">BBWL01 - Betriebswirtschaftslehre (Einführung)</option>
                        <option value="1">BBWL02 - Betriebswirtschaftslehre (Vertiefung)</option>
                        <option value="1">DLBWIEWI - Einführung in die Wirtschaftsinformatik</option>
                        <option value="1">IMT1 - Mathematik Grundlagen 1</option>
                        <option value="1">IMT2 - Mathematik 2</option>
                        <option value="1">IREN - Requirements Engineering</option>
                        <option value="1">DLBIITR - IT-Recht</option>
                        <option value="">...</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="issueIssueType">Kategorie, Art der Meldung:</label>
                    <select name="issueIssueType" v-model="category" class="form-select" id="issueIssueType">
                        <option value="" disabled>Selektiere die Kategorie</option>
                        <option value="1">⛔ Fataler Fehler (Nutzungsprobleme)</option>
                        <option value="1">🔴 Technischer Fehler</option>
                        <option value="1">⭕ Inhaltlicher/fachlicher Fehler</option>
                        <option value="1">🟡 Darstellungsfehler</option>
                        <option value="1">🟡 Rechtschreibfehler</option>
                        <option value="1">🟢 Verbesserungsvorschlag, Idee, Anregung</option>
                    </select>
                </div>
                <div class="mb-4" id="mediaList">
                    <p><label>Betroffenen Medien:</label></p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaApp" value="Learn App/IU Reader">
                        <label class="form-check-label" for="mediaApp">Learn App/IU Reader</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaPdf" value="Skript-PDF">
                        <label class="form-check-label" for="mediaPdf">Skript <span class="form-text">(PDF)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media"  v-model="medium" id="mediaPrint" value="Skript-Druck">
                        <label class="form-check-label" for="mediaPrint">Skript <span class="form-text">(Druck)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaVideo" value="Video">
                        <label class="form-check-label" for="mediaVideo">Video <span class="form-text">(Vodcast, Shortcast)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaAudio" value="Audio">
                        <label class="form-check-label" for="mediaAudio">Audio <span class="form-text">(Podcast)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaTest" value="Online-Test">
                        <label class="form-check-label" for="mediaTest">Online-Test <span class="form-text">(MyCampus)</span></label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaRepetitorium" value="Repetitorium">
                        <label class="form-check-label" for="mediaRepetitorium">Repetitorium</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaMusterklausur" value="Musterklausur">
                        <label class="form-check-label" for="mediaMusterklausur">Musterklausur</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="media" v-model="medium" id="mediaSonstiges" value="Sonstiges">
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
                    <input type="file" class="form-control" @change="handleChange" name="issueFile" id="issueFile" accept="image/png, image/jpeg, .pdf, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                    <div class="form-text">Erlaubte Dateiformate: Bilder (jpg, jpeg, png), PDF und MS Word. <br>Dateigröße: max. 5 MB</div>
                </div>
                <div class="mt-4">
                    <button v-if="!isPending" class="btn btn-lg btn-primary" type="submit">Meldung einreichen</button>
                    <button v-else disabled class="btn btn-lg btn-primary" type="submit">Ticket wird erstellt...</button>
                </div>
            </form>
        </div>
        <CorrectionForm />
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import CorrectionForm from "../components/CorrectionForm.vue";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import getUser from '../composables/getUser'
import useStorage from "../composables/useStorage" 
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config"
export default {
    components: {
        TemplateHeader,
        TemplateFooter,
        CorrectionForm
    },
    mounted(){
        document.querySelector('#mainmenu li a').classList.remove('active');
        document.getElementById('navbarDropdownAccount').classList.add('active');
    },
    setup(props, context) {

        const { filePath, url, uploadImage } = useStorage();
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


        const handleSubmit = async () => {
            if (file.value){
                isPending.value = true;
                await uploadImage(file.value);
                await addDoc({
                    title: title.value,
                    course: course.value,
                    category: category.value,
                    medium: arrMedium.value.push('PDF'),
                    localisation: localisation.value,
                    description: issueDescription.value,
                    author:  user.value.uid,
                    userName: user.value.displayName,
                    fileUrl: url.value,
                    filePath: filePath.value,
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



        return { title, course, category, arrMedium, localisation, issueDescription, fileError, handleSubmit, handleChange, isPending };


    
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
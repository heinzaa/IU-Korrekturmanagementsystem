<template>
    <div id="template">
        <TemplateHeader />
        <div class="container content-small">
            <h1>Neues Ticket erstellen</h1>
            <hr />
            <p>Bitte fülle das Formular möglichst detailliert aus, damit der gefundene Fehler bzw. die vorgeschlagene Verbesserung effizient angenommen und umgesetzt werden kann.</p>
            <p style="font-size:0.8em;">Alle Formularfelder - außer als optional gekennzeichnete - sind Pflichtfelder.</p>
            <p>&nbsp;</p>
            
            <form  @submit.prevent="handleSubmit" action="" >
                <div class="error mb-4">{{error}}</div>
                
                <div class="mb-4">
                    <label for="issueTitle">Titel (Überschrift):</label>
                    <input type="text" class="form-control" v-model="title"  name="issueTitle" id="issueTitle" maxlength="80" required>
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
                <div class="row">
                    <div class="mb-4 col-md-6">
                        <label for="issueIssueType">Kategorie, Art der Meldung:</label>
                        <select name="issueIssueType" v-model="category" class="form-select" id="issueIssueType">
                            <option value="" disabled>Kategorie auswählen</option>
                            <option v-for="item in categoryList" :value="item.categoryText" :key="item.id">
                            {{ item.categoryText }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-4 col-md-6">
                        <label for="issueIssuePrio">Priorität:</label>
                        <select name="issueIssuePrio" v-model="priority" class="form-select" id="issueIssuePrio">
                            <option v-for="item in priorityList" :value="item.priorityTitle" :key="item.id">
                            {{ item.priorityTitle }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="mb-4" id="mediaList">
                    <p><label>Betroffenen Medien:</label></p>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media[]" v-model="arrMedium" id="mediaApp" value="Learn App/IU Reader">
                            <label class="form-check-label" for="mediaApp">Learn App/IU Reader</label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" id="AppPosition" type="text" placeholder="Position eingeben (Seite, Kapitel)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaPdf" value="Skript-PDF">
                            <label class="form-check-label" for="mediaPdf">Skript <span class="form-text">(PDF)</span></label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Position eingeben (Seite, Kapitel, Version)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media"  v-model="arrMedium" id="mediaPrint" value="Skript-Druck">
                            <label class="form-check-label" for="mediaPrint">Skript <span class="form-text">(Druck)</span></label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Position eingeben (Seite, Kapitel, Version)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaVideo" value="Video">
                            <label class="form-check-label" for="mediaVideo">Video <span class="form-text">(Vodcast, Tutorium)</span></label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Position eingeben (Zeit in Minuten, Dateiname)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaAudio" value="Audio">
                            <label class="form-check-label" for="mediaAudio">Audio <span class="form-text">(Podcast)</span></label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Position eingeben (Zeit in Minuten, Dateiname)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaTest" value="Online-Test">
                            <label class="form-check-label" for="mediaTest">Online-Test <span class="form-text">(MyCampus)</span></label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Position eingeben (Kapitel, Frage-Nr.)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaRepetitorium" value="Repetitorium">
                            <label class="form-check-label" for="mediaRepetitorium">Repetitorium</label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Position eingeben (Frage-Nr., Seite)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaMusterklausur" value="Musterklausur">
                            <label class="form-check-label" for="mediaMusterklausur">Musterklausur</label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Position eingeben (Klausur-Nr., Frage-Nr., Seite)" maxlength="40">
                        </div>
                    </div>
                    <div class="media-input">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" name="media" v-model="arrMedium" id="mediaSonstiges" value="Sonstiges">
                            <label class="form-check-label" for="mediaSonstiges">Sonstiges <span class="form-text">(bitte u. ausführen)</span></label>
                        </div>
                        <div class="form-group">
                            <input class="form-control" type="text" placeholder="Medium und Position eingeben" maxlength="40">
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <label for="issueDescription">Beschreibe deine Ticketmeldung:</label>
                    <textarea required class="form-control" v-model="issueDescription" name="issueDescription" id="issueDescription" style="min-height:200px; max-height:70vh;"></textarea>
                </div>
                <div class="mb-4">
                    <label for="issueFile">Upload von Dateien (optional):</label>
                    <input type="file" class="form-control" @change="handleChange" name="issueFile" id="issueFile" accept="image/png, image/jpeg, .pdf, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .mp4">
                    <div class="form-text">Erlaubte Dateiformate: Bilder (jpg, jpeg, png), PDF, MP4-Video und MS Word. <br>Dateigröße: max. 5 MB</div>
                </div>
                <div class="mt-4">
                    <button v-if="!isPending" class="btn btn-lg btn-primary" type="submit">Ticket einreichen</button>
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
import getUser from "../composables/getUser";
import useStorage from "../composables/useStorage";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";
import tutor_course from "../assets/tutor_course.json";
import ticket_category from "../assets/ticket_category.json";
import ticket_priority from "../assets/ticket_priority.json";
export default {
    components: {
        TemplateHeader,
        TemplateFooter,
    },

    getTutorForCourse() {},

    mounted() {
        document.querySelector("#mainmenu li a").classList.remove("active");
        document
            .getElementById("navbarDropdownAccount")
            .classList.add("active");

        let items = document.querySelectorAll("#mediaList .media-input");
        for (let i = 0; i < items.length; i++) {
            console.log(
                items[i]
                    .querySelector("input[type=checkbox]")
                    .getAttribute("value")
            );
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
    data() {
        return {
            courseList: tutor_course,
            categoryList: ticket_category,
            priorityList: ticket_priority,
        };
    },

    setup(props, context) {
        const { filePath, url, uploadFile } = useStorage();
        const { error, addDoc } = useCollection("tickets");
        const { user } = getUser();

        // Referenzen für die eingaben
        const title = ref(null);
        const course = ref(null);
        const category = ref(null);
        const priority = ref("Niedrig");
        const arrMedium = ref([]);
        const issueDescription = ref("");
        const file = ref(null);
        const fileError = ref(null);
        const isPending = ref(false);
        const status = ref("Offen");

        const getTutor = (val) => {
            return "Marc";
        };

        const handleSubmit = async () => {
            if (file.value) {
                isPending.value = true;
                await uploadFile(file.value);
                await addDoc({
                    title: title.value,
                    course: course.value,
                    category: category.value,
                    priority: priority.value,
                    medium: arrMedium.value,
                    description: issueDescription.value,
                    author: user.value.uid,
                    userName: user.value.displayName,
                    fileUrl: url.value,
                    status: status.value,
                    filePath: filePath.value,
                    tutor: getTutor(course.value),
                    createdAt: timestamp(),
                });
                isPending.value = false;
                if (!error.value) {
                    console.log("ticket added");
                }
            }
        };

        const types = ["image/png", "image/jpeg", "application/pdf", "video/mp4"];

        const handleChange = (e) => {
            const selected = e.target.files[0];
            console.log(selected);

            if (selected && types.includes(selected.type)) {
                console.log("hallo Change");
                file.value = selected;
                fileError.value = null;
            }
        };

        return {
            title,
            course,
            category,
            priority,
            arrMedium,
            issueDescription,
            fileError,
            handleSubmit,
            handleChange,
            isPending,
            getTutor,
        };
    },
};
</script>

<style>
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
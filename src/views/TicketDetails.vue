<template>
    <div id="template">
        <TemplateHeader />

        <div class="container content-small">
            <h1>Ticketinformationen</h1>
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
                        <div class="mb-4 col-md-6">
                            <label class="view">Priorität:</label>
                            <div>{{document.priority}}</div>
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
                        <div>{{document.description}}</div>
                    </div>
                    <div class="mb-4">
                        <label class="view">Dateien:</label>
                        <div v-if="document.filePath">
                            <!-- Vorschau, wenn es ein Bild ist -->
                            <a :href="document.fileUrl" target="_blank"><img :src="document.fileUrl" class="img-preview" /></a>
                            <!-- Download-Link -->
                            <br><b-icon-paperclip style="color:#999; margin-left:-0.15em;"></b-icon-paperclip> 
                            <a :href="document.fileUrl" target="_blank">{{document.filePath.replace(/^.*[\\\/]/, '')}}</a>
                        </div>
                        <div v-else>Keine Datei vorhanden.</div>
                    </div>
                    <div class="row">
                        <div class="mb-4 col-md-6">
                            <label class="view">Erstellung:</label>
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
                    <h3>Bearbeitung durch Tutor</h3>

                    <p>@ToDo: Diese Bearbeitung nur dann zulassen, wenn Status = "Offen" oder "In Arbeit". Ansonsten nur anzeigen.</p>

                    <div class="mb-4">
                        <label for="feedbackComment">Tutor-Feedback:</label>
                        <textarea class="form-control" name="feedbackComment" id="feedbackComment" style="min-height:100px;"></textarea>
                    </div>
                    <div class="mt-4">
                        Status ändern:
                    </div>
                    <div class="mt-1">
                        <button type="button" class="btn btn-warning">In Arbeit</button> &nbsp; 
                        <button type="button" class="btn btn-success">Erledigt</button> &nbsp; 
                        <button type="button" class="btn btn-info">Abgelehnt</button>
                    </div>
                    <div class="mt-2">
                        <small>Hinweis: Bei Änderung des Status wird der Ersteller per E-Mail inkl. angegebenem Feedback informiert.
                        Bei Änderung des Status auf "Erledigt" oder "Abgelehnt" wird das Ticket zudem geschlossen uns ist nicht mehr editierbar.</small>
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
import getDocument from "../composables/getDocument";
export default {
    components: { TemplateHeader, TemplateFooter },
    props: ["id"],

    setup(props) {
        const { error, document } = getDocument("tickets", props.id);
        return { error, document };
    },
};
</script>

<style>
label.view {
    color:#999;
}
.img-preview {
    max-width:200px; height:auto;
}
</style>
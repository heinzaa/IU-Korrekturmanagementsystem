<template>
<div>
    <div v-if="error" class="error" > {{ error }} </div>

    <div v-if="document">
        
        
       

    <div style="background:#000; padding:1em; margin:2em 0; color:#fff; text-align:center;">
                - AB HIER TICKET FORMULAR FÜR TUTOR -
            </div>

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
                        <div>{{document.categoryText}}</div>
                    </div>
                    <div class="mb-4 col-md-6">
                        <label class="view">Priorität:</label>
                        <div>{{document.priority}}</div>
                    </div>
                </div>
                <div class="mb-4">
                    <p><label class="view">Betroffenen Medien:</label></p>
                    <ul>
                        <li>
                            <label>Learn App/IU Reader:</label>
                            <div>Blabla hier steht irgend was zur Position</div>
                        </li>
                        <li>
                            <label>Skript:</label>
                            <div>Blabla jhdfskaof jhsdiof ji</div>
                        </li>
                    </ul>
                </div>
                <div class="mb-4">
                    <label class="view">Beschreibe deine Ticketmeldung:</label>
                    {{document.description}}
                </div>
                <div class="mb-4">
                    <label class="view">Dateien:</label>
                    <img :src="document.fileUrl" />
                </div>

                <hr>
                <h3>Bearbeitung durch Tutor</h3>

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
                <hr>
            </form>
            </div>
     </div>
</template>

<script>
import getDocument from '../composables/getDocument'
export default {
    props: ['id'],

    setup(props){
        const {error, document } = getDocument('tickets', props.id)

        return {error, document}
    }

}
</script>

<style>

</style>
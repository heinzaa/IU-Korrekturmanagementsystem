<template>
    <div id="dashboard-tutor">
        <h1>Tutor Dashboard</h1>
        <div>
            <input type="text" placeholder="Suche nach Titel..." v-model="searchQuery" />
        </div>
        <div v-if="!documents" style="margin:1em 0; text-align:center;">
            Es existieren noch keine erstellten Tickets.
        </div>
        
        <div v-else>
            <div id="status-panel">
                <div @click="filterTickets('Offen')" data-status="Offen">
                    <strong class="rounded-pill bg-danger">{{openTickets}}</strong>
                    <span>Offen</span>
                </div>
                <div @click="filterTickets('In Arbeit')" data-status="In Arbeit">
                    <strong class="rounded-pill bg-warning">{{inProgressTickets}}</strong>
                    <span>In Arbeit</span>
                </div>
                <div @click="filterTickets('Erledigt')" data-status="Erledigt">
                    <strong class="rounded-pill bg-success">{{closedTickets}}</strong>
                    <span>Erledigt</span>
                </div>
                <div @click="filterTickets('Abgelehnt')" data-status="Abgelehnt">
                    <strong class="rounded-pill bg-info">{{rejectedTickets}}</strong>
                    <span>Abgelehnt</span>
                </div>
            </div>
            
            <div class="table-responsive">            
                <table class="table table-hover table-tickets">
                    <thead>
                        <tr>
                            <th scope="col" style="width:130px;">Erstellungsdatum</th>
                            <th scope="col" style="width:130px;">Priorität</th>
                            <th scope="col">Titel</th>
                            <th scope="col">Kurs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ticket in searchedTickets" :key="ticket.id" @click="toTicketDetails(ticket.id)" class="cursor-pointer" :data-status="ticket.status">
                            <td class="ticket-date" data-title="Datum">
                                <strong v-if="ticket.status == 'Erledigt'" class="ticket-status rounded-pill bg-success" title="Erledigt"></strong>
                                <strong v-if="ticket.status == 'Offen'" class="ticket-status rounded-pill bg-danger" title="Offen"></strong>
                                <strong v-if="ticket.status == 'Abgelehnt'" class="ticket-status rounded-pill bg-info" title="Abgelehnt"></strong>
                                <strong v-if="ticket.status == 'In Arbeit'" class="ticket-status rounded-pill bg-warning" title="In Arbeit"></strong>
                                {{String(ticket.createdAt.toDate().getDate()).padStart(2,'0')}}.{{String(ticket.createdAt.toDate().getMonth()+1).padStart(2,'0')}}.{{ticket.createdAt.toDate().getFullYear()}}

                                <span class="only-mobile">
                                    - 
                                    <b v-if="ticket.priority == 'Niedrig'" class="text-black-50">Niedrig</b>
                                    <b v-if="ticket.priority == 'Mittel' " class="">Mittel</b>
                                    <b v-if="ticket.priority == 'Hoch'"  class="text-danger">Hoch</b>
                                </span>
                            </td>
                            <td class="ticket-priority" data-title="Priorität">
                                <span v-if="ticket.priority == 'Niedrig'" class="text-black-50">Niedrig</span>
                                <span v-if="ticket.priority == 'Mittel' " class="">Mittel</span>
                                <span v-if="ticket.priority == 'Hoch'"  class="text-danger">Hoch</span>
                            </td>
                            <td class="ticket-title" data-title="Titel">
                                <b-icon-paperclip v-if="ticket.filePath" style="color:#999; margin-left:-0.15em;"></b-icon-paperclip>
                                {{ticket.title}}
                            </td>
                            <td class="ticket-course" data-title="Kurs">{{ticket.courseInformation.course}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="msgEmptyList" style="display:none;">
                Zu Deinem Filter existieren keine Tickets.
            </div>
        </div>
    </div>
</template>

<script>

import getCollection from '../composables/getCollection' 
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router';
import {computed} from 'vue';
import { ref } from "@vue/reactivity";
export default {
    setup() {
        const { user } = getUser();
        const router = useRouter();

        const { error, documents } = getCollection("tickets", [
            "courseInformation.email", "==", user.value.email,
        ]);

        const searchQuery = ref("");

       const searchedTickets = computed(() => {
      return documents.value.filter((document) => {
        return (
          document.title
            .toLowerCase()
            .indexOf(searchQuery.value.toLowerCase()) != -1
        );
      });
});

     

        const openTickets = computed(() => {
            if(documents.value){
               let doc =  documents.value.filter(elements => elements.status == 'Offen');         
            return doc.length;
            }
            else{
                return 0;
            }

        })
        const inProgressTickets = computed(() => {
            if(documents.value){
               let doc =  documents.value.filter(elements => elements.status == 'In Arbeit');         
            return doc.length;
            }
            else{
                return 0;
            }

        })
         const closedTickets = computed(() => {
            if(documents.value){
               let doc =  documents.value.filter(elements => elements.status == 'Erledigt');         
            return doc.length;
            }
            else{
                return 0;
            }

        })

         const rejectedTickets = computed(() => {
            if(documents.value){
               let doc =  documents.value.filter(elements => elements.status == 'Abgelehnt');         
            return doc.length;
            }
            else{
                return 0;
            }

        })

        

        const toTicketDetails = (ticketID) => {
            router.push({ name: "TicketDetails", params: { id: ticketID } });
        };

        /* Filterung der Tickets durch Sichtbarkeit */
        let lastFilterStatus = null;
        const filterTickets = (status) => {
            // Filter bei nochmaliger gleicher Auswahl zurücksetzen auf ALLE
            if(lastFilterStatus == status){
                lastFilterStatus = status = null;
            }

            // immer letzten Status übernehmen
            lastFilterStatus = status;
            
            let filterItems = document.querySelectorAll('#status-panel > div');
            filterItems.forEach(function(item){
                if(item.getAttribute('data-status') == status){
                    item.className='active';
                } else {
                    item.className='';
                }
            });

            let msgEmptyList = document.getElementById('msgEmptyList');
            let items = document.querySelectorAll('.table-tickets tbody tr');
            let hasVisibleItems = false;
            items.forEach(function(item){
                if(item.getAttribute('data-status') == status || status == null){
                    item.style.display='';
                    hasVisibleItems = true;
                } else {
                    item.style.display='none';
                }
            });
            
            msgEmptyList.style.display = (hasVisibleItems ? 'none' : 'block');
        }

        return { searchQuery, searchedTickets, error, documents, toTicketDetails, filterTickets, openTickets, inProgressTickets, closedTickets, rejectedTickets };
    },
};

</script>

<style>

</style>

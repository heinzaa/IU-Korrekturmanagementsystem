<template>
    <div id="dashboard-tutor">
        <h1>Meine erstellten Tickets</h1>
        <div>
            <a href="/createticket" class="btn btn-primary"><b-icon-plus-circle style="margin-top:-0.1em;"></b-icon-plus-circle>&nbsp; Ticket erstellen</a>
        </div>
        
        <div v-if="!documents" style="margin:1em 0; text-align:center;">
            Es existieren noch keine erstellten Tickets.
        </div>
        <div v-else>
            <div id="status-panel">
                <div>
                    <strong class="rounded-pill bg-danger">2</strong>
                    <span>Offen</span>
                </div>
                <div>
                    <strong class="rounded-pill bg-warning">1</strong>
                    <span>In Arbeit</span>
                </div>
                <div>
                    <strong class="rounded-pill bg-success">3</strong>
                    <span>Erledigt</span>
                </div>
                <div>
                    <strong class="rounded-pill bg-info">1</strong>
                    <span>Abgelehnt</span>
                </div>
            </div>
            <div class="table-responsive">            
                <table class="table table-hover table-tickets">
                    <thead>
                        <tr>
                            <th scope="col">Datum</th>
                            <th scope="col">Titel</th>
                            <th scope="col">Kurs</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ticket in documents" :key="ticket.id" @click="toTicketDetails(ticket.id)" class="cursor-pointer" :data-status="ticket.status">
                            <td class="ticket-date" data-title="Datum">
                                <strong v-if="ticket.status == 'Erledigt'" class="ticket-status rounded-pill bg-success" title="Erledigt"></strong>
                                <strong v-if="ticket.status == 'Offen'" class="ticket-status rounded-pill bg-danger" title="Offen"></strong>
                                <strong v-if="ticket.status == 'Abgelehnt'" class="ticket-status rounded-pill bg-info" title="Abgelehnt"></strong>
                                <strong v-if="ticket.status == 'In Arbeit'" class="ticket-status rounded-pill bg-warning" title="In Arbeit"></strong>
                                {{String(ticket.createdAt.toDate().getDate()).padStart(2,'0')}}.{{String(ticket.createdAt.toDate().getMonth()+1).padStart(2,'0')}}.{{ticket.createdAt.toDate().getFullYear()}}
                            </td>
                            <td class="ticket-title" data-title="Titel">{{ticket.title}}</td>
                            <td class="ticket-course" data-title="Kurs">{{ticket.courseInformation.course}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import getCollection from '../composables/getCollection' 
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router';
export default {
    setup() {
        const { user } = getUser();
        const router = useRouter();

        const { error, documents } = getCollection("tickets", [
            "author", "==", user.value.uid,
        ]);

        console.log(documents);

        const toTicketDetails = (ticketID) => {
            router.push({ name: "TicketDetails", params: { id: ticketID } });
        };

        return { error, documents, toTicketDetails };
    },
};

</script>

<style>

</style>

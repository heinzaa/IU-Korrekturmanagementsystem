<template>
    <div id="dashboard-tutor">
        <h1>Tutor Dashboard</h1>
        
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
            <small>@ToDo: folgende Liste muss noch auf den eingeloggten User/Tutor eingeschränkt werden.</small>
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
                        <tr v-for="ticket in documents" :key="ticket.id" @click="toTicketDetails(ticket.id)" class="cursor-pointer">
                            <td>
                                <span v-if="ticket.status == 'Erledigt'" class="badge bg-success">Erledigt</span>
                                <span v-if="ticket.status == 'Offen'"  class="badge bg-danger">Offen</span>
                                <span v-if="ticket.status == 'Abgelehnt'"  class="badge bg-info">Abgelehnt</span>
                                <span v-if="ticket.status == 'In Arbeit' " class="badge bg-warning">In Arbeit</span>
                                {{ticket.createdAt.toDate().getDate()}}.{{ticket.createdAt.toDate().getMonth()+1}}.{{ticket.createdAt.toDate().getFullYear()}}
                            </td>
                            <td>{{ticket.title}}</td>
                            <td>{{ticket.courseInformation.course}}</td>
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

        const { error, documents } = getCollection("tickets");

        console.log(documents);

        const toTicketDetails = (ticketID) => {
            router.push({ name: "TicketDetails", params: { id: ticketID } });
        };

        return { error, documents, toTicketDetails };
    },
};

</script>

<style>
.table-tickets .badge {
  width: 75px;
}
.table-tickets tr td {
  cursor: pointer;
}
#status-panel {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  margin: 2em 0;
}
#status-panel div {
  position: relative;
  background: #eee;
  border: 2px #ddd solid;
  width: 23%;
  padding: 20px;
  border-radius: 10px;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;
}
#status-panel div strong {
  width: 40px;
  height: 40px;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  padding-top: 8px;
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
}
#status-panel div span {
  font-weight: bold;
}
#status-panel div:after {
  display: none;
  content: "";
  position: absolute;
  left: 50%;
  bottom: -10px;
  margin-left: -10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 0 10px;
  border-color: #152536 transparent transparent transparent;
}
#status-panel div:hover {
  background: #152536;
  border: 2px #152536 solid;
  color: #fff;
}
#status-panel div:hover:after {
  display: block;
}

@media screen and (max-width: 767px) {
  #status-panel div {
    width: 47%;
  }
  #status-panel div span {
    display: block;
    margin-top: 5px;
  }
}
</style>

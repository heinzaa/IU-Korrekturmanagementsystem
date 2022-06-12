<template>
    <div id="dashboard-tutor">
        <button>+ Hinzufügen</button>
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
                        <th scope="col">Status/Datum</th>
                        <th scope="col">Titel</th>
                        <th scope="col">Kurs</th>
                    </tr>
                </thead>
                <tbody v-for="ticket in documents" :key="ticket.id" @click="clickTicket(ticket.id)">
                    <tr class="cursor-pointer">
                        <td>
                            <span class="badge bg-danger">Offen</span>

                             {{ticket.createdAt.toDate().getDate()}}.{{ticket.createdAt.toDate().getMonth()}}.{{ticket.createdAt.toDate().getFullYear()}}
                        </td>
                        <td>{{ticket.title}}</td>
                        <td>{{ticket.courseInformation.course}}</td>
                    </tr>
                   
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

import getCollection from '../composables/getCollection' 

export default {



 setup(){
        const {error, documents} = getCollection(
            'tickets',
           );

           console.log(documents)

        return {error, documents}
    }
}

</script>

<style scoped>
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

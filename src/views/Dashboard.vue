<template>
    <div id="template">
        <TemplateHeader />
        <div class="dashboard container">
            <h1>Willkommen im Dashboard - {{ user.displayName }}</h1>
            <DashboardTutor v-if="isTutor" />
            <DashboardStudent v-else />
            
        </div>
        
         
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import DashboardStudent from "../components/DashboardStudent.vue";
import DashboardTutor from "../components/DashboardTutor.vue";
import getUser from '../composables/getUser';
import getCollection from '../composables/getCollection'
import useIsTutor from '../composables/useIsTutor';

export default {
    components: { TemplateHeader, TemplateFooter, DashboardStudent, DashboardTutor },

    setup(){
        //const { documents: tickets } = getCollection('playlists');
        const { user } = getUser();
        const { isTutor } = useIsTutor();

        return { user, isTutor }
    }
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
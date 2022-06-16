<template>
    <div id="template">
        <TemplateHeader />
        <div class="dashboard container">
            <!--
            <h1 v-if="isTutor">Tutor Dashboard <small>({{ user.displayName }})</small></h1>
            <h1 v-else>Meine erstellten Tickets <small>({{ user.displayName }})</small></h1>
            -->
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
</style>
<template>
    <div id="template">
        <TemplateHeader />
        <div class="container content-small">
            <h1>Impressum</h1>
            <hr />
            <p>
                Dies ist ein privates Studentenprojekt der IU Internationelen
                Hochschule.
                <br />Betreiber der Website und verantwortlich für den Inhalt sind:
                <br />
                <br />Marc Heintz, <br />Reinhard Nägler, <br />Johannes
                Schmack, <br />Anna Schulz, <br />Michael Vorndran
                <br />
                <br />E-Mail Kontakt:
                <br /><a href="mail@korrekturmanagement.de">mail@korrekturmanagement.de</a>
            </p>
        </div>
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
import { useRouter } from "vue-router";
export default {
    components: {
        TemplateHeader,
        TemplateFooter
    },
    mounted(){
        document.querySelector('#mainmenu li a').classList.remove('active');
        document.getElementById('navLinkImprint').classList.add('active');
    },
    setup() {
    
        const checkRoute = async () => {
            console.log(location);
        }

        return { checkRoute };
    },
};


</script>

<style>
</style>
<template>
    <div id="template">
        <TemplateHeader />
        <div class="dashboard container">
            <h1>Willkommen im Dashboard</h1>
        </div>
         <b-icon-arrow-up></b-icon-arrow-up>
        <TemplateFooter />
    </div>
</template>

<script>
import TemplateHeader from "../components/TemplateHeader.vue";
import TemplateFooter from "../components/TemplateFooter.vue";
export default {
    components: { TemplateHeader, TemplateFooter },
};
</script>

<style>
</style>
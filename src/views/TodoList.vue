<template>
    <div class="wrapper">
        <img :src="require('@/assets/images/logo.png')"
             alt="Vue Logo"/>
        <SearchBar @search="doSearch"></SearchBar>
        <hr/>
        <ListBody :count="count"
                  :keyword="searchContent"></ListBody>
        <hr/>
        <FooterBar interval="1"></FooterBar>
    </div>
</template>

<script lang="ts">
    import {createComponent, ref, SetupContext} from "@vue/composition-api";
    import SearchBar from "components/SearchBar.vue";
    import ListBody from "components/ListBody.vue";
    import FooterBar from "components/FooterBar.vue";

    const TodoList = createComponent({
        components: {ListBody, SearchBar, FooterBar},
        setup(props: {}, context: SetupContext) {
            // data
            const searchContent = ref("");
            const count = ref(0);
            // methods
            const doSearch = (search: string) => {
                searchContent.value = search;
                count.value++;
            };
            return {
                searchContent,
                count,
                doSearch
            };
        }
    });

    export default TodoList;
</script>

<template>
    <div class="search-bar">
        <label for="search-content">Search content: </label>
        <input type="text"
               v-model="searchContent"
               id="search-content"/>
        <button @click="doSearch">search</button>
    </div>
</template>

<script lang="ts">
    import {createComponent, ref, SetupContext} from "@vue/composition-api";

    const SearchBar = createComponent({
        setup(props: {}, {emit}: SetupContext) {
            // data
            const searchContent = ref("");
            // methods
            const doSearch = () => {
                emit("search", searchContent.value);
            };
            return {
                searchContent,
                doSearch
            };
        }
    });
    export default SearchBar;
</script>

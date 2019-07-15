<template>
    <div class="search-bar">
        <label for="search-content">Search content: </label>
        <input type="text"
               v-model="searchContent"
               id="search-content"/>
        <button @click="doSearch">search</button>
    </div>
</template>

<script>
  import {createComponent, value} from 'vue-function-api';

  const SearchBar = createComponent({
    setup(props, context) {
      // data
      const searchContent = value('');
      // methods
      const doSearch = () => {
        context.emit('search', searchContent.value);
      };
      return {
        searchContent,
        doSearch
      };
    }
  });
  export default SearchBar;
</script>

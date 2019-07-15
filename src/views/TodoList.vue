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

<script>
  import {createComponent, value} from 'vue-function-api';
  import SearchBar from '@/components/SearchBar';
  import ListBody from '@/components/ListBody';
  import FooterBar from '@/components/FooterBar';

  const TodoList = createComponent({
    components: {ListBody, SearchBar, FooterBar},
    setup(props, context) {
      // data
      let searchContent = value('');
      let count = value(0);
      // methods
      const doSearch = (search) => {
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

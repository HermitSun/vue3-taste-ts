<template>
    <div>
        <p>count: {{count}}</p>
        <p>count + 1: {{count}}</p>
        <button @click="increaseCount">increase</button>
    </div>
</template>

<script lang="ts">
    import {createComponent, onMounted, computed, value, watch} from "vue-function-api";

    const thisAndRefsComponent = createComponent({
        setup() {
            const count = value(0);
            const countPlusOne = computed(function() {
                console.log(this); // refers to a 'new' instance created by the plugin
                return count.value + 1;
            });
            watch(
                function() {
                    console.log(this); // refers to the instance
                    return count;
                },
                function() {
                    console.log(this); // undefined; 'this' can only be accessed in watcher's getter
                },
                {lazy: true}
            );
            onMounted(function() {
                console.log(this); // refers to the instance
            });
            const increaseCount = () => count.value += 1;
            return {
                count,
                countPlusOne,
                increaseCount
            };
        }
    });

    export default thisAndRefsComponent;
</script>

<style scoped>

</style>

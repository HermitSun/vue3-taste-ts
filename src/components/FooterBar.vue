<template>
    <div class="footer-bar">
        <template v-for="i in localInterval">
            <span :key="i">br{{ i }}<br/></span>
        </template>
        <br/>
        <div>total from bus using state: {{ total }}</div>
        <div>total from store using store: {{ storedTotal }}</div>
        <button @click="expandInterval">expand</button>
    </div>
</template>

<script lang="ts">
    import {createComponent, onMounted, computed, value, watch} from "vue-function-api";
    import {useStore} from "@/store";
    import {bus} from "@/utils/bus";

    interface FooterBarProps {
        interval: string;
    }

    const FooterBar = createComponent({
        props: {
            interval: String,
        },
        setup(props) {
            // local data, or from bus/store
            const localInterval = value(Number(props.interval));
            const total = computed(() => bus.total);
            const storedTotal = computed(function() {
                console.log(this); // refers to a new instance created by the plugin
                return useStore().state.total;
            });
            watch(
                function() {
                    console.log(this); // refers to the instance
                    return storedTotal;
                },
                function() {
                    console.log(this); // undefined; 'this' can only be accessed in watcher's getter
                }
            );
            onMounted(function() {
                console.log(this); // refers to the instance
            });
            // methods
            const expandInterval = () => {
                localInterval.value++;
            };
            return {
                localInterval,
                total,
                storedTotal,
                expandInterval,
            };
        },
    });

    export default FooterBar;
</script>

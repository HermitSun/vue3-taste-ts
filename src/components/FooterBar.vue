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
    import {createComponent, computed, ref} from "@vue/composition-api";
    import {useStore} from "@/store";
    import {bus} from "utils/bus";

    interface FooterBarProps {
        interval: string;
    }

    const FooterBar = createComponent({
        props: {
            interval: {
                type: String,
                required: true
            }
        } as const,
        setup(props: FooterBarProps) {
            // local data, or from bus/store
            const localInterval = ref(Number(props.interval));
            const total = computed(() => bus.total);
            const storedTotal = computed(() => useStore().state.total);
            // methods
            const expandInterval = () => {
                localInterval.value++;
            };
            return {
                localInterval,
                total,
                storedTotal,
                expandInterval
            };
        }
    });

    export default FooterBar;
</script>

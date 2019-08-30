<template>
    <div>
        <p>{{content}}</p>
        <Parent>
            <Child></Child>
        </Parent>
        <div>Mouse: {{x}} {{y}}</div>
        <button @click="triggerContentChange">update</button>
    </div>
</template>

<script lang="ts">
    import {
        createComponent,
        onBeforeMount,
        onMounted,
        onBeforeUpdate,
        onUpdated,
        onActivated,
        onDeactivated,
        onBeforeUnmount,
        onUnmounted,
        ref
    } from "@vue/composition-api";
    import {useMouse} from "components/Mouse";
    import Parent from "components/Parent.vue";
    import Child from "components/Child.vue";

    const LifecycleComponent = createComponent({
        components: {Parent, Child},
        setup() {
            const content = ref("LIFECYCLE");
            const {x, y} = useMouse();
            const triggerContentChange = () => {
                content.value += " changed";
            };
            // hooks; TO BE EXPLICIT
            onBeforeMount(() => {
                console.log("-BEFORE MOUNT-");
            });
            onMounted(() => {
                console.log("-ON MOUNT-");
            });
            onBeforeUpdate(() => {
                console.log("-BEFORE UPDATE-");
            });
            onUpdated(() => {
                console.log("-ON UPDATE-");
            });
            onActivated(() => {
                console.log("-ON ACTIVATE-");
            });
            onDeactivated(() => {
                console.log("-ON DEACTIVATE-");
            });
            onBeforeUnmount(() => {
                console.log("-BEFORE UNMOUNT-");
            });
            onUnmounted(() => {
                console.log("-ON UNMOUNT-");
            });
            return {
                content,
                x,
                y,
                triggerContentChange
            };
        }
    });

    export default LifecycleComponent;
</script>

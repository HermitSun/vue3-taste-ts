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
        onCreated,
        onBeforeMount,
        onMounted,
        onBeforeUpdate,
        onUpdated,
        onActivated,
        onDeactivated,
        onBeforeDestroy,
        onDestroyed,
        onUnmounted,
        value,
    } from "vue-function-api";
    import {useMouse} from "components/mouse";
    import Parent from "components/Parent.vue";
    import Child from "components/Child.vue";

    const LifecycleComponent = createComponent({
        components: {Parent, Child},
        setup(props, context) {
            const content = value("LIFECYCLE");
            const {x, y} = useMouse();
            const triggerContentChange = () => {
                content.value += " changed";
            };
            // hooks; TO BE EXPLICIT
            onCreated(() => {
                console.log("-ON CREATE-");
            });
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
            onBeforeDestroy(() => {
                console.log("-BEFORE DESTROY-");
            });
            onDestroyed(() => {
                console.log("-ON DESTROY-");
            });
            onUnmounted(() => {
                console.log("-ON UNMOUNT-");
            });
            return {
                content,
                x,
                y,
                triggerContentChange,
            };
        },
    });

    export default LifecycleComponent;
</script>

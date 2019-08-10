<template>
    <div>
        <p>count: {{count}}</p>
        <p>count + 1: {{countPlusOne}}</p>
        <button @click="increaseCount">increase</button>
        <br><br>
        <label>
            Enter to blur:
            <input type="text"
                   v-model="inputText"
                   ref="foo">
        </label>
    </div>
</template>

<script lang="ts">
    import {createComponent, onMounted, computed, value, watch} from "vue-function-api";

    const thisAndRefsComponent = createComponent({
        setup(props, {refs}) {
            const count = value(0);
            const inputText = value("");
            const countPlusOne = computed(function() {
                console.log("computed: ", this); // refers to a 'new' instance created by the plugin
                return count.value + 1;
            });
            watch(
                function() {
                    console.log("watcher: ", this); // refers to the instance
                    return count;
                },
                function() {
                    console.log("watcher callback", this); // undefined; 'this' can only be accessed in watcher's getter
                },
                {lazy: true},
            );
            onMounted(function() {
                console.log("mounted: ", this); // refers to the instance
                console.log(refs.foo); // 'refs' is accessible here
                const input = refs.foo as HTMLElement;
                input.focus();
            });
            const increaseCount = () => count.value += 1;

            console.log(refs.foo); // 'refs' is not accessible here; it has not been initialized
            useElementKeypress("Enter", () => refs.foo as HTMLElement, () => {
                (refs.foo as HTMLElement).blur();
            });
            return {
                count,
                inputText,
                countPlusOne,
                increaseCount,
            };
        },
    });

    function useElementKeypress(
        key: string,
        getElement: () => HTMLElement,
        callback: () => void,
    ) {
        const onKeydown = (event: KeyboardEvent) => {
            const pressed = event.key;
            if (key === pressed) {
                callback();
            }
        };

        onMounted(() => {
            getElement().addEventListener("keypress", onKeydown);
        });
    }

    export default thisAndRefsComponent;
</script>

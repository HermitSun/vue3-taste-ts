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
    import {createComponent, onMounted, computed, ref, watch} from "@vue/composition-api";

    const thisAndRefsComponent = createComponent({
        setup() {
            // todo: this is a weird type inference
            const foo = ref<HTMLInputElement>(document.createElement("input"));
            const count = ref(0);
            const inputText = ref("");
            const countPlusOne = computed(function () {
                console.log("computed: ", this); // refers to a 'new' instance created by the plugin
                return count.value + 1;
            });
            watch(
                function () {
                    console.log("watcher: ", this); // refers to the instance
                    return count;
                },
                function () {
                    console.log("watcher callback", this); // undefined; 'this' can only be accessed in watcher's getter
                },
                {lazy: true}
            );
            onMounted(function () {
                console.log(foo.value);
                console.log("mounted: ", this); // refers to the instance
                foo.value.focus();
            });
            const increaseCount = () => {
                count.value += 1;
            };
            useElementKeypress("Enter", () => foo.value, () => {
                foo.value.blur();
            });
            // 测试
            return {
                foo,
                count,
                inputText,
                countPlusOne,
                increaseCount
            };
        }
    });

    function useElementKeypress(
        key: string,
        getElement: () => HTMLElement,
        callback: () => void
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

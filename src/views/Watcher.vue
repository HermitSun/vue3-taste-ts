<template>
    <div>
        <div>
            <p>immediate + post</p>
            <div ref="testOne">{{test1}}</div>
            <button @click="handleClick1">test</button>
            <div>new: {{test1NewVal}}</div>
            <div>old: {{test1OldVal}}</div>
            <div>before request: {{test1BeforeRequest}}</div>
            <div>after request: {{test1AfterRequest}}</div>
        </div>
        <hr/>
        <div>
            <p>lazy + pre</p>
            <div ref="testTwo">{{test2}}</div>
            <button @click="handleClick2">test</button>
            <div>new: {{test2NewVal}}</div>
            <div>old: {{test2OldVal}}</div>
            <div>before request: {{test2BeforeRequest}}</div>
            <div>after request: {{test2AfterRequest}}</div>
        </div>
    </div>
</template>

<script lang="ts">
    import {
        createComponent,
        onUnmounted,
        ref,
        watch
    } from "@vue/composition-api";
    import {getServerResponseUsingAsync, getServerResponseUsingPromise} from "@/api";

    const WatcherComponent = createComponent({
        setup() {
            const testOne = ref(document.createElement("div"));
            const test1 = ref("begin");
            const test1NewVal = ref("");
            const test1OldVal = ref("");
            const test1BeforeRequest = ref("");
            const test1AfterRequest = ref("");
            const testTwo = ref(document.createElement("div"));
            const test2 = ref("begin");
            const test2NewVal = ref("");
            const test2OldVal = ref("");
            const test2BeforeRequest = ref("");
            const test2AfterRequest = ref("");
            const handleClick1 = () => {
                test1.value = "end";
            };
            const handleClick2 = () => {
                test2.value = "end";
            };
            const stopWatch1 = watch(
                // data source; I think this comment is NECESSARY.
                // also you can use '() => test1.value', as the RFC says.
                test1,
                // this function will be called BEFORE created.
                // and you can see the same result be printed TWICE.
                async (newVal, oldVal) => {
                    console.log("watcher1 invoked");
                    test1NewVal.value = newVal;
                    test1OldVal.value = oldVal;
                    // because of the async update queue, here represents the same
                    // actually values are different
                    test1BeforeRequest.value = testOne.value.innerText;
                    const res = await getServerResponseUsingAsync();
                    test1.value = res.test;
                    test1AfterRequest.value = testOne.value.innerText;
                }
            );
            const stopWatch2 = watch(
                test2,
                async (newVal, oldVal) => {
                    console.log("watcher2 invoked");
                    test2NewVal.value = newVal;
                    test2OldVal.value = oldVal;
                    getServerResponseUsingPromise()
                        .then((res) => {
                            test2.value = res.data.test;
                            test2AfterRequest.value = testTwo.value.innerText;
                        })
                        .catch((err) => {
                            console.log(err.toString());
                        });
                    test2BeforeRequest.value = testTwo.value.innerText;
                }, {
                    lazy: true,
                    flush: "pre"
                }
            );
            onUnmounted(() => {
                stopWatch1();
                stopWatch2();
            });
            return {
                testOne,
                test1,
                test1NewVal,
                test1OldVal,
                test1BeforeRequest,
                test1AfterRequest,
                testTwo,
                test2,
                test2NewVal,
                test2OldVal,
                test2BeforeRequest,
                test2AfterRequest,
                handleClick1,
                handleClick2
            };
        }
    });

    export default WatcherComponent;
</script>

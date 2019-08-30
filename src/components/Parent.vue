<template>
    <div>
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {createComponent, onErrorCaptured} from "@vue/composition-api";

    export default createComponent({
        setup() {
            onErrorCaptured((err: Error, vm: Vue, info: string) => {
                    console.log("invoked");
                    console.log("Parent: " + err.toString());
                    console.log("info: " + info);
                    return false;
                }
            );
        }
    });
</script>

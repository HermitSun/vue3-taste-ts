<template>
    <div class="list-body">
        <!--add-->
        <p>
            <label for="add">Add: </label>
            <input v-model="addContent"
                   id="add"/>
            <button @click="handleAdd">add</button>
        </p>
        <!--display-->
        <p>
            <template v-for="(item, index) in listContent">
                <div :key="index">
                    <span>{{item}}</span>
                    <button @click="handleRemove(index)"
                            :key="index">&times;
                    </button>
                </div>
            </template>
        </p>
        <!--search-->
        <p>Search: {{keyword}}</p>
        <p>
            <template v-for="(item, index) in searchContent">
                <div :key="index">{{item}}</div>
            </template>
        </p>
        <p>total from computing: {{ total }}</p>
    </div>
</template>

<script lang="ts">
    import {createComponent, computed, ref, watch} from "@vue/composition-api";
    import {bus} from "@/utils/bus";

    // const testStrategies = {
    //     foo: () => {
    //         console.log("foo");
    //     },
    //     bar: () => {
    //         console.log("bar");
    //     },
    //     baz: () => {
    //         console.log("baz");
    //     },
    //     others: () => {
    //         console.log("not exist");
    //     }
    // };

    const ListBody = createComponent({
        props: {
            keyword: String,
            count: Number
        },
        setup(props, {root}) {
            // data
            const addContent = ref("");
            const listContent = ref([] as string[]);
            const searchContent = ref([] as string[]);
            // computed
            const total = computed(() => listContent.value.length);
            const searchKeyword = computed(() => (props.keyword as any) as string);
            const src = [searchKeyword];
            // watch
            watch(
                src,
                (newVal, oldVal) => {
                    if (newVal) {
                        console.log(newVal, oldVal);
                        handleSearch(newVal[0]);
                        // try {
                        //     testStrategies[newVal[0]]();
                        // } catch (err) {
                        //     testStrategies["others"]();
                        // }
                    }
                }, {
                    lazy: true
                }
            );
            // methods
            const handleAdd = async () => {
                if (addContent.value) {
                    listContent.value.push(addContent.value);
                    addContent.value = "";
                    bus.total++;
                    await root.$store.dispatch("increaseTotal");
                }
            };
            const handleRemove = async (index: number) => {
                listContent.value = listContent.value.filter((v, i) => i !== index);
                bus.total--;
                await root.$store.dispatch("decreaseTotal");
            };
            const handleSearch = (val: string) => {
                searchContent.value = listContent.value.filter((v) => v.includes(val));
            };
            return {
                addContent,
                listContent,
                searchContent,
                total,
                handleAdd,
                handleRemove
            };
        }
    });

    export default ListBody;
</script>

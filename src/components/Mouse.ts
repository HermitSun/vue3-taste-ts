import {onMounted, onUnmounted, value} from "vue-function-api";

export function useMouse() {
    const x = value(0);
    const y = value(0);
    const update = (e: MouseEvent) => {
        x.value = e.pageX;
        y.value = e.pageY;
    };
    onMounted(() => {
        window.addEventListener("mousemove", update);
    });
    onUnmounted(() => {
        window.removeEventListener("mousemove", update);
    });
    return {x, y};
}

import { ref, onMounted, onUnmounted, Ref } from "vue";

export function useElementSize(elementRef: Ref<HTMLElement | null>) {
  const width = ref(0);
  const height = ref(0);

  const update = () => {
    const element = elementRef.value;
    if (element) {
      width.value = element.clientWidth;
      height.value = element.clientHeight;
    }
  };

  onMounted(() => {
    update();
    window.addEventListener("resize", update);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", update);
  });

  return { width, height };
}

export default useElementSize;

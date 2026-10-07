<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  modelValue: { type: String, default: "" },
  length: { type: Number, default: 5 },
  error: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const inputs = ref([]);
const digits = ref(Array(props.length).fill(""));

watch(
  () => props.modelValue,
  (v) => {
    digits.value = Array.from({ length: props.length }, (_, i) => v[i] || "");
  },
);
const commit = () => emit("update:modelValue", digits.value.join(""));
const focus = (i) =>
  inputs.value[Math.max(0, Math.min(props.length - 1, i))]?.focus();

function onInput(e, i) {
  const v = e.target.value.replace(/\D/g, "");
  if (!v) {
    digits.value[i] = "";
    return commit();
  }
  v.split("")
    .slice(0, props.length - i)
    .forEach((d, k) => (digits.value[i + k] = d));
  commit();
  focus(i + v.length);
}
function onKeydown(e, i) {
  if (e.key === "Backspace" && !digits.value[i]) {
    digits.value[i - 1] = "";
    commit();
    focus(i - 1);
  }
  if (e.key === "ArrowLeft") focus(i - 1);
  if (e.key === "ArrowRight") focus(i + 1);
}
function onPaste(e) {
  const v = e.clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, props.length);
  if (!v) return;
  e.preventDefault();
  digits.value = Array.from({ length: props.length }, (_, i) => v[i] || "");
  commit();
  focus(v.length);
}
</script>

<template>
  <div class="otp" @paste="onPaste">
    <input
      v-for="(d, i) in digits"
      :key="i"
      :ref="(el) => (inputs[i] = el)"
      :value="d"
      :class="{ error }"
      type="text"
      inputmode="numeric"
      autocomplete="one-time-code"
      maxlength="5"
      :aria-label="`Digit ${i + 1}`"
      @input="onInput($event, i)"
      @keydown="onKeydown($event, i)"
      @focus="$event.target.select()"
    />
  </div>
</template>

<style scoped>
.otp {
  display: flex;
  justify-content: center;
  gap: 12px;
}
input {
  width: 17%;
  max-width: 62px;
  aspect-ratio: 1 / 0.98;
  min-width: 0;
  border: 1px solid transparent;
  border-radius: 8px;
  text-align: center;
  font-size: 26px;
  background: rgba(255, 255, 255, 0.85);
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
input:focus {
  border-color: #c2185b;
  box-shadow: 0 0 0 2px rgba(194, 24, 91, 0.25);
}
input.error {
  border-color: #f0434f;
  background: #f6f6f6;
}
</style>

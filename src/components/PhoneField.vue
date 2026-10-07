<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: String,
  code: { type: String, default: "+965" },
});
const emit = defineEmits(["update:modelValue", "update:code"]);

const flags = import.meta.glob("../assets/flags/*.svg", {
  eager: true,
  import: "default",
});
const flagUrl = (iso) => flags[`../assets/flags/${iso}.svg`];

const countries = [
  { code: "+965", iso: "kw", name: "Kuwait" },
  { code: "+966", iso: "sa", name: "Saudi Arabia" },
  { code: "+971", iso: "ae", name: "UAE" },
  { code: "+974", iso: "qa", name: "Qatar" },
  { code: "+973", iso: "bh", name: "Bahrain" },
  { code: "+968", iso: "om", name: "Oman" },
  { code: "+92", iso: "pk", name: "Pakistan" },
  { code: "+20", iso: "eg", name: "Egypt" },
];
const current = computed(
  () => countries.find((c) => c.code === props.code) || countries[0],
);
const onInput = (e) =>
  emit("update:modelValue", e.target.value.replace(/\D/g, ""));
</script>

<template>
  <div class="field">
    <label for="phone">Contact Number</label>
    <div class="row">
      <div class="code">
        <img class="flag" :src="flagUrl(current.iso)" :alt="current.name" />
        <span class="code-val">{{ current.code }}</span>
        <svg
          class="chevron"
          width="8"
          height="5"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="#111"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <select
          :value="code"
          @change="emit('update:code', $event.target.value)"
          aria-label="Country code"
        >
          <option v-for="c in countries" :key="c.code" :value="c.code">
            {{ c.name }} ({{ c.code }})
          </option>
        </select>
      </div>
      <input
        id="phone"
        type="tel"
        inputmode="numeric"
        autocomplete="tel-national"
        maxlength="12"
        :value="modelValue"
        @input="onInput"
      />
    </div>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
label {
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
}
.row {
  display: flex;
  gap: 8px;
}
.code {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  height: 46px;
  border-radius: 8px;
  background: rgba(216, 221, 224, 0.85);
  white-space: nowrap;
  cursor: pointer;
}
.flag {
  width: 24px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
}
.code-val {
  font-size: 14px;
  font-weight: 500;
  color: #111;
}
.chevron {
  margin-left: 2px;
}
.code select {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
input {
  flex: 1;
  min-width: 0;
  height: 46px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  background: rgba(216, 221, 224, 0.85);
  outline: none;
  font-size: 15px;
  color: #111;
  transition: box-shadow 0.2s;
}
input:focus,
.code:focus-within {
  box-shadow: 0 0 0 2px #c2185b;
}
</style>

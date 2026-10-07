<script setup>
defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  type: { type: String, default: "text" },
  id: String,
  autocomplete: String,
});
defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="field">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;
}
label {
  font-size: 13px;
  font-weight: 500;
  color: #1a1a1a;
}
input {
  height: 46px;
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  background: rgba(216, 221, 224, 0.85);
  color: #111;
  outline: none;
  transition: box-shadow 0.2s;
}
input::placeholder {
  color: #8e9599;
  font-weight: 400;
}
input:focus {
  box-shadow: 0 0 0 2px #c2185b;
}
</style>

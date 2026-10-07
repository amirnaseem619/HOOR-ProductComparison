<script setup>
defineProps({ tag: String, title: String, arrows: Boolean });
defineEmits(["prev", "next"]);
</script>
<template>
  <div class="head">
    <div>
      <p class="tag"><i></i>{{ tag }}</p>
      <h2>{{ title }}</h2>
    </div>
    <slot />
    <div v-if="arrows" class="arrows">
      <button aria-label="Previous" @click="$emit('prev')">←</button>
      <button aria-label="Next" @click="$emit('next')">→</button>
    </div>
  </div>
</template>
<style scoped>
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}
.tag {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 4px;
  color: #f0a35e;
  font-weight: 600;
  font-size: 14px;
}
.tag i {
  width: 16px;
  height: 22px;
  border-radius: 4px;
  background: #f0a35e;
}
h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 500;
}
.arrows {
  display: flex;
  gap: 12px;
}
.arrows button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0;
  background: #f0e6dc;
  font-size: 20px;
  cursor: pointer;
}
.arrows button:hover {
  background: #e8d6c4;
}
</style>

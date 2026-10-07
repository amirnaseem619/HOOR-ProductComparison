<script setup>
import snapchat from "../assets/snapchat.png";
import google from "../assets/google.png";
defineProps({ verb: { type: String, default: "Login" } });
defineEmits(["snapchat", "google"]);
</script>

<template>
  <div class="or"><span>OR</span></div>
  <div class="social">
    <button type="button" @click="$emit('snapchat')">
      <img :src="snapchat" alt="" />
      <span>{{ verb }} with Snapchat</span>
    </button>
    <button type="button" @click="$emit('google')">
      <img :src="google" alt="" />
      <span>{{ verb }} with Google</span>
    </button>
  </div>
</template>

<style scoped>
.or {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0 16px;
}
.or span {
  font-size: 11px;
  font-weight: 500;
  color: #555b61;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.or::before,
.or::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #8e9499;
}
.social {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.social button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: #ffffff;
  cursor: pointer;
  font-size: 12.5px;
  font-weight: 500;
  color: #1a1a1a;
  white-space: nowrap;
  padding: 0 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition:
    box-shadow 0.2s,
    transform 0.1s;
}
.social button:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.social button:focus-visible {
  outline: 2px solid #c2185b;
  outline-offset: 2px;
}
.social img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
}
@media (max-width: 440px) {
  .social {
    grid-template-columns: 1fr;
  }
}
</style>

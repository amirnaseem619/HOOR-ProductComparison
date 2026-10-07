<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "../components/AuthLayout.vue";
import PhoneField from "../components/PhoneField.vue";
import SocialButtons from "../components/SocialButtons.vue";

const router = useRouter();
const code = ref("+965");
const phone = ref("");
const canSubmit = computed(() => phone.value.length >= 8);

function submit() {
  if (!canSubmit.value) return;
  // TODO: call your API, e.g. api.login({ phone: code.value + phone.value })
  console.log("login", code.value + phone.value);
  router.push("/verify");
}
</script>

<template>
  <AuthLayout>
    <form @submit.prevent="submit" novalidate>
      <PhoneField v-model="phone" v-model:code="code" />
      <button class="primary" :disabled="!canSubmit">Login</button>
    </form>
    <SocialButtons
      verb="Login"
      @snapchat="console.log('snap login')"
      @google="console.log('google login')"
    />
  </AuthLayout>
</template>

<style scoped>
.primary {
  width: 100%;
  height: 44px;
  margin-top: 20px;
  border: 0;
  border-radius: 999px;
  font-size: 14.5px;
  font-weight: 600;
  color: #ffffff;
  background: #c2185b;
  cursor: pointer;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.primary:disabled {
  background: #6c7073;
  color: #ffffff;
  cursor: not-allowed;
  font-weight: 500;
}
.primary:not(:disabled):hover {
  background: #a8134d;
}
</style>

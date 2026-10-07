<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "../components/AuthLayout.vue";
import TextField from "../components/TextField.vue";
import PhoneField from "../components/PhoneField.vue";
import SocialButtons from "../components/SocialButtons.vue";

const router = useRouter();
const name = ref("");
const email = ref("");
const code = ref("+965");
const phone = ref("");
const canSubmit = computed(
  () =>
    name.value.trim() &&
    /^\S+@\S+\.\S+$/.test(email.value) &&
    phone.value.length >= 8,
);

function submit() {
  if (!canSubmit.value) return;
  // TODO: call your API, e.g. api.signup({ name, email, phone })
  console.log("signup", {
    name: name.value,
    email: email.value,
    phone: code.value + phone.value,
  });
  router.push("/verify");
}
</script>

<template>
  <AuthLayout>
    <form @submit.prevent="submit" novalidate>
      <TextField
        id="name"
        label="First name"
        placeholder="Enter your name"
        autocomplete="given-name"
        v-model="name"
      />
      <TextField
        id="email"
        label="Email address"
        type="email"
        placeholder="Enter your email address"
        autocomplete="email"
        v-model="email"
      />
      <PhoneField v-model="phone" v-model:code="code" />
      <button class="primary" :disabled="!canSubmit">Sign up</button>
    </form>
    <SocialButtons
      verb="Sign up"
      @snapchat="console.log('snap signup')"
      @google="console.log('google signup')"
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

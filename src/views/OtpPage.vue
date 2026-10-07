<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import AuthLayout from "../components/AuthLayout.vue";
import OtpInput from "../components/OtpInput.vue";

const LENGTH = 5;
const RESEND_SECONDS = 59;

const code = ref("");
const error = ref("");
const loading = ref(false);
const seconds = ref(RESEND_SECONDS);
let timer;

const canSubmit = computed(
  () => code.value.length === LENGTH && !error.value && !loading.value,
);
const timeLabel = computed(() => `0:${String(seconds.value).padStart(2, "0")}`);

function startTimer() {
  clearInterval(timer);
  seconds.value = RESEND_SECONDS;
  timer = setInterval(() => {
    if (--seconds.value <= 0) clearInterval(timer);
  }, 1000);
}
onMounted(startTimer);
onBeforeUnmount(() => clearInterval(timer));

// clear the error as soon as the user edits the code
const onCodeChange = (v) => {
  code.value = v;
  error.value = "";
};

async function submit() {
  if (!canSubmit.value) return;
  loading.value = true;
  try {
    // TODO: replace with your API, e.g. await api.verifyOtp(code.value)
    const ok = false; // <- demo: set from the API response
    if (!ok) throw new Error("invalid");
    // router.push('/home')  // <- uncomment after real verification
  } catch {
    error.value = "The code is not correct. please try again later.";
  } finally {
    loading.value = false;
  }
}

function resend() {
  if (seconds.value > 0) return;
  // TODO: call your API to resend the OTP
  code.value = "";
  error.value = "";
  startTimer();
}
</script>

<template>
  <AuthLayout compact>
    <p class="hint">
      Enter the 5 Digits Code you received via<br />your registered phone number
    </p>

    <form @submit.prevent="submit" novalidate>
      <OtpInput
        :model-value="code"
        :length="LENGTH"
        :error="!!error"
        @update:model-value="onCodeChange"
      />
      <p v-if="error" class="err" role="alert">{{ error }}</p>
      <button class="primary" :class="{ gap: !error }" :disabled="!canSubmit">
        Continue
      </button>
    </form>

    <p v-if="!error" class="resend">
      Didn’t get an OTP?
      <button
        type="button"
        class="link"
        :disabled="seconds > 0"
        @click="resend"
      >
        {{ seconds > 0 ? `Resend in ${timeLabel}` : "Resend" }}
      </button>
    </p>
  </AuthLayout>
</template>

<style scoped>
.hint {
  text-align: center;
  font-size: clamp(16px, 1.3vw, 20px);
  line-height: 1.5;
  margin: 6px 0 24px;
}
.err {
  text-align: center;
  color: #e5222f;
  font-size: 15px;
  margin: 10px 0 0;
}
.primary {
  display: block;
  width: calc(100% - 32px);
  margin: 22px auto 0;
  height: 56px;
  border: 0;
  border-radius: 999px;
  font-size: 19px;
  font-weight: 500;
  color: #fff;
  background: #c2185b;
  cursor: pointer;
  transition: background 0.2s;
}
.primary.gap {
  margin-top: 38px;
}
.primary:disabled {
  background: #6f6f6f;
  color: #cfcfcf;
  cursor: not-allowed;
}
.primary:not(:disabled):hover {
  background: #a8134d;
}
.resend {
  text-align: center;
  margin: 28px 0 0;
  font-size: 17px;
}
.link {
  border: 0;
  background: none;
  padding: 0;
  margin-left: 6px;
  font-size: inherit;
  color: #0a6cff;
  cursor: pointer;
}
.link:disabled {
  cursor: default;
}
</style>

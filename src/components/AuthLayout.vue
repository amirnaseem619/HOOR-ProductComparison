<script setup>
import logo from "../assets/logo.png";
import bg from "../assets/bg.png";
defineProps({ compact: Boolean }); // compact = logo only (OTP page)
</script>

<template>
  <main
    class="page"
    :style="{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), url(${bg})`,
    }"
  >
    <section class="card">
      <img class="logo" :src="logo" alt="TOOR" />
      <template v-if="!compact">
        <h1 class="tagline">Find the Best Beauty Deals Near You</h1>
        <nav class="tabs" aria-label="Authentication">
          <router-link to="/signup" class="tab" active-class="active"
            >Sign up</router-link
          >
          <router-link to="/login" class="tab" active-class="active"
            >Log in</router-link
          >
        </nav>
      </template>
      <div v-else class="spacer" />

      <slot />
    </section>

    <p class="terms">
      By signing up, you agree to the
      <a href="/terms">Terms of Service</a> and
      <a href="/privacy">Privacy Policy</a>, including
      <a href="/cookies">cookie use.</a>
    </p>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 0 9vw;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}
.card {
  width: clamp(320px, 28.5vw, 550px);
  padding: 32px 28px 28px;
  border-radius: 24px;
  background: rgba(236, 238, 240, 0.88);
  backdrop-filter: blur(24px) saturate(1.1);
  -webkit-backdrop-filter: blur(24px) saturate(1.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
}
.logo {
  width: 170px;
  max-width: 44%;
  align-self: center;
  height: auto;
  margin: 0 auto 10px;
}
.spacer {
  height: 20px;
}
.tagline {
  margin: 0 0 18px;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #222222;
  letter-spacing: -0.2px;
}

.tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 18px;
}
.tab {
  text-align: center;
  padding: 10px 0;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  background: #d48fa8;
  transition:
    background 0.2s,
    font-weight 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab.active {
  background: #c2185b;
  font-weight: 700;
}
.tab:focus-visible {
  outline: 2px solid #fff;
  outline-offset: -3px;
}

.terms {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: 0;
  text-align: center;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 400;
  padding: 0 16px;
  letter-spacing: 0.1px;
}
.terms a {
  color: #ffffff;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (max-width: 720px) {
  .page {
    padding: 24px 16px 84px;
    justify-content: center;
    align-items: flex-start;
  }
  .card {
    width: 100%;
    max-width: 440px;
    padding: 28px 20px 24px;
  }
  .terms {
    bottom: 16px;
    font-size: 12.5px;
  }
}
</style>

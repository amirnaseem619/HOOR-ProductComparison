<script setup>
import logo from "../assets/logo.png";
</script>

<template>
  <footer id="contact">
    <div class="main">
      <img class="logo" :src="logo" alt="HOOR" />

      <div class="col">
        <h6>About Hoor</h6>
        <a href="#">About us</a><a href="#">Our Partners</a
        ><a href="#categories">Categories</a>
      </div>

      <div class="col">
        <h6>Support</h6>
        <a href="#">Terms &amp; Conditions</a><a href="#">Contact Support</a
        ><a href="#">Privacy Policy</a>
      </div>

      <div class="col share">
        <h6>Share</h6>
        <p class="soc">
          <a href="#" aria-label="Facebook"
            ><svg width="22" height="22" viewBox="0 0 24 24" fill="#111">
              <path
                d="M14 8V6.500c0-.7.200-1 1.200-1H17V2h-2.700C11.300 2 10 3.700 10 6v2H7.500v3.500H10V22h4v-10.500h2.800L17.300 8z"
              /></svg
          ></a>
          <a href="#" aria-label="Twitter"
            ><svg width="22" height="22" viewBox="0 0 24 24" fill="#111">
              <path
                d="M22 5.900a8 8 0 0 1-2.300.6 4 4 0 0 0 1.800-2.200 8 8 0 0 1-2.600 1 4 4 0 0 0-6.900 3.600A11.400 11.400 0 0 1 3.800 4.700a4 4 0 0 0 1.200 5.400 4 4 0 0 1-1.800-.5 4 4 0 0 0 3.200 4 4 4 0 0 1-1.800.1 4 4 0 0 0 3.800 2.800A8 8 0 0 1 2 18.200 11.400 11.400 0 0 0 8.200 20c7.400 0 11.500-6.200 11.300-11.800A8 8 0 0 0 22 5.900z"
              /></svg
          ></a>
          <a href="#" aria-label="LinkedIn"
            ><svg width="22" height="22" viewBox="0 0 24 24" fill="#111">
              <path
                d="M4.500 8.500h3.800V20H4.500zM6.400 3a2.200 2.200 0 1 1 0 4.400 2.200 2.200 0 0 1 0-4.400zM10.500 8.500h3.600v1.600c.6-1 1.900-1.900 3.800-1.900 3.800 0 4.500 2.500 4.500 5.700V20h-3.800v-5.300c0-1.300 0-2.900-1.800-2.900s-2 1.400-2 2.800V20h-3.800z"
              /></svg
          ></a>
        </p>
        <router-link to="/stores/online" class="find"
          >Find Nearest Store Around You</router-link
        >
      </div>

      <div class="col apps">
        <h6>Download Now</h6>
        <a href="#" class="badge" aria-label="Get it on Google Play">
          <svg width="22" height="24" viewBox="0 0 22 24">
            <path d="M1 1l11 11L1 23z" fill="#00d2ff" />
            <path d="M1 1l14 8-3 3z" fill="#00f076" />
            <path d="M1 23l14-8-3-3z" fill="#ff3a44" />
            <path d="M15 9l5 3-5 3-3-3z" fill="#ffd400" />
          </svg>
          <span><small>GET IT ON</small>Google Play</span>
        </a>
        <a href="#" class="badge" aria-label="Download on the App Store">
          <svg width="22" height="24" viewBox="0 0 24 24" fill="#fff">
            <path
              d="M16.400 12.600c0-2.300 1.900-3.400 2-3.500-1.100-1.600-2.800-1.800-3.400-1.800-1.400-.2-2.800.8-3.500.8s-1.800-.8-3-.8c-1.500 0-3 .9-3.800 2.300-1.600 2.800-.4 7 1.200 9.300.8 1.100 1.700 2.400 2.900 2.300 1.200 0 1.600-.7 3-.7s1.800.7 3 .7 2-1.100 2.800-2.200c.9-1.300 1.200-2.500 1.300-2.600-.1 0-2.500-1-2.500-3.800zM14.100 5.800c.6-.8 1.100-1.900.9-3-.9 0-2.100.6-2.700 1.400-.6.700-1.100 1.800-1 2.900 1 .1 2.100-.5 2.800-1.300z"
            />
          </svg>
          <span><small>Download on the</small>App Store</span>
        </a>
      </div>
    </div>
    <p class="copy">© Deeplenz 2026 - All Rights Reserved</p>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 70px;
  background: #fdf3ea;
}
.main {
  width: 100%;
  padding: 44px 7vw 48px;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.3fr 1fr;
  gap: 24px;
  align-items: start;
}
.logo {
  width: clamp(130px, 13vw, 190px);
  align-self: center;
}
h6 {
  margin: 0 0 18px;
  font-size: 15px;
  font-weight: 500;
  color: #111;
}
.col a {
  display: block;
  color: #444;
  text-decoration: none;
  font-size: 12px;
  margin-bottom: 16px;
}
.col a:hover {
  color: #c2185b;
}
.soc {
  display: flex;
  gap: 18px;
  margin: 0 0 16px;
}
.soc a {
  margin: 0;
  display: inline-flex;
}
.share .find {
  font-size: 15px;
  color: #222;
  max-width: 250px;
  line-height: 1.4;
}
.apps {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.apps .badge {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 165px;
  white-space: nowrap;
  background: #000;
  color: #fff;
  border-radius: 8px;
  padding: 7px 14px;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.1;
}
.badge span {
  display: flex;
  flex-direction: column;
}
.badge small {
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.3px;
}
.copy {
  margin: 0;
  background: #b0155a;
  color: #fff;
  text-align: center;
  font-size: 11px;
  padding: 14px;
}
@media (max-width: 900px) {
  .main {
    grid-template-columns: 1fr 1fr;
    padding: 32px 5vw;
  }
  .logo {
    grid-column: 1 / -1;
  }
}
</style>

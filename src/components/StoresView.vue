<script setup>
import { computed } from "vue";
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";
import { allStores, slug } from "../data/home";

const props = defineProps({ mode: { type: String, default: "online" } }); // 'online' | 'physical'
const address = "Beauty Glow Store Al Azizyah street 45A 123 Shop Number";
const title = computed(() =>
  props.mode === "online" ? "Online Stores" : "Physical Stores",
);
</script>

<template>
  <AppHeader />
  <main>
    <div class="wrap">
      <div class="top" :class="{ physical: mode === 'physical' }">
        <div>
          <p class="tag"><i></i>Stores</p>
          <h1>{{ title }}</h1>
          <router-link
            v-if="mode === 'physical'"
            to="/stores/near"
            class="addr"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#c0394b">
              <path
                d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.500A2.500 2.500 0 1 1 12 6.500a2.500 2.500 0 0 1 0 5z"
              />
            </svg>
            {{ address }}
          </router-link>
        </div>
        <nav class="toggle" aria-label="Store type">
          <router-link to="/stores/online" :class="{ on: mode === 'online' }"
            >Online</router-link
          >
          <router-link
            to="/stores/physical"
            :class="{ on: mode === 'physical' }"
            >Physical</router-link
          >
        </nav>
      </div>

      <div class="grid">
        <component
          is="router-link"
          v-for="(s, i) in allStores"
          :key="i"
          :to="`/stores/${mode}/${slug(s.name)}`"
          class="card"
        >
          <div class="pic">
            <img :src="s.img" :alt="s.name" /><span>OPEN</span>
          </div>
          <div class="info">
            <h3>{{ s.name }}</h3>
            <p class="stars">
              ★★★★★ <b>({{ s.rating }})</b>
            </p>
            <p v-if="mode === 'online'">
              <svg viewBox="0 0 24 24">
                <path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" /></svg
              >{{ s.site }}
            </p>
            <p v-else>
              <svg viewBox="0 0 24 24">
                <path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" /></svg
              >4 Stores
            </p>
            <p>
              <svg viewBox="0 0 24 24">
                <path
                  d="M3 21V8h7v13M10 21V3h11v18M6 12h1M6 16h1M14 7h3M14 11h3M14 15h3"
                /></svg
              >{{ s.products }} Products
            </p>
            <p>
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" /></svg
              >{{ s.hours }}
            </p>
          </div>
        </component>
      </div>
    </div>
  </main>
  <AppFooter />
</template>

<style scoped>
main {
  background: #fefaf6;
  min-height: calc(100vh - 64px);
}
.wrap {
  width: 100%;
  padding: 60px 6vw 120px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}
.tag {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
  color: #f0a35e;
  font-weight: 600;
  font-size: 15px;
}
.tag i {
  width: 22px;
  height: 26px;
  border-radius: 5px;
  background: #f0a35e;
}
h1 {
  margin: 0;
  font-family: "Marcellus", "Cormorant Garamond", Georgia, serif;
  font-size: clamp(30px, 3vw, 44px);
  font-weight: 400;
}

.addr {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 18px 0 0;
  font-size: 16px;
}
.top.physical {
  margin-bottom: 36px;
}
.toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: min(100%, 430px);
  height: 44px;
  border-radius: 999px;
  overflow: hidden;
  background: #e9e9e9;
}
.toggle a {
  display: grid;
  place-items: center;
  text-decoration: none;
  background: transparent;
  font-size: 16px;
  color: #aaa;
  border-radius: 999px;
  transition:
    background 0.2s,
    color 0.2s;
}
.toggle a.on {
  background: #c2185b;
  color: #fff;
  font-weight: 600;
}
.toggle a:focus-visible {
  outline: 2px solid #c2185b;
  outline-offset: 2px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px 3vw;
}
.card {
  color: inherit;
  text-decoration: none;
  display: flex;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  min-height: 138px;
}
.pic {
  position: relative;
  flex: 0 0 48%;
}
.pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.pic span {
  position: absolute;
  left: 10px;
  top: 10px;
  background: #12b02a;
  color: #fff;
  font-size: 11px;
  padding: 3px 9px;
  border-radius: 3px;
}
.info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
}
h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 500;
}
.info p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 12.5px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info svg {
  width: 15px;
  height: 15px;
  flex: none;
  fill: none;
  stroke: #f0a35e;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.stars {
  color: #f6a21e !important;
  font-size: 13px !important;
  letter-spacing: 1px;
}
.stars b {
  color: #111;
  font-weight: 600;
  letter-spacing: 0;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .wrap {
    padding-bottom: 60px;
  }
}
</style>

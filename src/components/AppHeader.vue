<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "../assets/logo.png";
import { img } from "../data/home";
const router = useRouter();
const open = ref(false);
</script>

<template>
  <header class="bar">
    <button class="lang" aria-label="Language">
      <img :src="img('flag-us.svg')" alt="" /> ENG
      <svg width="9" height="6" viewBox="0 0 10 6" fill="none">
        <path
          d="M1 1l4 4 4-4"
          stroke="#111"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <nav class="links left">
      <router-link to="/home#compare"
        ><i :style="{ '--ic': `url(${img('i-compare.png')})` }"></i
        >Compare</router-link
      >
      <router-link
        to="/stores/online"
        :class="{
          'router-link-exact-active': /^\/stores\/(online|physical|near)$/.test(
            $route.path,
          ),
        }"
        ><i :style="{ '--ic': `url(${img('i-store.png')})` }"></i>Nearby
        Stores</router-link
      >
    </nav>
    <router-link to="/home" class="brand"
      ><img :src="logo" alt="HOOR"
    /></router-link>
    <nav class="links right">
      <router-link to="/home#categories"
        ><i :style="{ '--ic': `url(${img('i-categories.png')})` }"></i
        >Categories</router-link
      >
      <a href="#contact"
        ><i :style="{ '--ic': `url(${img('i-info.png')})` }"></i>Contact Us</a
      >
    </nav>
    <div class="user">
      <button class="who" @click="open = !open" :aria-expanded="open">
        <img :src="img('avatar.png')" alt="" /><span>Layla Sofia</span>
      </button>
      <div v-if="open" class="menu">
        <a href="#"
          ><svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            stroke-width="1.6"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"
            /></svg
          >Profile Settings</a
        >
        <a href="#" @click.prevent="router.push('/login')"
          ><svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            stroke-width="1.6"
          >
            <path d="M10 5H5v14h5M15 8l-4 4 4 4M11 12h9" /></svg
          >Sign Out</a
        >
      </div>
    </div>
  </header>
</template>

<style scoped>
.bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  height: 64px;
  background: linear-gradient(90deg, #fff 0%, #fffaf2 55%, #fff6d9 100%);
  border-bottom: 1px solid #e3d3b8;
  padding-left: 28px;
}
.lang {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: none;
  font-size: 14px;
  cursor: pointer;
  padding-right: 28px;
  border-right: 1px solid #e3d3b8;
  height: 100%;
}
.lang img {
  width: 24px;
  height: 18px;
  object-fit: cover;
}
.links {
  flex: 1;
  display: flex;
  gap: 40px;
}
.links.left {
  justify-content: center;
}
.links.right {
  justify-content: center;
}
.links a {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}
.links a:hover,
.links a.router-link-exact-active {
  color: #c2185b;
}
.links a.router-link-exact-active {
  font-weight: 600;
}
.links i {
  width: 18px;
  height: 18px;
  background: currentColor;
  -webkit-mask: var(--ic) center / contain no-repeat;
  mask: var(--ic) center / contain no-repeat;
}
.brand img {
  height: 56px;
  display: block;
}
.user {
  position: relative;
  height: 100%;
  border-left: 1px solid #e3d3b8;
}
.who {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  height: 100%;
  padding: 0 22px;
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 12px;
}
.who img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}
.menu {
  position: absolute;
  right: 8px;
  top: 70px;
  width: 210px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.14);
  padding: 8px 0;
}
.menu a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  color: #111;
  text-decoration: none;
  font-size: 15px;
}
.menu a:hover {
  background: #fdf3ea;
}
@media (max-width: 900px) {
  .links {
    display: none;
  }
  .brand {
    margin: 0 auto;
  }
  .bar {
    padding-left: 12px;
  }
  .lang {
    padding-right: 12px;
  }
}
</style>

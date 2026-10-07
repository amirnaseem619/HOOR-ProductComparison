<script setup>
import { ref, computed } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import StoresNear from "../components/StoresNear.vue";
import ProductCard from "../components/ProductCard.vue";
import { img, nearProducts } from "../data/home";

const sort = ref("popular");
const products = computed(() => {
  const l = [...nearProducts];
  if (sort.value === "low") l.sort((a, b) => a.price - b.price);
  if (sort.value === "high") l.sort((a, b) => b.price - a.price);
  return l;
});
</script>

<template>
  <AppHeader />
  <main>
    <div class="page">
      <div class="top">
        <div>
          <p class="tag"><i></i>Nearest Stores</p>
          <h1>Stores near You</h1>
        </div>
        <nav class="toggle" aria-label="Store type">
          <router-link to="/stores/online">Online</router-link>
          <router-link to="/stores/physical" class="on">Physical</router-link>
        </nav>
      </div>

      <section class="panel"><StoresNear :map-src="img('map.jpg')" /></section>

      <section class="products">
        <div class="phead">
          <h2>Products</h2>
          <label class="sort"
            >Sort by
            <select v-model="sort" aria-label="Sort products">
              <option value="popular">Most Popular</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>
        <div class="grid">
          <ProductCard v-for="(p, i) in products" :key="p.name + i" :p="p" />
        </div>
      </section>
    </div>
  </main>
  <AppFooter />
</template>

<style scoped>
main {
  background: #fefaf6;
}
.page {
  width: 100%;
  padding: 60px 6vw 40px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
  padding: 0 1.5vw;
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
  font-size: 16px;
  color: #aaa;
  border-radius: 999px;
}
.toggle a.on {
  background: #c2185b;
  color: #fff;
  font-weight: 600;
}

.panel {
  background: rgba(255, 255, 255, 0.65);
  padding: 24px 1.6vw 28px;
  margin: 0 1.2vw;
}
.products {
  margin-top: 110px;
}
.phead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}
h2 {
  margin: 0;
  font-family: "Marcellus", Georgia, serif;
  font-size: clamp(28px, 2.6vw, 40px);
  font-weight: 400;
}
.sort {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #eadfd5;
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 14px;
  color: #999;
  background: #fff;
}
.sort select {
  border: 0;
  background: none;
  font-size: 14px;
  font-weight: 500;
  color: #111;
  outline: none;
  cursor: pointer;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px 2.4vw;
}
@media (max-width: 1000px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .panel {
    margin: 0;
  }
}
</style>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import ProductCard from "../components/ProductCard.vue";
import {
  img,
  allStores,
  slug,
  nearProducts,
  onlineProducts,
} from "../data/home";

const props = defineProps({ mode: { type: String, default: "physical" } }); // 'physical' | 'online'
const online = computed(() => props.mode === "online");
const route = useRoute();
const store = computed(
  () =>
    allStores.find((s) => slug(s.name) === route.params.slug) || allStores[0],
);
const site = computed(() => store.value.site);

const sort = ref("rating");
const filter = ref("Makeup");
const physicalBase = [
  ...nearProducts.slice(0, 4),
  ...nearProducts
    .slice(4)
    .map((p) => ({ ...p, name: "Hydrating Serum", price: 120 })),
];
const base = computed(() =>
  online.value
    ? onlineProducts.map((p) => ({
        ...p,
        store: store.value.name,
        site: store.value.site || p.site,
      }))
    : physicalBase,
);
const products = computed(() => {
  const l = [...base.value];
  if (sort.value === "low") l.sort((a, b) => a.price - b.price);
  if (sort.value === "high") l.sort((a, b) => b.price - a.price);
  return l;
});
</script>

<template>
  <AppHeader />
  <main>
    <div class="page">
      <p class="tag"><i></i>{{ online ? "Online Store" : "Physical Store" }}</p>
      <h1>Store Information</h1>

      <section class="info">
        <div class="photo">
          <img
            :src="img(online ? 'cat-makeup.png' : 'store-hero.jpg')"
            :alt="store.name"
          />
        </div>
        <div class="details">
          <h2>{{ store.name }}</h2>
          <p class="rate">
            <span class="stars"><b>★★★★</b><b class="half">★</b></span> 288
            reviews
          </p>
          <ul>
            <li v-if="!online">
              <svg viewBox="0 0 24 24">
                <path
                  d="M12 22s7-7.500 7-13a7 7 0 0 0-14 0c0 5.500 7 13 7 13z"
                />
                <circle cx="12" cy="9" r="2.500" /></svg
              >243 street Al Ghazi sheh area 232, Jeddah, Saudi Arabia
            </li>
            <li>
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9.500" />
                <path
                  d="M2.500 12h19M12 2.500c3 3 3 16 0 19M12 2.500c-3 3-3 16 0 19"
                /></svg
              >Visit Online: {{ site }}
            </li>
            <li>
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9.500" />
                <path d="M12 7v5l3 2" /></svg
              >{{ store.hours.replace(" - ", " - ") }}
            </li>
            <li>
              <svg viewBox="0 0 24 24">
                <path
                  d="M3 21V8h7v13M10 21V3h11v18M6 12h1M6 16h1M14 7h3M14 11h3M14 15h3"
                /></svg
              >{{ store.products }} Products
            </li>
          </ul>
          <a href="#" class="dir">Get Direction <span>→</span></a>
          <p class="desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>

      <section class="products">
        <div class="phead">
          <h2>{{ online ? "Online Products" : "Products" }}</h2>
          <div class="ctrls">
            <label
              >Sort by:
              <select v-model="sort" aria-label="Sort products">
                <option value="rating">High Ratings</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select></label
            >
            <label
              >Filter by:
              <select v-model="filter" aria-label="Filter products">
                <option>Makeup</option>
                <option>Skincare</option>
                <option>Haircare</option>
                <option>Fragrance</option>
              </select></label
            >
          </div>
        </div>
        <div class="grid">
          <ProductCard
            v-for="(p, i) in products"
            :key="i"
            :p="p"
            :mode="online ? 'online' : 'physical'"
          />
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
  padding: 14px 5.4vw 20px;
}
.tag {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #f0a35e;
  font-weight: 600;
  font-size: 14px;
}
.tag i {
  width: 14px;
  height: 16px;
  border-radius: 3px;
  background: #f0a35e;
}
h1 {
  margin: 0 0 12px;
  font-family: "Marcellus", Georgia, serif;
  font-size: clamp(28px, 2.6vw, 38px);
  font-weight: 400;
}

.info {
  display: grid;
  grid-template-columns: 5fr 5.6fr;
  gap: 2.4vw;
  align-items: start;
}
.photo {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 502 / 335;
}
.photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.details h2 {
  margin: 0;
  font-size: clamp(30px, 2.8vw, 40px);
  font-weight: 700;
  color: #1b2a49;
  line-height: 1.1;
}
.rate {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 10px 0 14px;
  font-size: 16px;
  font-weight: 500;
}
.stars {
  display: inline-flex;
  font-size: 24px;
  letter-spacing: 2px;
  line-height: 1;
}
.stars b {
  color: #f6a21e;
  font-weight: 400;
}
.stars .half {
  background: linear-gradient(90deg, #f6a21e 50%, #d9cdbd 50%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
ul {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: clamp(15px, 1.25vw, 18px);
  color: #555;
}
li svg {
  width: 22px;
  height: 22px;
  flex: none;
  fill: none;
  stroke: #f0a35e;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.dir {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #000;
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 500;
  padding: 12px 26px;
  border-radius: 4px;
}
.dir:hover {
  background: #c2185b;
}
.desc {
  margin: 14px 0 0;
  text-align: justify;
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 1.75;
  color: #333;
}

.products {
  margin-top: 36px;
  padding: 0 0.8vw;
}
.phead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 38px;
  flex-wrap: wrap;
  gap: 12px;
}
.phead h2 {
  margin: 0;
  font-family: "Marcellus", Georgia, serif;
  font-size: clamp(28px, 2.6vw, 40px);
  font-weight: 400;
}
.ctrls {
  display: flex;
  gap: 14px;
}
.ctrls label {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #eadfd5;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #999;
  background: #fff;
}
.ctrls select {
  border: 0;
  background: none;
  font-size: 13px;
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
  .info {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

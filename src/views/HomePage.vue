<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import SectionHead from "../components/SectionHead.vue";
import ProductCard from "../components/ProductCard.vue";
import StoresNear from "../components/StoresNear.vue";
import {
  img,
  categories,
  flashSale,
  featured,
  locationStores,
} from "../data/home";

// Flash-sale countdown (3d 23h 19m 56s from page load)
const end = Date.now() + ((3 * 24 + 23) * 3600 + 19 * 60 + 56) * 1000;
const left = ref(end - Date.now());
let t;
onMounted(
  () =>
    (t = setInterval(() => (left.value = Math.max(0, end - Date.now())), 1000)),
);
onBeforeUnmount(() => clearInterval(t));
const units = () => {
  const s = Math.floor(left.value / 1000);
  return [
    ["Days", Math.floor(s / 86400)],
    ["Hours", Math.floor(s / 3600) % 24],
    ["Minutes", Math.floor(s / 60) % 60],
    ["Seconds", s % 60],
  ];
};

const track = ref(null);
const scroll = (dir) =>
  track.value?.scrollBy({
    left: dir * track.value.clientWidth * 0.5,
    behavior: "smooth",
  });
</script>

<template>
  <AppHeader />
  <main>
    <section class="hero">
      <div class="hero-l">
        <label class="search"
          ><svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#333"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input aria-label="Search products" /><span
            >⚲ Al Aziz Riyadh</span
          ></label
        >
        <h1>Discover Your<br />Perfect Shade</h1>
        <p>
          Discover and compare the prices for makeup, skincare and beauty
          products from trusted store near you.
        </p>
        <a href="#compare" class="cta">Compare Now</a>
      </div>
      <div class="hero-r">
        <div class="visual">
          <img :src="img('hero.png')" alt="MAC Powder Kiss lipstick" />
          <div class="stat s1"><b>900+</b>Clients</div>
          <div class="stat s2"><b>1M+</b>Products</div>
          <div class="price">
            <small>Price</small
            ><strong style="font-weight: bold; color: #be195e"
              >SAR 250.50</strong
            ><span>Makeup that defines your style!</span>
          </div>
        </div>
      </div>
    </section>

    <section class="partners" aria-label="Partners">
      <span class="wm amazon"
        >amazon<svg viewBox="0 0 60 12" width="52" height="10">
          <path
            d="M3 3c14 8 36 8 52 0"
            stroke="currentColor"
            stroke-width="3"
            fill="none"
            stroke-linecap="round"
          /></svg
      ></span>
      <img :src="img('b-shopify.png')" alt="Shopify" />
      <img :src="img('b-attentive.png')" alt="Attentive" />
      <img :src="img('b-zapier.png')" alt="Zapier" />
      <img :src="img('b-layers.png')" alt="Layers" />
      <span class="wm catalog"
        ><svg viewBox="0 0 40 40" width="38" height="38">
          <path
            d="M31 8a15 15 0 1 0 0 24"
            stroke="currentColor"
            stroke-width="7"
            fill="none"
          />
          <circle cx="31" cy="20" r="5" fill="currentColor" /></svg
        >Catalog</span
      >
    </section>

    <div class="container">
      <section id="categories">
        <SectionHead tag="Categories" title="Browse By Category" />
        <ul class="cats">
          <li v-for="c in categories" :key="c.name">
            <a href="#"
              ><img :src="c.img" :alt="c.name" /><span>{{ c.name }}</span></a
            >
          </li>
        </ul>
      </section>

      <section class="sec">
        <SectionHead
          tag="Today's"
          title="Flash Sale"
          arrows
          @prev="scroll(-1)"
          @next="scroll(1)"
        >
          <div class="timer">
            <div v-for="([l, v], i) in units()" :key="l">
              <small>{{ l }}</small
              ><b>{{ String(v).padStart(2, "0") }}</b
              ><i v-if="i < 3">:</i>
            </div>
          </div>
        </SectionHead>
        <div ref="track" class="products">
          <ProductCard v-for="p in flashSale" :key="p.name" :p="p" />
        </div>
      </section>

      <section class="sec" id="compare">
        <SectionHead tag="Trending" title="Featured Products" arrows />
        <div class="products grid">
          <ProductCard v-for="p in featured" :key="p.name" :p="p" />
        </div>
      </section>

      <section class="sec">
        <SectionHead tag="Nearest Stores" title="Stores near You" arrows />
        <StoresNear />
      </section>

      <section class="sec">
        <h2 class="loc-title">Based on your Current Location</h2>
        <div class="stores">
          <article v-for="s in locationStores" :key="s.name">
            <div class="simg">
              <img :src="s.img" :alt="s.name" /><span>OPEN</span>
            </div>
            <div class="sinfo">
              <h4>{{ s.name }}</h4>
              <p class="stars">
                ★★★★★ <small>({{ s.rating }})</small>
              </p>
              <small>▤ {{ s.stores }} Stores</small
              ><small>▢ {{ s.products }} Products</small
              ><small>◷ {{ s.hours }}</small>
            </div>
          </article>
        </div>
      </section>
    </div>
  </main>
  <AppFooter />
</template>

<style scoped>
main {
  background: #fff;
  overflow-x: hidden;
}
.container {
  width: 100%;
  padding: 56px 4vw 0;
}
.sec {
  margin-top: 70px;
}

.hero {
  display: grid;
  grid-template-columns: minmax(300px, 36%) 1fr;
  align-items: center;
  gap: 2vw;
  width: 100%;
  padding: 0 4vw;
  min-height: clamp(380px, 31vw, 470px);
  background: linear-gradient(180deg, #fffaf4 0%, #fef7ec 100%);
}
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 340px;
  height: 34px;
  background: #fff;
  border-radius: 4px;
  padding: 0 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}
.search input {
  flex: 1;
  border: 0;
  outline: none;
  min-width: 0;
}
.search span {
  font-size: 9px;
  white-space: nowrap;
}
h1 {
  margin: 34px 0 14px;
  font-family: "Cormorant SC", "Cormorant Garamond", Georgia, serif;
  font-size: clamp(36px, 3.6vw, 56px);
  font-weight: 600;
  line-height: 1.12;
  border-left: 2px solid #f0a35e;
  padding-left: 14px;
}
.hero-l p {
  max-width: 340px;
  text-align: justify;
  font-size: 15px;
  line-height: 1.6;
  margin: 0 0 20px;
}
.cta {
  display: inline-grid;
  place-items: center;
  width: 100%;
  max-width: 340px;
  height: 56px;
  background: #c2185b;
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  border-radius: 4px;
}
.cta:hover {
  background: #a8134d;
}

.hero-r {
  display: flex;
  justify-content: center;
  padding: 28px 0;
}
.visual {
  position: relative;
  width: clamp(280px, 29vw, 480px);
  margin-right: clamp(0px, 14vw, 240px);
}
.visual > img {
  display: block;
  width: 100%;
  height: auto;
  -webkit-mask-image:
    linear-gradient(to right, transparent, #000 7%, #000 93%, transparent),
    linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent);
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(to right, transparent, #000 7%, #000 93%, transparent),
    linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent);
  mask-composite: intersect;
}
.stat {
  position: absolute;
  background: #fff;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 11px;
  line-height: 1.3;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}
.stat b {
  display: block;
  font-size: 15px;
}
.s1 {
  left: calc(100% + 1.5vw);
  top: 12%;
}
.s2 {
  left: calc(100% - 1vw);
  top: 34%;
}
.price {
  position: absolute;
  left: calc(100% - 1vw);
  bottom: 20%;
  display: flex;
  flex-direction: column;
  font-size: 11px;
  white-space: nowrap;
}
.price strong {
  font-size: clamp(22px, 2vw, 30px);
  line-height: 1.2;
}

.partners {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 40px 6vw;
  background: #fef7ec;
}
.partners img {
  height: 38px;
  width: auto;
  max-width: 170px;
  object-fit: contain;
  filter: grayscale(1) brightness(0.55);
  opacity: 0.8;
}
.wm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #6b6b6b;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: -0.5px;
}
.wm.amazon {
  position: relative;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  line-height: 1;
}
.wm.amazon svg {
  margin-top: -2px;
  margin-left: 14px;
}

.cats {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 18px;
}
.cats a {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #111;
  text-decoration: none;
  font-size: 18px;
}
.cats img {
  width: 100%;
  aspect-ratio: 1 / 0.8;
  object-fit: cover;
  border-radius: 6px;
  transition: transform 0.2s;
}
.cats a:hover img {
  transform: translateY(-3px);
}

.timer {
  display: flex;
  gap: 22px;
  margin-right: auto;
  margin-left: 120px;
}
.timer div {
  position: relative;
  display: flex;
  flex-direction: column;
}
.timer small {
  font-size: 11px;
}
.timer b {
  font-size: 30px;
  font-weight: 600;
}
.timer i {
  position: absolute;
  right: -15px;
  bottom: 6px;
  color: #f0a35e;
  font-style: normal;
  font-size: 22px;
}

.products {
  display: flex;
  gap: 22px;
  padding-bottom: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.products > * {
  flex: 1 0 calc(25% - 17px);
}
.products.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: visible;
}
.loc-title {
  margin: 0 0 22px;
  font-size: 30px;
  font-weight: 500;
}

.stores {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 24px;
}
.stores article {
  display: flex;
  background: #fdf3ea;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.simg {
  position: relative;
  flex: 0 0 48%;
}
.simg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.simg span {
  position: absolute;
  left: 6px;
  top: 6px;
  background: #1faa4b;
  color: #fff;
  font-size: 7px;
  padding: 2px 7px;
  border-radius: 3px;
}
.sinfo {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 8px 10px;
  font-size: 10px;
  color: #777;
}
.sinfo h4 {
  margin: 0;
  font-size: 12px;
  color: #111;
  font-weight: 500;
}
.stars {
  margin: 0;
  color: #f6a21e;
  font-size: 9px;
}
.sinfo .stars small {
  color: #111;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    padding-top: 24px;
  }
  .visual {
    margin-right: 0;
  }
  .stat,
  .price {
    display: none;
  }
  .partners {
    justify-content: center;
  }
  .cats {
    grid-template-columns: repeat(3, 1fr);
  }
  .products.grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .products > * {
    flex-basis: 70%;
  }
  .stores {
    grid-template-columns: 1fr;
  }
  .timer {
    margin-left: 0;
  }
}
</style>

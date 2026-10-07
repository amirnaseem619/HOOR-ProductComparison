<script setup>
import { ref, computed } from "vue";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import OnlineProductCard from "../components/OnlineProductCard.vue";
import { onlineProducts, onlineStoresList, slug } from "../data/home";

// Filter & Sort State
const searchStore = ref("");
const activeStorePerk = ref("all");
const activeCategory = ref("All");
const sort = ref("popular");

// Quick View Modal
const selectedProduct = ref(null);
const openQuickView = (p) => {
  selectedProduct.value = p;
};
const closeQuickView = () => {
  selectedProduct.value = null;
};

// Compare Tracker
const comparedItems = ref([]);
const onToggleCompare = ({ product, active }) => {
  if (active) {
    if (!comparedItems.value.some((item) => item.name === product.name)) {
      comparedItems.value.push(product);
    }
  } else {
    comparedItems.value = comparedItems.value.filter(
      (item) => item.name !== product.name,
    );
  }
};
const clearCompared = () => {
  comparedItems.value = [];
};

// Filtered Online Stores
const filteredStores = computed(() => {
  let list = [...onlineStoresList];
  if (searchStore.value.trim()) {
    const q = searchStore.value.toLowerCase().trim();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.site.toLowerCase().includes(q),
    );
  }
  if (activeStorePerk.value === "free-shipping") {
    list = list.filter((s) => s.perk.toLowerCase().includes("free"));
  } else if (activeStorePerk.value === "express") {
    list = list.filter(
      (s) =>
        s.perk.toLowerCase().includes("express") ||
        s.perk.toLowerCase().includes("same-day"),
    );
  } else if (activeStorePerk.value === "top-rated") {
    list = list.filter((s) => s.rating >= 95);
  }
  return list;
});

// Categories
const categories = ["All", "Makeup", "Skincare", "Fragrance", "Lipstick"];

// Filtered & Sorted Products
const filteredProducts = computed(() => {
  let list = [...onlineProducts];

  // Filter by category
  if (activeCategory.value !== "All") {
    list = list.filter((p) => p.category === activeCategory.value);
  }

  // Sort
  if (sort.value === "low") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort.value === "high") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort.value === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sort.value === "discount") {
    const parseDiscount = (d) =>
      parseInt((d || "0").replace(/[^0-9]/g, "")) || 0;
    list.sort((a, b) => parseDiscount(b.discount) - parseDiscount(a.discount));
  }

  return list;
});
</script>

<template>
  <AppHeader />

  <main>
    <div class="page">
      <!-- Top Title Bar with Toggle -->
      <div class="top">
        <div class="title-area">
          <p class="tag"><i></i>Online Stores</p>
          <h1>Online Stores & Products</h1>
          <p class="sub-addr">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="#c0394b"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path
                d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              ></path>
            </svg>
            Explore verified beauty platforms with direct online shipping &
            special web rates
          </p>
        </div>

        <nav class="toggle" aria-label="Store type">
          <router-link to="/stores/online" class="on">Online</router-link>
          <router-link to="/stores/near">Physical</router-link>
        </nav>
      </div>

      <!-- Online Stores Directory Showcase -->
      <section class="panel">
        <div class="panel-head">
          <div class="panel-title">
            <h3>Featured E-Commerce Stores</h3>
            <span class="badge-count">{{ filteredStores.length }} Stores</span>
          </div>

          <div class="store-filters">
            <div class="search-box">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#666"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                v-model="searchStore"
                type="text"
                placeholder="Search store name or website..."
                aria-label="Search online store"
              />
              <button
                v-if="searchStore"
                class="clear-btn"
                @click="searchStore = ''"
              >
                ×
              </button>
            </div>

            <div class="perk-pills" role="tablist">
              <button
                type="button"
                class="perk-pill"
                :class="{ active: activeStorePerk === 'all' }"
                @click="activeStorePerk = 'all'"
              >
                All
              </button>
              <button
                type="button"
                class="perk-pill"
                :class="{ active: activeStorePerk === 'free-shipping' }"
                @click="activeStorePerk = 'free-shipping'"
              >
                Free Delivery
              </button>
              <button
                type="button"
                class="perk-pill"
                :class="{ active: activeStorePerk === 'express' }"
                @click="activeStorePerk = 'express'"
              >
                Express 24h
              </button>
              <button
                type="button"
                class="perk-pill"
                :class="{ active: activeStorePerk === 'top-rated' }"
                @click="activeStorePerk = 'top-rated'"
              >
                Top Rated
              </button>
            </div>
          </div>
        </div>

        <div class="stores-grid">
          <article
            v-for="s in filteredStores"
            :key="s.name + s.site"
            class="store-card"
          >
            <div class="store-pic">
              <img :src="s.img" :alt="s.name" loading="lazy" />
              <span class="badge-status">ONLINE</span>
            </div>

            <div class="store-content">
              <div class="store-top-line">
                <h4>{{ s.name }}</h4>
                <span class="badge-verified">{{ s.badge }}</span>
              </div>

              <div class="store-rating">
                <span class="stars">★★★★★</span>
                <b>({{ s.rating }})</b>
              </div>

              <div class="store-meta">
                <a
                  :href="`https://${s.site}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="meta-link"
                  @click.stop
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6" />
                  </svg>
                  <span>{{ s.site }}</span>
                  <svg class="ext-icon" viewBox="0 0 24 24">
                    <path
                      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                    />
                  </svg>
                </a>
                <p class="meta-item">
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M3 21V8h7v13M10 21V3h11v18M6 12h1M6 16h1M14 7h3M14 11h3M14 15h3"
                    />
                  </svg>
                  <span>{{ s.products }}+ Products</span>
                </p>
                <p class="meta-perk">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  <span>{{ s.perk }}</span>
                </p>
              </div>

              <div class="store-foot">
                <router-link
                  :to="`/stores/online/${slug(s.name)}`"
                  class="btn-store-detail"
                >
                  View Catalog
                </router-link>
                <a
                  :href="`https://${s.site}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-visit"
                  @click.stop
                >
                  Visit Site ↗
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Online Products Section -->
      <section class="products-section">
        <div class="phead">
          <div>
            <h2>Online Products & Deals</h2>
            <p class="phead-sub">
              Compare live online pricing, discounts, and delivery speeds
            </p>
          </div>

          <div class="controls-wrap">
            <!-- Category Filter Pills -->
            <div class="category-pills">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                class="cat-pill"
                :class="{ active: activeCategory === cat }"
                @click="activeCategory = cat"
              >
                {{ cat }}
              </button>
            </div>

            <!-- Sort Dropdown -->
            <label class="sort-ctrl">
              <span>Sort by:</span>
              <select v-model="sort" aria-label="Sort products">
                <option value="popular">Most Popular</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </label>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="filteredProducts.length" class="grid">
          <OnlineProductCard
            v-for="(p, i) in filteredProducts"
            :key="p.name + i"
            :p="p"
            @quick-view="openQuickView"
            @toggle-compare="onToggleCompare"
          />
        </div>
        <div v-else class="empty-state">
          <p>No online products found in this category.</p>
          <button
            type="button"
            class="btn-reset"
            @click="activeCategory = 'All'"
          >
            Show All Products
          </button>
        </div>
      </section>
    </div>

    <!-- Quick View Modal -->
    <div
      v-if="selectedProduct"
      class="modal-backdrop"
      role="dialog"
      aria-modal="true"
      @click.self="closeQuickView"
    >
      <div class="modal-card">
        <button
          type="button"
          class="modal-close"
          aria-label="Close modal"
          @click="closeQuickView"
        >
          ×
        </button>

        <div class="modal-body">
          <div class="modal-media">
            <img :src="selectedProduct.img" :alt="selectedProduct.name" />
            <span class="modal-discount">{{ selectedProduct.discount }}</span>
          </div>

          <div class="modal-details">
            <div class="modal-meta">
              <span class="modal-brand">
                <svg
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path
                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"
                  />
                </svg>
                {{ selectedProduct.store }} ({{ selectedProduct.site }})
              </span>
              <span class="modal-tag">{{ selectedProduct.tag }}</span>
            </div>

            <h2 class="modal-title">{{ selectedProduct.name }}</h2>

            <div class="modal-rating">
              <span class="stars">★★★★★</span>
              <b>{{ selectedProduct.rating }}</b>
              <span
                >({{ selectedProduct.reviews }} verified buyer reviews)</span
              >
            </div>

            <div class="modal-price-box">
              <div class="modal-price">
                <b>{{ selectedProduct.price }}</b>
                <span>SAR</span>
              </div>
              <del v-if="selectedProduct.originalPrice" class="modal-del">
                {{ selectedProduct.originalPrice }} SAR
              </del>
              <span class="badge-saving"
                >Save
                {{
                  selectedProduct.originalPrice - selectedProduct.price
                }}
                SAR</span
              >
            </div>

            <p class="modal-desc">{{ selectedProduct.description }}</p>

            <ul class="modal-perks">
              <li>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#16a34a"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ selectedProduct.shipping }}
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#0284c7"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Estimated Delivery: {{ selectedProduct.deliveryTime }}
              </li>
              <li>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#16a34a"
                  stroke-width="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                100% Authentic & Original Guarantee
              </li>
            </ul>

            <div class="modal-actions">
              <a
                v-if="selectedProduct.site"
                :href="`https://${selectedProduct.site}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-modal-buy"
              >
                <span>Visit Store & Order Online</span>
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  ></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              <button
                type="button"
                class="btn-modal-close"
                @click="closeQuickView"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Compare Toast / Dock -->
    <div v-if="comparedItems.length" class="compare-dock">
      <div class="dock-info">
        <span class="dock-badge">{{ comparedItems.length }}</span>
        <span>Products selected for comparison</span>
      </div>
      <div class="dock-actions">
        <router-link to="/home#compare" class="btn-dock-compare"
          >Compare Now</router-link
        >
        <button type="button" class="btn-dock-clear" @click="clearCompared">
          Clear
        </button>
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

.page {
  width: 100%;
  padding: 50px 6vw 80px;
}

/* Top Title Area */
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 34px;
  flex-wrap: wrap;
  padding: 0 1vw;
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
  margin: 0 0 8px;
  font-family: "Marcellus", "Cormorant Garamond", Georgia, serif;
  font-size: clamp(30px, 3.2vw, 44px);
  font-weight: 400;
  color: #1b2a49;
}

.sub-addr {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 14px;
  color: #666;
}

.sub-addr svg {
  flex-shrink: 0;
}

/* Online / Physical Toggle */
.toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: min(100%, 430px);
  height: 44px;
  border-radius: 999px;
  overflow: hidden;
  background: #e9e9e9;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
}

.toggle a {
  display: grid;
  place-items: center;
  text-decoration: none;
  font-size: 16px;
  color: #888;
  border-radius: 999px;
  transition:
    background 0.2s,
    color 0.2s;
  font-weight: 500;
}

.toggle a.on {
  background: #c2185b;
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(194, 24, 91, 0.35);
}

.toggle a:hover:not(.on) {
  color: #1b2a49;
}

/* Featured Online Stores Panel */
.panel {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px 28px 28px;
  margin: 0 0 55px;
  box-shadow: 0 3px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(227, 211, 184, 0.45);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.panel-title h3 {
  margin: 0;
  font-size: 19px;
  font-weight: 600;
  color: #1b2a49;
}

.badge-count {
  font-size: 12px;
  background: #fdf0f4;
  color: #c2185b;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 999px;
}

.store-filters {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fbf7f2;
  border: 1px solid #eadfd5;
  border-radius: 8px;
  padding: 0 14px;
  height: 38px;
  min-width: 260px;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  outline: none;
  color: #111;
}

.clear-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 16px;
  cursor: pointer;
}

.perk-pills {
  display: flex;
  gap: 6px;
}

.perk-pill {
  border: 1px solid #eadfd5;
  background: #ffffff;
  font-size: 12.5px;
  color: #666;
  padding: 7px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.perk-pill:hover {
  border-color: #c2185b;
  color: #c2185b;
}

.perk-pill.active {
  background: #1b2a49;
  color: #ffffff;
  border-color: #1b2a49;
}

/* Stores Grid */
.stores-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.store-card {
  display: flex;
  background: #fdfaf6;
  border: 1px solid #f1e5d7;
  border-radius: 8px;
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.store-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.store-pic {
  position: relative;
  flex: 0 0 38%;
  background: #f5ebe0;
}

.store-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.badge-status {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #12b02a;
  color: #ffffff;
  font-size: 9.5px;
  font-weight: 700;
  padding: 2.5px 7px;
  border-radius: 3px;
}

.store-content {
  flex: 1;
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.store-top-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 2px;
}

.store-top-line h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #1b2a49;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.badge-verified {
  font-size: 9px;
  font-weight: 700;
  color: #c2185b;
  background: #fdf0f4;
  padding: 1.5px 6px;
  border-radius: 3px;
  white-space: nowrap;
}

.store-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  margin-bottom: 8px;
}

.store-rating .stars {
  color: #f6a21e;
  letter-spacing: 1px;
}

.store-rating b {
  color: #111;
}

.store-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
}

.meta-link {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  color: #c2185b;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-link svg {
  width: 12px;
  height: 12px;
  stroke: #c2185b;
  stroke-width: 1.8;
  fill: none;
  flex-shrink: 0;
}

.ext-icon {
  width: 10px !important;
  height: 10px !important;
}

.meta-item,
.meta-perk {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 11px;
  color: #555;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-item svg,
.meta-perk svg {
  width: 12px;
  height: 12px;
  stroke: #f0a35e;
  stroke-width: 1.6;
  fill: none;
  flex-shrink: 0;
}

.meta-perk {
  color: #16a34a;
  font-weight: 500;
}

.meta-perk svg {
  stroke: #16a34a;
}

.store-foot {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.btn-store-detail {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 0;
  background: #1b2a49;
  color: #ffffff;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.18s;
}

.btn-store-detail:hover {
  background: #c2185b;
}

.btn-visit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  padding: 6px 10px;
  border: 1px solid #eadfd5;
  color: #1b2a49;
  background: #ffffff;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.18s;
}

.btn-visit:hover {
  border-color: #c2185b;
  color: #c2185b;
}

/* Products Section */
.products-section {
  margin-top: 20px;
}

.phead {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 34px;
  flex-wrap: wrap;
  gap: 16px;
}

.phead h2 {
  margin: 0 0 4px;
  font-family: "Marcellus", "Cormorant Garamond", Georgia, serif;
  font-size: clamp(26px, 2.6vw, 38px);
  font-weight: 400;
  color: #1b2a49;
}

.phead-sub {
  margin: 0;
  font-size: 13.5px;
  color: #777;
}

.controls-wrap {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.category-pills {
  display: flex;
  gap: 6px;
}

.cat-pill {
  border: 1px solid #eadfd5;
  background: #ffffff;
  font-size: 13px;
  color: #555;
  padding: 6px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.18s ease;
}

.cat-pill:hover {
  border-color: #c2185b;
  color: #c2185b;
}

.cat-pill.active {
  background: #c2185b;
  color: #ffffff;
  border-color: #c2185b;
  font-weight: 600;
}

.sort-ctrl {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #eadfd5;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: #888;
  background: #ffffff;
}

.sort-ctrl select {
  border: 0;
  background: none;
  font-size: 13px;
  font-weight: 600;
  color: #1b2a49;
  outline: none;
  cursor: pointer;
}

/* Grid Layout for Products */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px 2.2vw;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #ffffff;
  border-radius: 10px;
  color: #777;
}

.btn-reset {
  margin-top: 12px;
  background: #c2185b;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  cursor: pointer;
  font-weight: 600;
}

/* Quick View Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-card {
  position: relative;
  background: #ffffff;
  width: min(850px, 94vw);
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes modalPop {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: #f3f3f3;
  color: #333;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.18s;
}

.modal-close:hover {
  background: #e0e0e0;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
}

.modal-media {
  position: relative;
  background: #fbf7f2;
  aspect-ratio: 1 / 1;
}

.modal-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.modal-discount {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #e04040;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
}

.modal-details {
  padding: 32px 30px;
  display: flex;
  flex-direction: column;
}

.modal-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.modal-brand {
  font-size: 12.5px;
  color: #777;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.modal-tag {
  font-size: 11px;
  font-weight: 700;
  color: #c2185b;
  background: #fdf0f4;
  padding: 2.5px 8px;
  border-radius: 4px;
}

.modal-title {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 600;
  color: #1b2a49;
  line-height: 1.3;
}

.modal-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  margin-bottom: 18px;
}

.modal-rating .stars {
  color: #f6a21e;
  letter-spacing: 1.5px;
}

.modal-rating b {
  color: #111;
}

.modal-rating span {
  color: #888;
  font-size: 12px;
}

.modal-price-box {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1e7dd;
}

.modal-price {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.modal-price span {
  font-size: 14px;
}

.modal-del {
  font-size: 14px;
  color: #999;
}

.badge-saving {
  font-size: 11.5px;
  font-weight: 600;
  color: #16a34a;
  background: #f0fdf4;
  padding: 3px 8px;
  border-radius: 4px;
}

.modal-desc {
  font-size: 13.5px;
  color: #555;
  line-height: 1.6;
  margin: 0 0 18px;
}

.modal-perks {
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-perks li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #444;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.btn-modal-buy {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  background: #c2185b;
  color: #ffffff;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13.5px;
  transition: background 0.2s;
}

.btn-modal-buy:hover {
  background: #a8134d;
}

.btn-modal-close {
  padding: 0 18px;
  height: 44px;
  background: #f5ebe0;
  color: #1b2a49;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

/* Floating Compare Dock */
.compare-dock {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #1b2a49;
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  gap: 24px;
  z-index: 90;
  animation: slideUp 0.24s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 20px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.dock-info {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
}

.dock-badge {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #c2185b;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.dock-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-dock-compare {
  background: #c2185b;
  color: #ffffff;
  text-decoration: none;
  font-size: 12.5px;
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 999px;
  transition: background 0.18s;
}

.btn-dock-compare:hover {
  background: #df1f6b;
}

.btn-dock-clear {
  background: transparent;
  color: #bbb;
  border: none;
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
}

.btn-dock-clear:hover {
  color: #ffffff;
}

/* Responsive Media Queries */
@media (max-width: 1100px) {
  .stores-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stores-grid {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  .modal-body {
    grid-template-columns: 1fr;
  }
  .modal-media {
    aspect-ratio: 16 / 9;
  }
  .modal-details {
    padding: 20px;
  }
  .panel-head {
    flex-direction: column;
    align-items: flex-start;
  }
  .store-filters {
    width: 100%;
  }
  .search-box {
    width: 100%;
    min-width: 0;
  }
  .controls-wrap {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

<script setup>
import { ref } from "vue";

const props = defineProps({
  p: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["quick-view", "toggle-compare", "buy-now"]);

const liked = ref(false);
const isCompared = ref(props.p.compareActive || false);
const isHovered = ref(false);

const toggleLike = () => {
  liked.value = !liked.value;
};

const toggleCompare = () => {
  isCompared.value = !isCompared.value;
  emit("toggle-compare", { product: props.p, active: isCompared.value });
};
</script>

<template>
  <article
    class="card online-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="pic">
      <img :src="p.img" :alt="p.name" loading="lazy" />

      <!-- Top Badges Stack -->
      <div class="badge-stack">
        <span class="discount-badge">{{ p.discount || "-30%" }}</span>
        <span v-if="p.tag" class="deal-badge">{{ p.tag }}</span>
      </div>

      <!-- Action buttons -->
      <div class="actions">
        <button
          type="button"
          class="action-btn"
          :class="{ active: liked }"
          :aria-label="liked ? 'Remove from wishlist' : 'Add to wishlist'"
          :aria-pressed="liked"
          @click.stop="toggleLike"
        >
          <svg
            v-if="!liked"
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="#1b2a49"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="#c2185b"
            stroke="#c2185b"
            stroke-width="1.8"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
        </button>

        <button
          type="button"
          class="action-btn"
          aria-label="Quick view product"
          @click.stop="emit('quick-view', p)"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="#1b2a49"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      </div>

      <!-- Compare bar (shown when active or on card hover) -->
      <button
        v-if="isCompared || isHovered"
        type="button"
        class="compare-bar"
        @click.stop="toggleCompare"
      >
        Compare +
      </button>

      <!-- Rating overlay at bottom of photo (shown when compare bar is hidden) -->
      <div v-else class="rating-overlay">
        <span class="stars">★★★★★</span>
        <span class="count">({{ p.reviews || 128 }})</span>
      </div>
    </div>

    <!-- Product Details -->
    <div class="info">
      <!-- Store info row -->
      <div class="store-row">
        <span class="brand">
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path
              d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
            />
          </svg>
          {{
            p.store || (p.site ? p.site.replace(/^www\./, "") : "Online Store")
          }}
        </span>
        <span class="badge-online">Online</span>
      </div>

      <h3 class="name" :title="p.name">{{ p.name }}</h3>

      <div class="price-row">
        <div class="price-wrap">
          <div class="price">
            <b>{{ p.price }}</b>
            <span>SAR</span>
          </div>
          <del v-if="p.originalPrice" class="original-price"
            >{{ p.originalPrice }} SAR</del
          >
        </div>

        <div class="shipping-pill">
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="#16a34a"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          <span>{{ p.shipping || "Free Shipping" }}</span>
        </div>
      </div>

      <div class="tags-row">
        <span class="tag-speed">
          <svg
            viewBox="0 0 16 16"
            width="12"
            height="12"
            fill="none"
            stroke="#0284c7"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="8" cy="8" r="7" />
            <polyline points="8 4 8 8 11 9.5" />
          </svg>
          {{ p.deliveryTime || "1-2 Days" }}
        </span>

        <span class="tag-stock">In Stock</span>
      </div>

      <!-- Action Button -->
      <a
        v-if="p.site"
        :href="`https://${p.site}`"
        target="_blank"
        rel="noopener noreferrer"
        class="online-cta"
        @click.stop
      >
        <span>Visit Online Store</span>
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
          ></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </a>
      <button
        v-else
        type="button"
        class="online-cta"
        @click.stop="emit('buy-now', p)"
      >
        <span>Shop Online</span>
        <svg
          viewBox="0 0 24 24"
          width="14"
          height="14"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path
            d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
          ></path>
        </svg>
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition:
    transform 0.24s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.24s ease;
  position: relative;
  border: 1px solid rgba(227, 211, 184, 0.35);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow:
    0 14px 28px rgba(194, 24, 91, 0.12),
    0 4px 10px rgba(0, 0, 0, 0.05);
  border-color: rgba(194, 24, 91, 0.25);
}

.pic {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #fbf8f4;
}

.pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.4s ease;
}

.card:hover .pic img {
  transform: scale(1.05);
}

/* Badge stack top left */
.badge-stack {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 2;
  align-items: flex-start;
}

.discount-badge {
  background: #e04040;
  color: #ffffff;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  line-height: 1.2;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 6px rgba(224, 64, 64, 0.35);
}

.deal-badge {
  background: #1b2a49;
  color: #f7efe8;
  font-size: 10px;
  font-weight: 600;
  padding: 2.5px 7px;
  border-radius: 3px;
  line-height: 1.2;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 5px rgba(27, 42, 73, 0.3);
}

/* Actions top right */
.actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  z-index: 2;
}

.action-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition:
    transform 0.18s ease,
    background 0.18s ease;
}

.action-btn:hover {
  transform: scale(1.12);
  background: #ffffff;
}

.action-btn:focus-visible {
  outline: 2px solid #c2185b;
}

/* Compare banner */
.compare-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 34px;
  background: #c2185b;
  color: #ffffff;
  border: none;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: 0.4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: background 0.2s ease;
}

.compare-bar:hover {
  background: #a8134d;
}

/* Rating overlay */
.rating-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 10px 8px;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.6) 100%);
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 1;
}

.rating-overlay .stars {
  color: #f6a21e;
  font-size: 13px;
  letter-spacing: 1.5px;
  line-height: 1;
}

.rating-overlay .count {
  color: #ffffff;
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1;
}

/* Info container */
.info {
  padding: 14px 15px 15px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.store-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.brand {
  font-size: 11.5px;
  color: #8c8c8c;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.badge-online {
  font-size: 9.5px;
  font-weight: 700;
  color: #c2185b;
  background: #fdf0f4;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.name {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  color: #1b2a49;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}

.price-wrap {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.price {
  font-size: 17px;
  font-weight: 700;
  color: #111111;
  display: flex;
  align-items: baseline;
  gap: 3px;
}

.price span {
  font-size: 11px;
  font-weight: 600;
  color: #111111;
}

.original-price {
  font-size: 11px;
  color: #999;
  text-decoration: line-through;
}

.shipping-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 600;
  color: #16a34a;
  background: #f0fdf4;
  padding: 2.5px 7px;
  border-radius: 4px;
}

/* Tags Row */
.tags-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.tag-speed {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #0284c7;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 999px;
  padding: 2.5px 8px;
  line-height: 1;
}

.tag-stock {
  font-size: 11px;
  font-weight: 600;
  color: #16a34a;
}

/* Online CTA */
.online-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 36px;
  margin-top: auto;
  background: #1b2a49;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.16s ease;
}

.online-cta:hover {
  background: #c2185b;
  transform: translateY(-1px);
}

.online-cta:focus-visible {
  outline: 2px solid #c2185b;
  outline-offset: 2px;
}
</style>

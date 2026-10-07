<script setup>
import { img, nearStores } from "../data/home";
defineProps({ mapSrc: String });
const pins = [
  [38, 10],
  [54, 17],
  [62, 24],
  [75, 26],
  [45, 38],
  [62, 41],
  [72, 47],
  [10, 66],
  [40, 60],
  [56, 58],
  [82, 63],
  [28, 78],
  [60, 80],
  [48, 52],
];
</script>
<template>
  <div class="wrap" id="stores">
    <div class="tools">
      <label class="addr"
        ><svg width="14" height="14" viewBox="0 0 24 24" fill="#c2185b">
          <path
            d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.500A2.500 2.500 0 1 1 12 6.500a2.500 2.500 0 0 1 0 5z"
          />
        </svg>
        <input
          value="Beauty Glow Store Al Azizyah street 45A 123 Shop Number"
          aria-label="Store address"
      /></label>
      <div class="filters">
        <input class="loc" value="Al Azizyah Riyadh" aria-label="Location" />
        <select aria-label="Sort">
          <option>Distance</option>
          <option>Rating</option>
        </select>
        <button class="search">Search</button>
      </div>
    </div>
    <div class="grid">
      <div class="map" role="img" aria-label="Map of nearby stores">
        <img v-if="mapSrc" class="mapimg" :src="mapSrc" alt="" />
        <template v-else>
          <svg class="roads" viewBox="0 0 100 100" preserveAspectRatio="none">
            <g stroke="#fff" stroke-width="1.2" fill="none">
              <path
                d="M0 30L100 18M0 62L100 52M20 0L36 100M62 0L56 100M85 0L92 100"
              />
            </g>
            <g stroke="#e4e4e4" stroke-width=".5" fill="none">
              <path d="M0 45L100 38M0 80L100 74M45 0L40 100M75 0L74 100" />
            </g>
          </svg>
          <span
            v-for="(p, i) in pins"
            :key="i"
            class="pin"
            :style="{ left: p[0] + '%', top: p[1] + '%' }"
          ></span>
          <div class="popup">
            <h4>Beauty Glow Store</h4>
            <small>Al Azizyah street 45A 123 Shop Number</small>
            <img :src="img('store-face.png')" alt="" />
            <div class="pf">
              <span>◎ 3.5KM</span><a href="#">Get Directions ➝</a>
            </div>
          </div>
        </template>
      </div>
      <ul class="list">
        <li v-for="s in nearStores" :key="s.name">
          <div>
            <h5>{{ s.name }}</h5>
            <small>⌖ {{ s.address }}</small>
          </div>
          <span><i>◎</i>{{ s.km }}</span
          ><a href="#"><i>⚲</i>Get There</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.tools {
  display: flex;
  gap: 24px;
  margin-bottom: 18px;
}
.addr {
  flex: 1.6;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f7efe8;
  border-radius: 10px;
  padding: 0 16px;
  height: 44px;
}
.addr input {
  flex: 1;
  border: 0;
  background: none;
  font-size: 13px;
  outline: none;
}
.filters {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f7efe8;
  border-radius: 10px;
  padding: 0 6px 0 16px;
  height: 44px;
}
.loc {
  flex: 1;
  min-width: 0;
  border: 0;
  background: none;
  font-size: 13px;
  outline: none;
  color: #666;
}
select {
  border: 0;
  border-left: 1px solid #ccc;
  background: none;
  padding-left: 10px;
  font-size: 13px;
  color: #666;
}
.search {
  height: 32px;
  padding: 0 16px;
  border: 0;
  border-radius: 6px;
  background: #111;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
}
.grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 24px;
}
.map {
  position: relative;
  min-height: 480px;
  border-radius: 12px;
  background: #eceeee;
  overflow: hidden;
}
.roads {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.pin {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #c2185b;
  border-radius: 50% 50% 50% 0;
  transform: translate(-50%, -100%) rotate(-45deg);
}
.pin::after {
  content: "";
  position: absolute;
  inset: 5px;
  background: #fff;
  border-radius: 50%;
}
.popup {
  position: absolute;
  left: 12%;
  top: 24%;
  width: 44%;
  min-width: 220px;
  background: #fff;
  border-radius: 10px;
  padding: 14px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
}
.popup h4 {
  margin: 0;
  font-size: 15px;
}
.popup small {
  font-size: 9px;
  color: #888;
}
.popup img {
  width: 100%;
  height: 110px;
  object-fit: cover;
  margin: 8px 0;
  display: block;
}
.pf {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
}
.pf a {
  border: 1px solid #111;
  border-radius: 999px;
  padding: 4px 12px;
  color: #111;
  text-decoration: none;
  font-size: 11px;
  font-weight: 500;
}
.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.list li {
  display: flex;
  align-items: center;
  gap: 18px;
  background: #fdf3ea;
  border-radius: 6px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.list li > div {
  flex: 1;
}
h5 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 500;
}
small {
  font-size: 11px;
  color: #666;
}
.list span,
.list a {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 11px;
  color: #555;
  text-decoration: none;
}
.list i {
  font-style: normal;
  font-size: 16px;
  color: #c2185b;
}
@media (max-width: 900px) {
  .tools,
  .grid {
    flex-direction: column;
    grid-template-columns: 1fr;
  }
  .map {
    min-height: 380px;
  }
}
.mapimg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

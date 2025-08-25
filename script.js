// ===== Data (could come from API; here it's static for the demo) =====
const PRODUCTS = [
  {id:1,  name:"Aurora Wireless Headphones",   price:6999,  category:"Audio",    rating:4.6, pop: 98,  tag:"New",  imgSeed:"headphones"},
  {id:2,  name:"Nimbus Noise-Canceling Buds",  price:4599,  category:"Audio",    rating:4.4, pop: 85,  tag:"Hit",  imgSeed:"earbuds"},
  {id:3,  name:"Photon 5G Smartphone",         price:25999, category:"Phones",   rating:4.7, pop: 120, tag:"Sale", imgSeed:"phone"},
  {id:4,  name:"Quasar Pro Laptop 14”",        price:75999, category:"Laptops",  rating:4.5, pop: 110, tag:"",     imgSeed:"laptop"},
  {id:5,  name:"Luma 4K Mirrorless Camera",    price:54999, category:"Cameras",  rating:4.6, pop: 92,  tag:"New",  imgSeed:"camera"},
  {id:6,  name:"Pulse Fitness Smartwatch",     price:6999,  category:"Wearables",rating:4.3, pop: 70,  tag:"",     imgSeed:"watch"},
  {id:7,  name:"Comet Bluetooth Speaker",      price:3499,  category:"Audio",    rating:4.2, pop: 64,  tag:"",     imgSeed:"speaker"},
  {id:8,  name:"Orbit Gaming Mouse",           price:1999,  category:"Accessories",rating:4.4,pop: 60, tag:"",     imgSeed:"mouse"},
  {id:9,  name:"Nebula Mechanical Keyboard",   price:3999,  category:"Accessories",rating:4.5,pop: 73, tag:"Hit",  imgSeed:"keyboard"},
  {id:10, name:"Vortex Drone 4K",              price:42999, category:"Cameras",  rating:4.1, pop: 40,  tag:"",     imgSeed:"drone"},
  {id:11, name:"Zen Tab 11”",                  price:21999, category:"Tablets",  rating:4.2, pop: 58,  tag:"",     imgSeed:"tablet"},
  {id:12, name:"Flux Action Cam",              price:15999, category:"Cameras",  rating:4.5, pop: 77,  tag:"",     imgSeed:"actioncam"}
];

// ===== State =====
const state = {
  search:"",
  categories:new Set(),
  maxPrice: Math.max(...PRODUCTS.map(p => p.price)),
  ratingMin: 0,
  sort:"pop"
};

// ===== Elements =====
const $grid = document.getElementById("grid");
const $cardTpl = document.getElementById("cardTpl");
const $search = document.getElementById("search");
const $sort = document.getElementById("sort");
const $catList = document.getElementById("catList");
const $priceRange = document.getElementById("priceRange");
const $priceMax = document.getElementById("priceMax");
const $priceMin = document.getElementById("priceMin");
const $clearBtn = document.getElementById("clearBtn");
const $countText = document.getElementById("countText");
const $themeBtn = document.getElementById("themeBtn");

// ===== Utilities =====
const fmtINR = n => `₹${n.toLocaleString("en-IN")}`;

function starSVG(full){ 
  return `<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="${ full
    ? 'M12 17.3l6.18 3.7-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z'
    : 'M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 5.73L5.82 21 12 17.27 18.18 21l-1.64-6.99L22 9.24z M12 15.4l-3.76 2.27 1-4.28-3.32-3.4 4.38-.38L12 5.1l1.71 4.51 4.38.38-3.32 3.4 1 4.28z'}"/></svg>`;
}

function productImage(seed){
  const base = (w,h)=>`https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
  return {
    src: base(600,450),
    srcset: `${base(300,225)} 300w, ${base(600,450)} 600w, ${base(900,675)} 900w`,
    sizes: "(max-width:560px) 100vw, (max-width:1000px) 50vw, 33vw"
  };
}

// ===== Init Filters =====
(function initFilters(){
  const cats = Array.from(new Set(PRODUCTS.map(p=>p.category))).sort();
  for(const c of cats){
    const id = `cat-${c.replace(/\s+/g,"-")}`;
    const wrapper = document.createElement("label");
    wrapper.innerHTML = `<input type="checkbox" id="${id}" value="${c}" /> ${c}`;
    $catList.appendChild(wrapper);
  }
  $catList.addEventListener("change", e=>{
    const cb = e.target;
    if(cb && cb.type === "checkbox"){
      cb.checked ? state.categories.add(cb.value) : state.categories.delete(cb.value);
      render();
    }
  });

  $priceRange.max = String(state.maxPrice);
  $priceRange.value = String(state.maxPrice);
  $price

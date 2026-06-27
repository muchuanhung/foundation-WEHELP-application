// Week 3 — Task 3 & 4：景點資料渲染 + Load More

const ATTRACTION_URLS = [
  "https://cwpeng.github.io/test/assignment-3-1",
  "https://cwpeng.github.io/test/assignment-3-2",
];

const STAR_ICON_SRC = "./public/icons/star.svg";
const MENU_ICON_SRC = "./public/icons/menu.svg";
const CLOSE_ICON_SRC = "./public/icons/close.svg";
const INITIAL_PROMO_COUNT = 3;
const INITIAL_CONTENT_COUNT = 10;
const LOAD_MORE_BATCH_SIZE = 10;

const PROMO_BAR_CLASSES = [
  "promo-bar--desktop-full",
  "promo-bar--desktop-two-thirds",
  "promo-bar--tablet-full promo-bar--desktop-one-third",
];

/** @type {Array<{name: string, images: string[]}>} */
let allAttractions = [];
let renderedCount = 0;

function parseImagePaths(pics, host) {
  return pics
    .split(/(?=\/resources\/images\/)/)
    .filter(Boolean)
    .map((path) => host + path);
}

async function fetchAllAttractions() {
  const responses = await Promise.all(
    ATTRACTION_URLS.map((url) => fetch(url)),
  );
  const payloads = await Promise.all(responses.map((response) => response.json()));

  const basicData = payloads[0];
  const imageData = payloads[1];
  const host = imageData.host;

  const imageLookup = {};
  for (const row of imageData.rows) {
    imageLookup[row.serial] = parseImagePaths(row.pics, host);
  }

  return basicData.rows
    .filter((row) => imageLookup[row.serial])
    .map((row) => ({
      name: row.sname,
      images: imageLookup[row.serial],
    }));
}

// 建立 推薦Bar
function createPromoBar(name, imageUrl, className = "") {
  const article = document.createElement("article");
  article.className = className ? `promo-bar ${className}` : "promo-bar";

  const thumb = document.createElement("img");
  thumb.className = "promo-bar__thumb";
  thumb.src = imageUrl;
  thumb.alt = "";
  thumb.width = 80;
  thumb.height = 50;

  const labelWrap = document.createElement("div");
  labelWrap.className = "promo-bar__label";

  const label = document.createElement("p");
  label.textContent = name;

  labelWrap.appendChild(label);
  article.appendChild(thumb);
  article.appendChild(labelWrap);

  return article;
}

// 建立 內容卡片
function createContentCard(name, imageUrl, globalIndex) {
  const article = document.createElement("article");
  article.className =
    globalIndex >= 8
      ? "content-card content-card--tablet-span-2"
      : "content-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "content-card__image-wrap";

  const image = document.createElement("img");
  image.className = "content-card__image";
  image.src = imageUrl;
  image.alt = "";

  const star = document.createElement("img");
  star.className = "content-card__star";
  star.src = STAR_ICON_SRC;
  star.alt = "";
  star.setAttribute("aria-hidden", "true");

  const footer = document.createElement("div");
  footer.className = "content-card__footer";

  const title = document.createElement("p");
  title.textContent = name;

  footer.appendChild(title);
  imageWrap.appendChild(image);
  imageWrap.appendChild(star);
  imageWrap.appendChild(footer);
  article.appendChild(imageWrap);

  return article;
}

// 獲取 第一張圖片
function getFirstImage(attraction) {
  return attraction.images[0];
}

// 渲染 初始化資料
function renderInitial(attractions) {
  const promoGrid = document.getElementById("promo-grid");
  const contentGrid = document.getElementById("content-grid");

  for (let index = 0; index < INITIAL_PROMO_COUNT; index += 1) {
    const attraction = attractions[index];
    if (!attraction) {
      break;
    }

    promoGrid.appendChild(
      createPromoBar(
        attraction.name,
        getFirstImage(attraction),
        PROMO_BAR_CLASSES[index],
      ),
    );
  }

  for (let index = 0; index < INITIAL_CONTENT_COUNT; index += 1) {
    const attraction = attractions[INITIAL_PROMO_COUNT + index];
    if (!attraction) {
      break;
    }

    contentGrid.appendChild(
      createContentCard(
        attraction.name,
        getFirstImage(attraction),
        index,
      ),
    );
  }

  renderedCount = Math.min(
    INITIAL_PROMO_COUNT + INITIAL_CONTENT_COUNT,
    attractions.length,
  );
}

// task4 渲染 下一批次資料
function renderNextBatch(batchSize) {
  const contentGrid = document.getElementById("content-grid");
  const end = Math.min(renderedCount + batchSize, allAttractions.length);

  for (let index = renderedCount; index < end; index += 1) {
    const attraction = allAttractions[index];
    const contentIndex = index - INITIAL_PROMO_COUNT;

    contentGrid.appendChild(
      createContentCard(
        attraction.name,
        getFirstImage(attraction),
        contentIndex,
      ),
    );
  }

  renderedCount = end;
  updateLoadMoreButton();
}

// task4 更新 Load More 按鈕
function updateLoadMoreButton() {
  const btn = document.getElementById("load-more-btn");
  btn.hidden = renderedCount >= allAttractions.length;
}

// task4 設置 Load More 按鈕
function setupLoadMore() {
  document.getElementById("load-more-btn").addEventListener("click", () => {
    renderNextBatch(LOAD_MORE_BATCH_SIZE);
  });
}

function setupMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const menuOverlay = document.getElementById("menu-overlay");
  const sideMenu = document.getElementById("side-menu");
  const menuCloseBtn = document.getElementById("menu-close-btn");
  const menuIcon = menuBtn.querySelector("img");

  function setMenuOpen(isOpen) {
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "關閉選單" : "開啟選單");
    sideMenu.setAttribute("aria-hidden", String(!isOpen));
    sideMenu.classList.toggle("side-menu--open", isOpen);
    menuOverlay.classList.toggle("side-menu-overlay--visible", isOpen);
    menuOverlay.hidden = !isOpen;
    menuIcon.src = isOpen ? CLOSE_ICON_SRC : MENU_ICON_SRC;
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  menuBtn.addEventListener("click", () => {
    setMenuOpen(menuBtn.getAttribute("aria-expanded") !== "true");
  });
  menuOverlay.addEventListener("click", () => setMenuOpen(false));
  menuCloseBtn.addEventListener("click", () => setMenuOpen(false));

  for (const link of sideMenu.querySelectorAll(".side-menu__link")) {
    link.addEventListener("click", () => setMenuOpen(false));
  }
}

async function init() {
  allAttractions = await fetchAllAttractions();
  renderInitial(allAttractions);
  setupLoadMore();
  updateLoadMoreButton();
  setupMobileMenu();
}

document.addEventListener("DOMContentLoaded", init);

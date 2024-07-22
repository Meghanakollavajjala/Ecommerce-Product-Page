// Main image
const sectionHero = document.querySelector(".hero");
const mainImg = document.querySelector(".main-img");

// Floating image
const classFloat = document.querySelector(".floating-img");
const mainImgFloat = document.querySelector(".main-img-float");

// Thumbnail images
const thumbnailbImg = document.querySelectorAll(".thumb-img");
const thumbnailbImgFloat = document.querySelectorAll(".thumb-img-float");

// Overlay and close icon
const overlayC = document.querySelector(".overlay");
const closeIcon = document.querySelector(".close-icon");

// Navigation buttons for floating images
const leftArrow = document.querySelector(".btn-swipe-left");
const rightArrow = document.querySelector(".btn-swipe-right");

// Cart functionality
const minusBtn = document.querySelector(".minus");
const cartNumber = document.querySelector(".cart-number");
const plusBtn = document.querySelector(".plus");

const navCart = document.querySelector(".nav-cart");
const cartBox = document.querySelector(".cart");
const emptyCart = document.querySelector(".empty-cart");
const filledCart = document.querySelector(".cart-bottom");
const sectionContainer = document.querySelector(".container");

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const numbercart = document.querySelector(".count-items");
const currPrice = document.querySelector(".current-price");
const deleteIcon = document.querySelector(".delete");
const navAfter = document.querySelector(".nav-cart-after");

// Adding and removing floating image
let index = 0;

mainImg.addEventListener("click", function () {
  classFloat.classList.add("activate");
  overlayC.classList.add("activate");

  mainImgFloat.src = mainImg.src;
  thumbnailbImgFloat.forEach((img, j) => {
    img.classList.remove("active-thumb");
    if (thumbnailbImg[j].classList.contains("active-thumb")) {
      img.classList.add("active-thumb");
      index = j;
    }
  });
});

const removeFloatImg = function () {
  classFloat.classList.remove("activate");
  overlayC.classList.remove("activate");
};

closeIcon.addEventListener("click", removeFloatImg);
overlayC.addEventListener("click", removeFloatImg);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    removeFloatImg();
  }
});

// Changing main image based on thumbnail click
function handleThumbnailClick() {
  thumbnailbImg.forEach(thumb => thumb.classList.remove("active-thumb"));
  this.classList.add("active-thumb");

  const newImageSrc = this.getAttribute("data-image");
  mainImg.src = newImageSrc;
}

thumbnailbImg.forEach(thumbnail => {
  thumbnail.addEventListener("click", handleThumbnailClick);
});

// Changing floating image based on thumbnail click
function handleThumbnailFloatClick() {
  thumbnailbImgFloat.forEach(thumb => thumb.classList.remove("active-thumb"));
  this.classList.add("active-thumb");
  index = Array.from(thumbnailbImgFloat).indexOf(this);

  const newImageSrc = this.getAttribute("data-image");
  mainImgFloat.src = newImageSrc;
}

thumbnailbImgFloat.forEach(thumbnail => {
  thumbnail.addEventListener("click", handleThumbnailFloatClick);
});

// Navigation for floating images
leftArrow.addEventListener("click", function () {
  if (index > 0) {
    thumbnailbImgFloat.forEach(thumb => thumb.classList.remove("active-thumb"));
    index -= 1;
    const newImageSrc = thumbnailbImgFloat[index].getAttribute("data-image");
    mainImgFloat.src = newImageSrc;
    thumbnailbImgFloat[index].classList.add("active-thumb");
  }
});

rightArrow.addEventListener("click", function () {
  if (index < thumbnailbImgFloat.length - 1) {
    thumbnailbImgFloat.forEach(thumb => thumb.classList.remove("active-thumb"));
    index += 1;
    const newImageSrc = thumbnailbImgFloat[index].getAttribute("data-image");
    mainImgFloat.src = newImageSrc;
    thumbnailbImgFloat[index].classList.add("active-thumb");
  }
});

// Handling cart functionality
let cartCount = 0;

minusBtn.addEventListener("click", function () {
  if (cartCount > 0) {
    cartCount -= 1;
    cartNumber.textContent = cartCount;
  }
});

plusBtn.addEventListener("click", function () {
  if (cartCount < 9) {
    cartCount += 1;
    cartNumber.textContent = cartCount;
  }
});

let itemsCount = 0;

navCart.addEventListener("click", function () {
  cartBox.classList.toggle("show");
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    cartBox.classList.remove("show");
  }
});

btnRight.addEventListener("click", function () {
  if (cartCount > 0 && itemsCount + cartCount <= 20) {
    itemsCount += cartCount;
    emptyCart.classList.remove("show");
    filledCart.classList.add("show");
    currPrice.textContent = `$${itemsCount * 125}.00`;
    numbercart.textContent = itemsCount;
    navAfter.classList.add("show");
    navAfter.textContent = itemsCount;
  }

  if (itemsCount === 20) {
    navAfter.textContent = "full";
  }
});

deleteIcon.addEventListener("click", function () {
  emptyCart.classList.add("show");
  filledCart.classList.remove("show");
  itemsCount = 0;
  navAfter.classList.remove("show");
});

document.body.addEventListener("click", function (e) {
  if (!cartBox.classList.contains("show")) return;

  const arr = e.composedPath();
  if (
    arr.includes(btnRight) ||
    arr.includes(btnLeft) ||
    arr.includes(navCart) ||
    arr.includes(cartBox)
  ) {
    return;
  }

  cartBox.classList.remove("show");
});

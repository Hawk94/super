function onLoad() {
  const elements = document.querySelectorAll(".notion-image");

  elements.forEach((element) => {
    const navbar = document.querySelector(".notion-navbar");
    navbar.classList.add("sticky");

    const picture = element.querySelector("picture > img");

    const img = element.querySelector("div > img");
    const backgroundImage = picture ? picture.src : img ? img.src : "";

    element.style.backgroundImage = `url(${backgroundImage})`;
  });
}

// Make the navbar sticky once user has scrolled beyond original viewport height.
function updateStickyNavbar() {
  const navbar = document.querySelector(".notion-navbar");
  const innerHeight = window.innerHeight;
  const yOffset = window.pageYOffset;

  if (yOffset > innerHeight) {
    navbar.classList.add("fixed");
    navbar.classList.remove("sticky");
  } else {
    navbar.classList.remove("fixed");
    navbar.classList.add("sticky");
  }
}

// Make the header fade out once the user has scrolled beyond 50% of original viewport height.
function updateHeaderVisibility() {
  const header = document.querySelector("h1.notion-heading");
  const headerVisibility = window.innerHeight / 2;
  const yOffset = window.pageYOffset;
  header.style.opacity = Math.min(1 - yOffset / headerVisibility, 1);
}

// Update navbar/header classes on scroll.
function onScroll() {
  updateStickyNavbar();
  updateHeaderVisibility();
}

onLoad();

window.onload = () => onLoad();
window.onscroll = () => onScroll();

window.onbeforeunload = () => {
  window.onscroll = null;
};

"use strict";

const navMenu = document.querySelector(".nav__menu");
const hideMob = document.querySelector("#hide");

// MAIN NAVBAR MIDDLE FUNCTIOANLITY

const handleHover = function (e) {
  if (e.target.closest(".nav__items")) {
    const btn = e.target.closest(".nav__items");
    const dataset = btn.dataset.tab;

    if (this[1] === 1) {
      const link = document.querySelector(`.hidden__item-${dataset}`);
      link.classList.remove("hidden");

      link.addEventListener("mouseover", () => {
        link.classList.remove("hidden");
      });
      link.addEventListener("mouseout", () => {
        link.classList.add("hidden");
      });
    } else {
      document
        .querySelector(`.hidden__item-${dataset}`)
        .classList.add("hidden");
    }
    const img = btn.closest("nav").querySelector(".nav__right");
    const logo = btn.closest("nav").querySelector(".nav__left");

    const items = btn.closest(".nav__menu").querySelectorAll(".nav__items");
    items.forEach((item) => {
      if (item !== btn) item.style.opacity = this[0];
    });
    img.style.opacity = this[0];
    logo.style.opacity = this[0];
  }
};

navMenu.addEventListener("mouseover", handleHover.bind([0.5, 1]));
navMenu.addEventListener("mouseout", handleHover.bind([1, 0]));

let btn = document.querySelector("#menu-btn");
let hidden = document.querySelector("#hide");
let btnBg = hidden.previousElementSibling;
btn.addEventListener("click", () => {
  hidden.classList.toggle("hidden");

  btn.classList.toggle("open");
  btnBg.style.backgroundColor = "rgba(29, 67, 84)";
  if (!btnBg.classList.contains("bg__added")) {
    btnBg.classList.add("bg__added");
  } else {
    btnBg.classList.remove("bg__added");

    btnBg.style.backgroundColor = "";
  }

  btnBg.style.animation = "menuBounce 0.5s alternate";
});

//NAV INNER FUNCTIONALITY

const innerMenu = document.querySelector(".inner__menu_item");
const list = document.querySelectorAll(".list");
innerMenu.addEventListener("click", (e) => {
  if (
    e.target.parentElement.classList.contains("inner__btn-container") ||
    e.target.classList.contains("inner__btn-container") ||
    e.target.classList.contains("span")
  ) {
    const btnDataset = e.target.closest(".inner__btn-container").dataset.btn;
    e.target
      .closest(".inner__btn-container")
      .querySelector(`.hidden__btn-${btnDataset}`)
      .classList.toggle("inner__btn_list-item");
  }
});

window.document.addEventListener("click", (e) => {
  if (
    !e.target.closest(
      ".inner__menu_item" && e.target.closest(".btn__container")
    )
  ) {
    hidden.classList.add("hidden");
    btn.classList.remove("open");
    btnBg.classList.remove("bg__added");

    btnBg.style.backgroundColor = "";
    // btnBg.classList.add("bg__added");
  } else {
    return;
  }
});
// gonna remain the same throughout the website no need to add it into a separate ffucktion

// SLIDER COMPOMENTN

const sliderComponent = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dots = document.querySelector(".dots");
  let curSlide = 0;
  let maxSlide = slides.length;

  const gotoSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const createDots = function () {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };

  gotoSlide(0);
  createDots();
  activeDot(0);

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    gotoSlide(curSlide);
    activeDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    gotoSlide(curSlide);
    activeDot(curSlide);
  };

  btnRight.addEventListener("click", nextSlide);

  btnLeft.addEventListener("click", prevSlide);

  dots.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      console.log(e.target);
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activeDot(slide);
    }
  });
};

// SCROLL FUNCTIOINALTY

const mainSectionScroll = function () {
  const sections = document.querySelectorAll(".scroll");
  console.log(sections);
  const revealSections = function (entries, observer) {
    const [entry] = entries;

    if (window.scrollY > 300) entry.target.classList.remove("section__hidden");
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section__hidden");

    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSections, {
    root: null,
    threshold: 0.1,
  });

  sections.forEach((section) => {
    if (window.scrollY > 500) return;
    sectionObserver.observe(section);
    console.log(window.scrollY);
    section.classList.add("section__hidden");
  });

  const inner__middle_menu = document.querySelector(".item__content-1");

  inner__middle_menu.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.closest(".inner__item")) {
      const href = e.target.getAttribute("href");
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

  const testimonialsSection = document.querySelector(".testimonials");

  testimonialsSection.addEventListener("mouseover", () => {
    testimonialsSection.classList.remove("section__hidden");
  });

  const ourServicesP__1 = document.querySelector("#our__services");

  ourServicesP__1.addEventListener("mouseover", () => {
    ourServicesP__1.firstElementChild.classList.remove("section__hidden");
  });
  console.log(ourServicesP__1);
};

// console.log(document.documentElement.clientHeight, window.scrollY,window.);

console.log(document.documentElement.getBoundingClientRect());
if (window.location.href.includes("index.html")) {
  sliderComponent();

  mainSectionScroll();
}

// PAGE2

const titleServicesScroll = function () {
  const services = document.querySelector(".os__container-p2");
  services.classList.add("section__hidden");

  const revealServices = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section__hidden");
    observer.unobserve(entry.target);
  };

  const servicesObserver = new IntersectionObserver(revealServices, {
    root: null,
    threshold: 0.1,
  });

  servicesObserver.observe(services);
};

if (window.location.href.includes("title__services.html")) {
  titleServicesScroll();
}

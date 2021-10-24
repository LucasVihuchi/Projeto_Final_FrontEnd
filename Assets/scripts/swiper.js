"use strict";

const swiper = new Swiper('.swiper', {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  
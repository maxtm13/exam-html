window.addEventListener('load', () => {
  console.log("loaded");
  const swiper = new Swiper('.products__slider', {

    slidesPerView: 2.3333,
    spaceBetween: 20,
    centeredSlides: true,

    pagination: {
      el: '.swiper-pagination',
    },


    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
  });

  const worker = new Swiper('.career__slider', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // let burger = document.querySelector('.header__burger')
  // burger.addEventListener('click', function () {
  //   burger.classList.toggle('active')

  // })

  const slider = new Swiper('.slider', {
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
  })
})

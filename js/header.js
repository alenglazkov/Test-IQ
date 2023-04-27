
//---Фунцция установки фона под липкое меню--------
(function () {
  const header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add('header__active');
    } else {
      header.classList.remove('header__active');
    }
  }
}()
);

//--------Функция меню БУРГЕР-----------------------
(function () {

  const burger = document.querySelector('.burger');
  const menuOpen = document.querySelector('.menu');
  const menuClose = document.querySelector('.header__nav-ico-close');
  const menuLinks = document.querySelectorAll('.menu__link');

  burger.addEventListener('click', () => {
    menuOpen.classList.add('header__nav_active');
  });

  menuClose.addEventListener('click', () => {
    menuOpen.classList.remove('header__nav_active');
  });

  if (window.innerWidth <= 820) {
    menuLinks.forEach(item => item.addEventListener('click', () => {
      menuOpen.classList.remove('header__nav_active');
    }))
  }
}()
);

// плавный скролл

(function () {

  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector('.header').clientHeight;
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight;
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);

  };

  function checkOpenSection () {
    const landingSection = document.querySelector('.landing');
    const sections = document.querySelectorAll('section');
    sections.forEach(item => {
      if (!item.classList.contains('block-hidden')
        && !item.classList.contains('landing')) {
          item.classList.add('block-hidden');
          landingSection.classList.remove('block-hidden');
      }
    })
  }

  const scrollTo = function () {
    const links = document.querySelectorAll('.js-scroll');
    links.forEach(each => {
      each.addEventListener('click', function () {
        checkOpenSection();
        const currentTarget = this.getAttribute('href');
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
}());
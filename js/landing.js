let landingPage = document.querySelector('.landing');
let testPage = document.querySelector('.task');

let btn = document.querySelectorAll('.btn');

const goTest = function () {
   landingPage.classList.add('block-hidden');
   testPage.classList.remove('block-hidden');
}

btn.forEach(item => {
   item.onclick = goTest;
});



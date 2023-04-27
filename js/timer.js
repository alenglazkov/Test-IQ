

//  ----- Функция таймера обратного отсчета----------------
// ---если время закончилось, то появляется кнопка "Пройти тест заново"---

let interval;

let timerDown = function () {
   let btnCallmy = document.querySelector('.test-end__btn');  // Поле кнопки "Позвонить"
   let btnContinue = document.querySelector('.test-end__btn-start'); // Поле кнопки "Пройти тест заново"

   // -------------------------------------------
   let timer = document.querySelector('.timer');  // Поле отображения таймера

   let time = 15; 

   timer.innerHTML = '00:00 <span class="test-end__timer-text"> минут</span>';
   interval = setInterval(timers, 1000); 


   function timers() {
      if (time < 0) {
         timer.innerHTML = 'Время закончилось';
         clearInterval(interval); 
         btnCallmy.classList.add('block-hidden'); // скрываем кнопку
         btnContinue.classList.remove('block-hidden');  // показываем кнопку

      } else {
         let minutes = Math.floor(time / 60);
         if (minutes < 10) {
            minutes = '0' + minutes;
         }
         let seconds = time % 60;
         if (seconds < 10) {
            seconds = '0' + seconds;
         }
         timer.innerHTML = `${minutes}:${seconds}<span class="test-end__timer-text"> минут</span>`;
         time--;
      }
   }
}

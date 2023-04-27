// ----Коменты писал для себя---------------------------------

let resultTask = {}; // результат задачи
let resultTest = []; // результат теста
let taskIndex = 0;    // индекс задачи
let iqComponent = [   // Массив данных для имитации процесса оброботки
   'Определение стиля мышления',
   'Уровень абстрактного мышления',
   'Уровень серого вещества',
   'Оценка уровня логики',
   'Коєффицент использования разума',
   'Вычисление коэффицента IQ'
];

let testHeaderField = document.querySelector(".header__text");// поле вывода заголовка страницы теста
let progressBarField = document.querySelector("progress"); // поле вывода прогресса текста

let taskField = document.querySelector(".task"); // поле вывода всей задачи
let taskTextField = document.querySelector(".task__task-text"); // поле вывода текста (условия) задачи
let taskImgField = document.querySelector(".task__img"); // поле вывода картинки задачи

let taskAnswersField = document.querySelector(".task__answers"); // поле вывода ответов
let taskBtnField = document.querySelector(".task__btn"); // поле вывода Кнопки "Далее"

let resultsField = document.querySelector(".results"); // поле вывода результатов
let resultsHandlerField = document.querySelector(".results__handler"); // поле обработки результатов
let resultsHeaderField = document.querySelector(".results__header"); // поле вывода заголовка результатов
let resultsProgressField = document.querySelector(".results__progress"); // поле вывода процесса обработки

let testEndField = document.querySelector(".test-end"); // поле вывода страницы результатов теста
let testEndResultsField = document.querySelector(".test-end__results"); // поле вывода результатов теста

const buttonNext = document.querySelector('.task__btn'); // кнопка перехода на следующее занание теста
const buttonCall = document.querySelector('.test-end__btn'); // кнопка звонка
const buttonStart = document.querySelector('.btn-end-start'); // кнопка Пройти тест заново


// функция вывода прогресса текста
const showProgress = function (taskIndex) {
   progressBarField.value = (taskIndex / (test.length)) * 100;
   progressBarField.innerHTML;
   return progressBarField;
}

// функция вывода текста (условия) задачи
const showTaskText = function (taskIndex) {
   taskTextField.innerHTML = test[taskIndex]['task'];
   return taskTextField;
}

// функция вывода картинки задачи
const showTaskImg = function (taskIndex) {
   if (test[taskIndex]['img'] === undefined) {
      taskImgField.innerHTML = '';
   } else {
      taskImgField.innerHTML = `<img src=${test[taskIndex]['img']} alt="pic">`;
   }
   test[taskIndex]['task'];
   return taskImgField;
}
//---------------------Функции вывода вопросов-----------------------------------------

// функция вывода списка вопросов с радиокнопками
function showRadioList(taskIndex) {
   let answersList = '';
   for (let key in test[taskIndex]['answers']) {
      let list = `<li>
         <div class="radio">
         <input class="input-radio input-radio__hidden" name="answer" type="radio" value=${key} id=${key}>
         <label class="radio__label" for=${key}>
         <span class="radio__label-span">
         ${test[taskIndex]['answers'][key]}
         </span>
         </label>
         </div>
         </li>`;
      answersList += list;
   }
   taskAnswersField.innerHTML = `<ul class="task__radio">${answersList}</ul>`;
}

// функция вывода списка вопросов с цветом
function showColorList(taskIndex) {
   let answersList = '';
   for (let key in test[taskIndex]['answers']) {
      let list =
         `<input class="input-radio input-radio__hidden" name="answer" type="radio" value=${key} id=${key}>
         <label class="color__label" for=${key}>
         <div class="btn__color" style='background-color:${test[taskIndex]['answers'][key]}' data-color=${key}>
         </div>
         </label>`;
      answersList += list;
   }
   taskAnswersField.innerHTML = `<div class="task__color">${answersList}</div>`;
}

// функция вывода списка вопросов с картинкой и числами
function showPicNumList(taskIndex) {
   let answersList = '';
   for (let key in test[taskIndex]['answers']) {
      let list =
         `<input class="input-radio input-radio__hidden" name="answer" type="radio" value=${key} id=${key}>
         <label for=${key}>
         <div class="btn__pic-num"><p>${test[taskIndex]['answers'][key]}</p></div>
         </label>`;
      answersList += list;
   }
   taskAnswersField.innerHTML = `<div class="task__pic-num">${answersList}</div>`;
}
//----------------------------------------------------------------------------------

// функция случайного числа
function randomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

// функция, показывающая процесс обработки результатов теста 
function testHandler() { 
   resultsHeaderField.textContent = 'Обработка результатов';
   let point = '.';
   for (let i = 0; i < iqComponent.length; i++) {
      setTimeout(function () {
         resultsHandlerField.innerHTML = iqComponent[i];
         setTimeout(function () {
            for (let k = 0; k <= randomInt(10, 300); k++) {
               resultsProgressField.innerHTML = point;
               point += '. ';
            }
         }, randomInt(200, 1000));
      }, randomInt(300, 8000));
   };

   setTimeout(function () {
      testHeaderField.innerHTML = 'готово!'; //вывод заголовка страницы теста
      resultsField.classList.add('block-hidden');
      testEndField.classList.remove('block-hidden');
   }, 8000);

   timerDown();
}
//==========================ГЛАВНАЯ ФУНКЦИЯ ТЕСТА============================================
// функция вывода задач теста
function showTask(taskIndex) {
   testHeaderField.innerHTML = 'тест на определение iq';//вывод заголовка страницы теста
   showProgress(taskIndex); //вывод прогресса теста
   if (taskIndex === test.length) {

      taskField.classList.add('block-hidden');
      resultsField.classList.remove('block-hidden');
      testHandler();// функция обработки результатов теста
      return;
   } else {
      showTaskText(taskIndex); //вывод текста (условия) задачи
      showTaskImg(taskIndex);  // Вывод картринки из задачи
      let answersList = ''; // очистка списка 

      // Определение типа ответов задачи: 'Радиокнопки', 'Цвет' или 'Картинка и числа'

      switch (test[taskIndex]['type']) {
         case 'radio':
            showRadioList(taskIndex);
            // backgroundRadio;
            break;
         case 'color':
            showColorList(taskIndex);
            break;
         case 'pic-number':
            answersList += showPicNumList(taskIndex);
      }
      taskBtnField.innerHTML = '<button class="btn-task">Далее</button>';//вывод кнопки Далее
   }
}
//========================================================================================

//---------------------------Функции проверки выбора ответа----------------------------------

// Функция проверки ответа на задачу (выбран ли ответ) ДОБАВИТЬ 2 проверки
function сheckTaskAnswer() {
   let choiseRadio = taskAnswersField.querySelector('.input-radio:checked');

   if (!choiseRadio) {    // Блокировка кнопки при отсутствии выбора ответа
      buttonNext.blur();
      return;
   } else {

      resultTask['answers'] = choiseRadio.value; // Сохранение результата ответа на задачу
      resultTest.push(resultTask); // Добавление ответа в массив ответов теста

      console.log(resultTask);
      console.log(resultTest);

      taskIndex++; // увеличение значения индекса задачи (переход на следующую задачу)
      showTask(taskIndex);
      resultTask = {}; // очистка результата предыдущей задачи
   }
}
//------------------------------------------------------------------------------------

// Функция вывода результата ответа сервера
function showResponse(data) {
   let dataList = '';
   for (let key in data) {
      let addUl = '';
      if (Array.isArray(data[key])) {
         let addLi = '';
         for (let i = 0; i < data[key].length; i++) {
            addLi += `<li>${data[key][i]}</li>`;
         }
         addUl = `<ul>${addLi}</ul>`;
         dataList += `<li><span class="test-end__results-key">${key}</span> : ${addUl}</li>`;
      } else {
         dataList += `<li><span class="test-end__results-key">${key}</span>  : ${data[key]}</li>`;
      }
   }
   testEndResultsField.innerHTML =
      `<h3 class="test-end__results-title">Результат обработки Вашего теста:<h3/>${dataList}`;
}

function getResultsTest() {
   fetch('https://swapi.dev/api/people/1/') // Запрос на сервер
      .then(response => response.json())    // Ожидание данных
      .then(data => {                       // Данные получены
         console.log(data);
         showResponse(data); // Вывод полученных с сервера данных 
      })
   clearInterval(interval);      // остановка таймера 
}

// Функция Пройти тест заново
let btnCall = document.querySelector('.test-end__btn');
let btnStart = document.querySelector('.test-end__btn-start');

function goStartTest() {
   testEndField.classList.add('block-hidden');
   taskField.classList.remove('block-hidden');
   taskIndex = 0;
   showTask(taskIndex); // запуск функции вывода страницы теста
   btnCall.classList.remove('block-hidden');
   btnStart.classList.add('block-hidden');
}

showTask(taskIndex); // запуск функции вывода страницы теста
buttonNext.onclick = сheckTaskAnswer; // запуск функции проверки ответа задачи
buttonCall.onclick = getResultsTest;   // запуск функции получкния результатов теста   
buttonStart.onclick = goStartTest; // запуск функции Пройти тест заново
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');
// Ищем кнопку, по нажатии на которую очищаем localStorage
const btnClearNode = document.querySelector('.j-btn-clear');
// Ищем кнопку, по нажатии на которую показываем localStorage
const btnListNode = document.querySelector('.j-btn-list');

// Получаем данные по ключу myJSON в localStorage
const myJSON = localStorage.getItem('myJSON');
if (myJSON) {
       // Если данные в localStorage есть - просто выводим их
//       console.log('localStorage JSON', JSON.parse(myJSON));
       displayResult(JSON.parse(myJSON)); 
//       console.log('22Данные из localStorage.');
}

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';
//   console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  resultNode.innerHTML = cards;
}

// Вешаем обработчик на кнопку для запроса
var reqUrl = "https://picsum.photos/v2/list?page=";

btnNode.addEventListener('click', () => {
        value = document.getElementById('input1').value;
        value1 = document.getElementById('input2').value;
        url = reqUrl + value + "&limit=" + value1;
  
        if (((value < 1 || value > 10) && (value1 < 1 || value1 > 10)) || ((isNaN(value)) && (isNaN(value1))))  {
              resultNode.innerHTML = "Номер страницы " + value + " и лимит " + value1 + " вне диапазона от 1 до 10";
              } else {  
                if (((value < 1 || value > 10) || (isNaN(value))) && (value1 >= 1 || value1 <= 10)) {
                resultNode.innerHTML = "Номер страницы " + value + " вне диапазона от 1 до 10";
                } else {
                  if ((value >= 1 || value <= 10) && ((value1 < 1 || value1 > 10)) || (isNaN(value1))) {
                  resultNode.innerHTML = "Лимит " + value1 + " вне диапазона от 1 до 10";
                  } else {
                    resultNode.innerHTML = "Получаем ссылку вида: " + url ;
                    // Если данных в localStorage нет - делаем запрос
                    useRequest(url, (json) => {
                      // Выводим данные, полученные в результате запроса
                      //    console.log('request JSON', json);
                      // Записываем результат запроса в localStorage
                      localStorage.setItem('myJSON', JSON.stringify(json));
                      displayResult(json);
                      });
                  };
                };
            };
});

// Вешаем обработчик на кнопку для очистки localStorage
btnClearNode.addEventListener('click', () => {
  localStorage.clear();
  console.log('Данные из localStorage удалены');
});

// Вешаем обработчик на кнопку для показа localStorage
btnListNode.addEventListener('click', () => {
  // Получаем данные по ключу myKey в localStorage
  let myJSON = localStorage.getItem('myJSON');

  // Если localStorage очищался, то ключа не будет.
  // Если не зачищался - получим значение по ключу
  console.log('1. myJSON', myJSON);
  console.log('Данные из localStorage.');
});
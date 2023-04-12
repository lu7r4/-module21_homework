/* Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Номер страницы вне диапазона от 1 до 10».
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводится ниже текст «Лимит вне диапазона от 1 до 10».
Если и первый, и второй input не в диапазонах или не являются числами — выводится ниже текст «Номер страницы и лимит вне диапазона от 1 до 10».
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).

 */

const button = document.querySelector('button');
const page = document.querySelector('.page');
const limit = document.querySelector('.limit');
const p = document.querySelector('p');
let ul = document.querySelector('ul');
let img = document.querySelector('.img')

let imgJson = localStorage.getItem('img');
let imgesJson = localStorage.getItem('imges');
    if (imgJson) {
ul.innerHTML = JSON.parse(imgJson);
img.innerHTML = JSON.parse(imgesJson);
};

page.addEventListener('click', () => page.value = '');
limit.addEventListener('click', () => limit.value = '');
button.addEventListener('click', () => {
    const pageNumber = Math.round(Number(page.value ? page.value : 0))
    const limitNumber = Math.round(Number(limit.value ? limit.value : 0))
    p.innerText = '';
    ul.innerHTML = '';
    img.innerHTML = '';
        if (1 > pageNumber || pageNumber > 10) {
            p.innerText = 'Номер страницы вне диапазона от 1 до 10';
        }
        if (1 > limitNumber || limitNumber > 10) {
            p.innerText = 'Лимит вне диапазона от 1 до 10';
        }
        if ((1 > limitNumber || limitNumber > 10) && (1 > pageNumber || pageNumber > 10)) {
            p.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10';
        }
        if ((1 <= limitNumber && limitNumber <= 10) && (1 <= pageNumber && pageNumber <= 10)) {
            ulReqwest();
        }

function ulReqwest() {
        fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=${limitNumber}`)
            .then((response) => {
                const result = response.json();
                return result;
            })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    const newUl = document.createElement("li");
                    const newUlDescription = document.createTextNode(`Автор: ${data[i].author}; адрес: `);

                    const newUlLink = document.createElement("a");
                    const newUlLinkContent = document.createTextNode(data[i].download_url);
                    newUlLink.setAttribute("href", data[i].download_url)
                    newUlLink.appendChild(newUlLinkContent);

                    const newImage = document.createElement('img');
                    newImage.setAttribute("src", data[i].download_url);
                    newImage.setAttribute("alt", "ul");

                    newUl.appendChild(newUlDescription);
                    newUl.appendChild(newUlLink);
                    ul.appendChild(newUl);
                    img.appendChild(newImage);
                }
                localStorage.setItem('img', JSON.stringify(ul.innerHTML));
                localStorage.setItem('imges', JSON.stringify(img.innerHTML));
            })
        .catch(() => { })
    }
})

/* Написать скрипт, который при открытии страницы будет делать следующее:

Если пользователь зашел в первый раз, вывести окно prompt с сообщением: «Добро пожаловать! Назовите, пожалуйста, ваше имя».

После того, как пользователь введет имя, записать имя, дату и время визита в localStorage.

Подсказка: для определения текущей даты используйте new Date().
Если пользователь открывает страницу не впервые (это можно узнать по наличию соответствующих записей в localStorage), вывести в alert сообщение вида: «Добрый день, *имя пользователя*! Давно не виделись. В последний раз вы были у нас *дата последнего посещения*» и перезаписать дату последнего посещения.

Дату можно вывести в любом удобочитаемом формате (не Timestamp, должен четко читаться день, месяц, год и время — часы и минуты). */

let savedName = localStorage.getItem('key');
let userName = '';
let time = '';
function createTime() {
    let date = new Date();
    time = date.toLocaleString();
    localStorage.setItem('lastVisit', JSON.stringify(time));
};
if (savedName) {
    userName = JSON.parse(savedName);
    let timeJson = localStorage.getItem('lastVisit');
    time = JSON.parse(timeJson);
    alert(`Добрый день, ${savedName}! Давно не виделись. В последний раз вы были у нас ${time}`);
    createTime();
} else {
    userName = prompt('Добро пожаловать! Назовите, пожалуйста, ваше имя');
    if (!userName) {
        localStorage.removeItem('key');
    } else {
        localStorage.setItem('key', JSON.stringify(userName));
        createTime();
    };
};
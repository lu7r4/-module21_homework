/* Написать код приложения, интерфейс которого состоит из поля ввода и кнопки «Получить список задач». При нажатии на кнопку нужно отправить запрос с помощью fetch на URL https://jsonplaceholder.typicode.com/users/3/todos. Число 3 представляет собой id пользователя, вместо него нужно подставить число, введенное в поле. Если пользователь с таким id существует, вернется список задач для этого пользователя, каждая задача представлена объектом вида:

{
    "userId": 3,
    "id": 43,
    "title": "tempore ut sint quis recusandae",
    "completed": true
}
Где title — описание задачи, а completed — флаг, отображающий, выполнена задача или нет. Вывести данный список на страницу, оформив соответствующим образом: в виде списка (ul или ol), выполненные задачи должны быть написаны зачеркнутым текстом. Если пользователь с введенным id не существует, вывести сообщение: «Пользователь с указанным id не найден».*/


const button = document.querySelector('.button');
const input = document.querySelector('.input');
const list = document.querySelector('.list');
const text = document.querySelector('h3');
input.addEventListener('click', () => {
    list.innerHTML = '';
    text.innerHTML = '';
});

button.addEventListener('click', () => {
    let id = input.value
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
.then((response) => {
    const result = response.json();
    return result;
})
.then((data) => {
    return new Promise((resolve, reject) => {
        if (data.length) {
            resolve(data);
        } else {
            reject()
        }
    })
})
.then((data) => {
    text.innerHTML = `Ваш список задач (для id ${id}):`
    for (let i = 0; i < data.length; i++) {
        const newList = document.createElement('li');
        const newTasks = document.createTextNode(data[i].title);
        newList.appendChild(newTasks);
        list.appendChild(newList);
        if (data[i].completed) {
            newList.classList.add('completed');
        }
    }
})
.catch(() => {
    list.innerHTML = '';
    text.innerHTML = `Пользователь с ID = ${id} не найден.`;
})
input.value = '';
})
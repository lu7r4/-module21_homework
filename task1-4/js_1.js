// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

/*<list>
    <student>
        <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
</list>

{
    list: [
        { name: 'Ivan Ivanov', age: 35, prof: 'teacher', lang: 'en' },
        { name: 'Петр Петров', age: 58, prof: 'driver', lang: 'ru' },
        ]
}
*/
// code

const parser = new DOMParser();

const xlm = `
    <list>
    <student>
        <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    </list>
`;

const parsXlm = parser.parseFromString(xlm, "text/xml");
const list = parsXlm.querySelector("list");
const arrStudents = list.querySelectorAll("student")

let result = {
    list: []
};
function letArr() {
for (let i = 0; i < arrStudents.length; i++) {
    const student = arrStudents[i];
    const name = student.querySelector("name");
    const first = name.querySelector("first");
    const second = name.querySelector("second");
    const age = student.querySelector("age");
    const prof = student.querySelector("prof");
    
    const lang = name.getAttribute("lang")
    
    const object = {
        name: first.textContent + ' ' + second.textContent,
        age: Number(age.textContent),
        prof: prof.textContent,
        lang: lang
    }

    result.list.push(object);
}
}
letArr()
console.log(result);



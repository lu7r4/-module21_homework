/*  Дан образец JSON-строки:

{"name":"Anton","age":36,"skills":["Javascript","HTML","CSS"],"salary":80000}

Ваша задача — создать JS-объект, который при преобразовании в JSON будет возвращать в качестве результата такую же JSON-строку, как в образце. Получившуюся строку вывести в консоль.
*/

const json = `{
    "object": {
        "name":"Anton",
        "age":36,
        "skills":["Javascript","HTML","CSS"],
        "salary":80000
    }
}`;
const data = JSON.parse(json);
const object = data.object;

const result2 = {
    name: object.name,
    age: object.age,
    skills:object.skills,
    salary: Number(object.salary),
};
console.log(result2);
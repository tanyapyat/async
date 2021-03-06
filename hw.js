let {
    AsyncArray,
    add,
    subtract,
    multiply,
    divide,
    mod,
    less,
    equal,
    lessOrEqual,
    sqrt
} = Homework;

const a = new AsyncArray([1, 2, 3]);

console.log('Сумма элементов массива с четными индексами');
console.log(' ');
console.log('Исходный массив: ');
a.print();
console.log(' ');

const promisify = (fn) => (...args) => {
    return new Promise((resolve) => {
        fn(...args, resolve)
    });
};

less = promisify(less);
mod = promisify(mod);
add = promisify(add);
equal = promisify(equal);

async function sum(array, callback) {
    let res = 0;
    let index = 0;

    array.length(async length => {  // длина массива
        while(await less(index, length)) {  // индекс текущего элемента меньше длины массива
            const rem = await mod(index, 2);  // остаток от деления на 2
            if (await equal(rem, 0)) {  // четность
                await array.get(index, async elem => {  // элемент массива
                    res = await add(res, elem);  // добавление к результату
                })
            }
            index = await add(index, 1);  // увеличение индекса
        }
        callback(res);
    });
}

sum(a, result => {
    console.log('результат сложения', result);
});
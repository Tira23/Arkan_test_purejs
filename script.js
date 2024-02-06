// массивы блоков с городами
let leftBlockArray = []
let rightBlockArray = []
// получаю ненумерованный список из DOM дерева
const leftBlockUl = document.querySelector('.left').querySelector("ul")
const rightBlockUl = document.querySelector('.right').querySelector("ul")

// получаем рандомно число для выборки городов
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// выбираю из всех городов 10
let itemList = Array(10).fill(null).map(() => {
    // получаю длину массива городов
    const citiesArrayLength = cities.length
    // выбираю город наугад
    const randomCities = cities[getRandomInt(citiesArrayLength)]
    // делаю из каждого города объект
    const item = {
        // присваиваю уникальный идентификатор
        id: Date.now(), // присваиваю имя городу
        title: randomCities, // выбирается случайно начальная позиция
        isLeft: Math.random() > .5, //  этот флаг отвечает выбран ли этот элемент
        isChose: false
    }
    // делаю каждый элемент объектом
    return item
})

// распределяю города по блокам
function distributeElementsToArrays() {
    const curList = itemList || [...leftBlockArray, ...rightBlockArray]
    curList.forEach(el => el.isChose = false)
    leftBlockArray = curList.filter(el => el.isLeft)
    rightBlockArray = curList.filter(el => !el.isLeft)
}

// это ререндер для обновления блоков
function render() {
    distributeElementsToArrays()
    removeLiFromUl()
    distributeElements()
}

// выполняю первичную сортировку по блокам
distributeElementsToArrays()

// функция для добавления и удаления класс отвечающего за цвет
function clickToLi() {
    toggleChose(this)
    this.classList.toggle('selectLine')
}

// функция меняющая значения свойства isChose у объекта для отслеживания на какой li кликнули
function toggleChose(el) {
    const curList = [...leftBlockArray, ...rightBlockArray]
    curList.forEach((item) => {
        if (item.title === el.textContent) {
            item.isChose = !item.isChose
        }
    })
}

// функция добавляет прослушивание событий по клику на li
function addEventToLi(li) {
    li.addEventListener('click', clickToLi)
}

// создаю ли в каждом блоке в зависимости от значения свойства элемента isLeft
function appendLi(el, isLeft) {
    const li = document.createElement('li')
    li.textContent = el.title
    isLeft ? leftBlockUl.append(li) : rightBlockUl.append(li)
    addEventToLi(li)
}

// функция удаления всех элементов li
function removeLiFromUl() {
    document.querySelectorAll('li').forEach(li => li.remove())
}

removeLiFromUl()

// распределение городов по массивам для удобного манипулирования
function distributeElements() {
    leftBlockArray.forEach(el => appendLi(el, el.isLeft))
    rightBlockArray.forEach(el => appendLi(el, el.isLeft))
}

distributeElements()
// получаю кнопки для переноса в другой блок
const arrowToRight = document.querySelector('.arrowToRight')
const arrowToLeft = document.querySelector('.arrowToLeft')

// функция, которая указывает какие города необходимо перенести
function toggleIsLeft(el) {
    el.isLeft = el.isChose ? !el.isLeft : el.isLeft
    return el
}

// событие, которое происходит по клику на стрелку
function moveLiToRight() {
    leftBlockArray = leftBlockArray.map(toggleIsLeft)
    render()
}

// событие, которое происходит по клику на стрелку
function moveLiToLeft() {
    rightBlockArray = rightBlockArray.map(toggleIsLeft)
    render()
}

// вешаю обработчик событий на стрелки
arrowToRight.addEventListener('click', moveLiToRight)
arrowToLeft.addEventListener('click', moveLiToLeft)

const doubleArrowToRight = document.querySelector('.doubleArrowToRight')
const doubleArrowToLeft = document.querySelector('.doubleArrowToLeft')
// меняю всем города позицию
function changeIsLeft(bool) {
    itemList = [...rightBlockArray, ...leftBlockArray].map(el => {
        el.isLeft = bool
        return el
    })
}
function moveLiToRightAll() {
    changeIsLeft(false)
    render()
}


function moveLiToLeftAll() {
    changeIsLeft(true)
    render()
}
// вешаю событие на двойные стрелки
doubleArrowToRight.addEventListener('click', moveLiToLeftAll)
doubleArrowToLeft.addEventListener('click', moveLiToRightAll)

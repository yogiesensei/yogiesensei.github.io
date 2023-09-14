const form = document.getElementById('form')
const input = document.getElementById('input')
const button = document.getElementById('button')
const itemContainer = document.getElementById('item-container')
let todoData = []

const uuid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

const renderItem = (item) => {
    return `
    <div id="item-todo">
    <p onclick="deleteItem('${item.id}')">❌</p>
    <p class=${item.completed ? 'strike' : 'normal'} onclick="handleComplete('${item.id}')">${item.title}</p>
    </div>
    `
}

const printTodo = (todo) => {
    let html = ''
    todo.map(item => {
        html += renderItem(item)
    })
    itemContainer.innerHTML = html
}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    let newTodo = []
    if (input.value.length) {
        newTodo = [...todoData,
            {
                id: uuid(),
                title: input.value,
                completed: false
            }
        ]
        localStorage.setItem('local', JSON.stringify(newTodo))
        todoData = JSON.parse(localStorage.getItem('local'))
        printTodo(todoData)
        input.value = ''
    }
})

const deleteItem = (id) => {
    let newTodo = []
    newTodo = todoData.filter(item => item.id !== id)
    printTodo(newTodo)
    todoData = newTodo
    localStorage.setItem('local', JSON.stringify(todoData))
}

const handleComplete = (id) => {
    let newTodo = JSON.parse(localStorage.getItem('local'))
    let index = newTodo.findIndex(item => item.id === id)
    newTodo[index].completed = !newTodo[index].completed
    printTodo(newTodo)
    todoData=newTodo
    localStorage.setItem('local',JSON.stringify(todoData))
}

const getData = () => {
    const storage = localStorage.getItem('local')
    if (storage) {
        todoData = JSON.parse(storage)
        printTodo(todoData)

    } else {
        localStorage.setItem('local', JSON.stringify([]))
    }
}

getData()
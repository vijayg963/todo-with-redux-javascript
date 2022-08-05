let store = Redux.createStore(reducer);

let rootElm = document.querySelector('.todos');
let input = document.querySelector('#text');
let allTodos = JSON.parse(localStorage.getItem('todos')) || store.getState();

function handleTodo(event) {
  let value = event.target.value;
  if (event.keyCode === 13 && value) {
    let todo = {
      name: value,
      isDone: false,
    };
    console.log(todo);
    store.dispatch({ type: 'add', id: null, todo });
    event.target.value = '';
  }
}

function createUi(data) {
  rootElm.innerHTML = '';
  data.forEach((todo, i) => {
    let li = document.createElement('li');
    li.classList.add('flex', 'space-between');
    let div = document.createElement('div');
    let radio = document.createElement('input');
    radio.type = 'checkbox';
    radio.addEventListener('click', () => {
      store.dispatch({ type: 'toggle', id: i });
    });
    radio.checked = todo.isDone;
    let span = document.createElement('span');
    span.innerText = todo.name;
    let p = document.createElement('p');
    p.innerText = '❌';
    p.addEventListener('click', () => {
      store.dispatch({ type: 'delete', id: i });
    });
    div.append(radio, span);
    li.append(div, p);
    rootElm.append(li);
  });
}

createUi(allTodos);

store.subscribe(() => {
  createUi(allTodos);
  localStorage.setItem('todos', JSON.stringify(allTodos));
});

input.addEventListener('keyup', handleTodo);

function reducer(state = [], action) {
  switch (action.type) {
    case 'add':
      return allTodos.push(action.todo);
    case 'delete':
      return allTodos.splice(action.id, 1);
    case 'toggle':
      return (allTodos[action.id].isDone = !allTodos[action.id].isDone);
    default:
      return state;
  }
}

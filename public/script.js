async function getData(){
    let res = await fetch("http://localhost:8080/todo");
    let data = await res.json();
    addToTable(data);
}

const table = document.querySelector("#table");
const task = document.querySelector("#task");
const done = document.querySelector("#done");
const due = document.querySelector('#due');
const submit = document.querySelector("#btn");

function addToTable(data){
    table.innerHTML = "";
    let row = newElement('tr', null);
    table.appendChild(row);
    row.appendChild(newElement('th', 'Index'));
    row.appendChild(newElement('th', 'Task'));
    row.appendChild(newElement('th', 'Done'));
    row.appendChild(newElement('th', 'Due Date'));

    console.log(data);

    for(item of data){
        let row = newElement('tr', null);
        table.appendChild(row);
        row.appendChild(newElement('td', item.id));
        row.appendChild(newElement('td', item.task));
        row.appendChild(newElement('td', item.done));
        row.appendChild(newElement('td', item.due));
    }
}

function newElement(type, data){
    let element = document.createElement(type);
    if(data != null){
        element.textContent = data;
    }
    return element;
}

async function addTask(){
    let data = {
        task : task.value,
        done : done.options[done.selectedIndex].value,
        due : due.value
    };
    if(data.task != "" && data.due != ""){
        let res = await fetch("http://localhost:8080/todo",
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
        let respData = res.body;
        task.value = "";
        due.value = "";
        getData();
        }
    
    
}

submit.onclick = addTask;
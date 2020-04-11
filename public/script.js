async function getData(){
    let res = await fetch("http://localhost:8080/todo");
    let data = await res.json();
    addToTable(data);
}

const table = document.querySelector("#table");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const due = document.querySelector('#due');
// const status = document.querySelector('#status');
const priority = document.querySelector('#priority');
const note = document.querySelector('#note');
const submit = document.querySelector("#btn");

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
due.defaultValue = tomorrow.toJSON().substring(0,10);

function addToTable(data){
    table.innerHTML = "";
    let row = newElement('tr', null);
    table.appendChild(row);
    row.appendChild(newElement('th', 'Index'));
    row.appendChild(newElement('th', 'Title'));
    row.appendChild(newElement('th', 'Description'));
    row.appendChild(newElement('th', 'Due Date'));
    row.appendChild(newElement('th', 'Status'));
    row.appendChild(newElement('th', 'Priority'));

    if(data.length == 0){
        let row = newElement('tr', null);
        table.appendChild(row);
        let data = newElement('td', 'No data to display');
        row.appendChild(data);
        data.colSpan = "6";
        data.style.textAlign = "center";
        data.style.color = "gray";
    }
    else{
        for(item of data){
            let row = newElement('tr', null);
            table.appendChild(row);
            row.appendChild(newElement('td', item.id));
            row.appendChild(newElement('td', item.title));
            row.appendChild(newElement('td', item.description));
            row.appendChild(newElement('td', item.due));
            row.appendChild(newElement('td', item.status));
            row.appendChild(newElement('td', item.priority));
            let rowNote = newElement('tr', null);

            table.appendChild(rowNote);
            rowNote.className = 'notes';
            rowData = document.createElement('td');
            rowNote.appendChild(rowData);
            getNotes(item.id, rowData);
            rowData.colSpan = 6;
            
        }
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
        title : title.value,
        description : description.value,
        status : false,
        priority : priority.options[priority.selectedIndex].value,
        due : due.value,
        note : note.value
    };


    if(data.title != "" && data.due != "" && data.priority != ""){
        let res = await fetch("http://localhost:8080/todo",
        {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            });
        let respData = res.body;
        title.value = "";
        description.value = "";
        due.value = tomorrow.toJSON().substring(0,10);
        note.value = "";
        getData();
        }
    
    
}

async function getNotes(id, rowData){
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status == 200) {
            let data = JSON.parse(this.responseText);
            formattedData = '';
            for(let note of data){
                formattedData += note.note + `<br/>`;
            }
            rowData.innerHTML = formattedData;
            let input = newElement('input', null);
            let btn = newElement('input', null);
            rowData.appendChild(input);
            rowData.appendChild(btn);
            input.type = 'text';
            btn.type = 'button';
            btn.value = 'Add Note';
            btn.onclick = function(){
                addNote(input, id);
            }
            input.id = id + "_input";
          }
    }
    xhr.open("GET", "http://localhost:8080/todo/" + id + "/notes");
    xhr.send();
}

async function addNote(input, id){
    if(input.value != ""){
        data = {
            note : input.value,
            TodoId : id
        };
        let res = await fetch("http://localhost:8080/todo/" + id + "/notes",
            {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                });
        let respData = res.body;
        getData();
    }
}

submit.onclick = addTask;


const express = require('express');
const app = express();
const {db, Todos, notes} = require('./db');

app.use(express.json());

// let todo = [
//     {task : 'Learn Node JS', done : false, due : '2020-04-05'},
//     {task : 'Learn SQL', done : true, due : '2020-03-05'},
//     {task : 'Learn Java', done : true, due : '2020-02-05'},
// ]

app.use('/', express.static(__dirname + '/public'));


db.sync().then(
    () => app.listen(8080)
    ).catch(
      (err) => console.error(err)
    );


app.get('/todo/:id', (req, res) => {
    console.log(req.params);
    if(isNaN(parseInt(req.params.id))){
        req.status(404).send({
            error : 'invalid todo id'
        });
        return;
    }
    res.send(todo[req.params.id]);
});

app.get('/todo/', (req, res) => {
    Todos.findAll({
        attributes : ['id', 'title', 'description', 'due', 'status', 'priority']
    }).then((todos) => res.send(todos));
});

app.post('/todo', (req, res) => {
    let data = req.body;
    Todos.create(data).then(
        (retVal) => {
            console.log(retVal);
            if(data.note != ''){
                let noteData = {
                    note : data.note,
                    TodoId : retVal.dataValues.id
                }
                notes.create(noteData).then(() => res.send(""));
            }
            else{
                res.send("");
            }
        });
})


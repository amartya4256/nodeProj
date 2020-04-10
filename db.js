const sequelize = require('sequelize');

const db = new sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/test.db'
});

console.log(__dirname);

const notes = db.define('notes', {
    id : {
        type : sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    note : {
        type : sequelize.STRING(1000) 
    }
})

const Todos = db.define('Todos', {
    id : {
        type : sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title : {
        type : sequelize.STRING(50) 
    },

    description : {
        type : sequelize.STRING(100) 
    },

    due : {
        type : sequelize.DATEONLY
    },

    status : {
        type : sequelize.BOOLEAN,
        defaultValue : true
    },

    priority : {
        type : sequelize.ENUM,
        values : ['high', 'medium', 'low'],
        defaultValue : true
    }

});

Todos.hasMany(notes);

module.exports = {
    db, Todos, notes
};
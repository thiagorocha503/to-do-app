"use strict";
// ----------  Localstorage ------------
var TodoLocalStorage = /** @class */ (function () {
    function TodoLocalStorage() {
    }
    TodoLocalStorage.prototype.getTodos = function () {
        var _localStorage = localStorage.getItem("todos");
        if (_localStorage == null) {
            this.setTodos("[]");
            this.setContador(1);
            _localStorage = localStorage.getItem("todos");
        }
        var dados = JSON.parse(_localStorage);
        var notes = [];
        var length = dados.length;
        for (var i = 0; i < length; i++) {
            var new_note = dados[i];
            notes.push(new_note);
        }
        return notes;
    };
    TodoLocalStorage.prototype.setTodos = function (new_notes) {
        if (localStorage.getItem("todos") == null) {
            localStorage.setItem("todos", "[]");
            this.setContador(1);
        }
        localStorage.setItem("todos", new_notes);
    };
    TodoLocalStorage.prototype.getContador = function () {
        if (localStorage.getItem("todo-counter") == null) {
            localStorage.setItem("todo-counter", "1");
        }
        return parseInt(localStorage.getItem("todo-counter"));
    };
    TodoLocalStorage.prototype.setContador = function (id) {
        if (localStorage.getItem("todo-counter") == null) {
            localStorage.setItem("todo-counter", "1");
        }
        localStorage.setItem("todo-counter", id.toString());
    };
    TodoLocalStorage.prototype.add = function (new_todo) {
        var notes = this.getTodos();
        var id = this.getContador();
        new_todo.id = id;
        notes.push(new_todo);
        // set datas
        this.setTodos(JSON.stringify(notes));
        this.setContador(id + 1);
        TXT_TODO.value = "";
    };
    TodoLocalStorage.prototype.fetchAll = function () {
        return this.getTodos();
    };
    TodoLocalStorage.prototype.getById = function (id) {
        var todos = this.getTodos();
        var length = todos.length;
        for (var i = 0; i < length; i++) {
            if (todos[i].id == id) {
                return todos[i];
            }
        }
        return null;
    };
    TodoLocalStorage.prototype.update = function (note_update) {
        var todos = this.getTodos();
        var length = todos.length;
        for (var i = 0; i < length; i++) {
            if (todos[i].id == note_update.id) {
                todos[i] = note_update;
                this.setTodos(JSON.stringify(todos));
                break;
            }
        }
    };
    TodoLocalStorage.prototype.deleteById = function (id) {
        var todos = JSON.parse(localStorage.getItem("todos"));
        var length = todos.length;
        for (var i = 0; i < length; i++) {
            if (todos[i]["id"] == id) {
                todos.splice(i, 1);
                break;
            }
        }
        this.setTodos(JSON.stringify(todos));
    };
    TodoLocalStorage.prototype.clear = function () {
        localStorage.clear();
    };
    return TodoLocalStorage;
}());

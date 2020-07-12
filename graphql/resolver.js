const Todo = require('../modules/todo')

module.exports = {
    async getTodos (){ 
        try {
            return await Todo.find()
        } catch (err) {
            console.log("Error: ", err)
            throw new Error(err)
        }
    },

    async addTodo({todo: {title}}){
        try {
            const todo = new Todo({title})
            await todo.save()
            return todo
        } catch(e) {
            throw new Error("Title is not corect")
        }
    },
    async completeTodo({id}){
        try{
            const todo = await Todo.findById(id)
            todo.done = !todo.done
            todo.updateDate = Date.now()
            await todo.save()
            return todo
        } catch(err) {
            throw new Error("ID is not corect")
        }
    },
    async removeTodo({id}){
        try {
            const todo = await Todo.deleteOne({_id: id})
            console.log("todo", todo)
            return {id}
        } catch(e) {
            throw new Error("ID is not corect")
        }
    }
}
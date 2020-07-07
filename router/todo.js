const { Router } = require('express')
const Todo = require('../modules/todo')
const router = Router()

// get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.status(200).json(todos)
    } catch(e) {
        console.log("ERROR Create Todo: ", e)
        res.status(500).json({
            message: "Server error!"
        })
    }
})

// create new todos
router.post('/', async (req, res) => {
    try {
        const { title } = req.body
        const course = new Todo({title})
        await course.save()
        res.status(201).json(course)
    } catch(e) {
        console.log("ERROR Create Todo: ", e)
        res.status(500).json({
            message: "Server error!"
        })
    }
})

// update new todos
router.put('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const todo = await Todo.findById(id)
        todo.done = !todo.done
        todo.updateDate = Date.now()
        await todo.save()
        res.status(201).json(todo)
    } catch(e) {
        console.log("ERROR Create Todo: ", e)
        res.status(500).json({
            message: "Server error!"
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id: _id } = req.params
        const todo = await Todo.deleteOne({_id})
        res.status(200).json(_id)
    } catch(e) {
        console.log("ERROR Create Todo: ", e)
        res.status(500).json({
            message: "Server error!"
        })
    }
})

module.exports = router
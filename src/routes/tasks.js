const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

/**
 * @swagger
 * /tasks:
 *    tags:
 *    get:
 *      description: Use to return all tasks
 *    responses:
 *      '200':
 *        description: Successfully requested all tasks
 */
router.get('/tasks', async (req, res) =>{
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/tasks', async (req, res) =>{
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', async (req, res) =>{
    try {
        const _id = req.params.id
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send(error)
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
   
})

router.put('/tasks/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["description", "completed"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Campos não podem ser atualizados'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        if(!task){
            return res.status(404).send(error)
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


router.delete('/tasks/:id', async (req, res) =>{
    try {
        const _id = req.params.id
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send(error)
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
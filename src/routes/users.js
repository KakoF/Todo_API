const express = require('express')
const User = require('../models/user')

const router = new express.Router()

/**
 * @swagger
 * /users:
 *    get:
 *      description: Use to return all users
 *    responses:
 *      '200':
 *        description: Successfully requested all users
 */
router.get('/users', async (req, res) =>{
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users', async (req, res) =>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/users/:id', async (req, res) =>{
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send(error)
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
   
})

router.put('/users/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Campos não podem ser atualizados'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        if(!user){
            return res.status(404).send(error)
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})


router.delete('/users/:id', async (req, res) =>{
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send(error)
        }
        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router
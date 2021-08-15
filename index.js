require('dotenv').config()
const express = require('express')
const cors = require('cors')
const DBConnect = require('./connection')
const User = require('./user')
app = express()
app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    const user = await User.find()
    return res.json(user)
})
app.get('/:id', async (req, res) => {
    const user = await User.find({ _id: req.params.id })
    return res.json(user)
})

app.post('/', async (req, res) => {
    const { newUser } = req.body;
    const user = await User.create(newUser)
    return res.json(user)
})
app.put('/:id', async (req, res) => {
    const { newUser } = req.body;
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, {
        $set: newUser
    }, {
        new: true
    })
    return res.json(user)
})

app.delete('/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    return res.json({ message: "User Deleted" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    DBConnect()
        .then(() => console.log('server started on PORT : '+PORT))
        .catch(() => console.log('server error'))
})
const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(body.password, salt);


  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  if (body.password.length <= 3) {
    return response.status(400).json({ error: 'paswword length must be more then 3 symbols' })
  }

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
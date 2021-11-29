const mongoose = require('mongoose')

mongoose
	.connect('mongodb://78.224.134.194:27017/fint-tchat', { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(e => {
		console.error('Connection error', e.message)
	})

const db = mongoose.connection

module.exports = db

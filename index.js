const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// old script
const io = require("socket.io")(5000, {
	cors: {
		origin: "http://localhost:8000"
	}
});

io.on('connection', socket => {
	const id = socket.handshake.query.id
	socket.join(id)

	 // recipients, channelId, sender, date, text
	socket.on('send-message', ({ recipients, channelId, sender, date, text }) => {
		recipients.forEach(recipient => {
			socket.broadcast.to(recipient.id).emit('receive-message', {
				channelId, sender, date, text
			})
		})
	})

	socket.on('disconnect', () => {
		socket.broadcast.emit('user-disconnected', id)
	})
})
// old script

const db = require('./db')
const userRouter = require('./routes/user-router')
const channelRouter = require('./routes/channel-router')
const fileRouter = require('./routes/file-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/api', userRouter)
app.use('/api', channelRouter)
app.use('/api', fileRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))

import express from'express'
import cors from'cors'
import redis from'redis'

const PORT = 3002
const CHANNEL = 'testChannel'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const publisher = redis.createClient()

publisher.on('connect', () => {
	console.log('Publisher Connected!');
})

app.get('/pub', (req, res) => {
	console.log('gonna publish');
	publisher.publish('test', 'text')
	res.json('server /pub')
})

app.post('/publish', (req, res) => {
	const { body } = req
	console.log('gonna publish from post', body);
	publisher.publish('test', JSON.stringify(body))
	res.json('server /pub')
})

app.listen(PORT, async () => {
	console.log(`Server has been started on port ${PORT}`)
	await publisher.connect()
})
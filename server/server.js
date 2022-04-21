/* eslint-disable no-unexpected-multiline */
const express = require('express')
const cors = require('cors')
const redis = require('redis')
const db = {
	products: {
		desktops: [
			{
				id: 1,
				name: 'Lenovo'
			},
			{
				id: 2,
				name: 'HP'
			}
		],
		laptops: [
			{
				id: 1,
				name: 'Dell'
			},
			{
				id: 2,
				name: 'Lenovo'
			}
		],
		tablets: [
			{
				id: 1,
				name: 'iPad'
			},
			{
				id: 2,
				name: 'Samsung'
			}
		]
	}
}


const PORT = 4242
const app = express()

app.use(cors())

const publisher = redis.createClient()

app.get('/', (req, res) => {
	publisher.publish('test', 'hello from publisher')
	res.json({
		'hello': 'test'
	})
})

app.get('/goods', (req, res) => {
	const { products } = db
	// publisher.publish('test', 'hello from publisher')
	res.json({products})	
})

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})
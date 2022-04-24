import express from 'express'
import cors from 'cors'
import redis from 'redis'
import { WebSocketServer } from 'ws'


const PORT = 3001
const CHANNEL = 'testChannel'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const client = redis.createClient()
client.connect()

let isWsConnected = false;

app.get('/all/:category', async (req, res) => {
    const { category } = req.params
    const data = await client.lRange(category, 0, -1)
    res.json(data.map(record => JSON.parse(record)))
})

const server = new WebSocketServer({ port: 3003 });

server.on('connection', async (socket) => {
    console.log('ws client connected...');
    // isWsConnected = false

    // send a message to the client
    socket.send(JSON.stringify({
        message: 'handshake from server'
    }))

    await subscribe(socket)
});

app.listen(PORT, async () => {
    console.log(`Server has been started on port ${PORT}`)
})

async function subscribe(socket) {
    const subscriber = redis.createClient()

    subscriber.on('connect', () => {
        console.log('Subscriber Connected!');
    })

    if (!isWsConnected) {
        await subscriber.connect()
        
        await subscriber.subscribe('test', async (message) => {
            console.log('subscriber gets: ', message);
            const data = JSON.parse(message)
            data.id = Date.now()
            const wsResponse = {
                newArticle: true,
                data,
            }
            await saveInRedis(data.category, JSON.stringify(data))
            socket.send(JSON.stringify(wsResponse))
        })

        isWsConnected = !isWsConnected
    }
}

async function saveInRedis(category, content) {
    client.rPush(category, content)
}
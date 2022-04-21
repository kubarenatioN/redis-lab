import '../styles/main.css'
import redis from 'redis'

// const subscriber = redis.createClient()
// subscriber.connect();

(async () => {
	const client = redis.createClient();
  
	client.on('error', (err) => console.log('Redis Client Error', err));
  
	// await client.connect();
  
	// await client.set('key', 'value');
	// const value = await client.get('key');
	// console.log(value);
})()

get('goods')
	.then(data => {
		console.log('get data: ', data);
	})
	.catch(err => {
		console.error('get data error: ', err);
	})

async function getData() {
	const res = await fetch('http://localhost:4242', {
		headers: {
			'Content-Type': 'application/json',
		}
	})
	const data = await res.json()
	return data
}

async function get(route) {
	const res = await fetch(`http://localhost:4242/${route}`, {
		headers: {
			'Content-Type': 'application/json',
		}
	})
	const data = await res.json()
	return data
}
const WS = new WebSocket('ws://localhost:3003/')

const categorySelect = document.getElementById('category-select')
const contentList = document.getElementById('content')

categorySelect.addEventListener('change', (e) => {
	currentCategory = categorySelect.value
	getAllArticles(currentCategory)
})

let currentCategory = 'desktops' 

WS.addEventListener('open', () => { })

WS.addEventListener('message', ({data}) => {
	const packet = JSON.parse(data);

	console.log('received from server', packet);
	getAllArticles(currentCategory)
})

async function getAllArticles(category) {
	return fetch(`http://localhost:3001/all/${category}`)
		.then(res => res.json())
		.then(articles => {
			return createList(articles)
		})
		.catch(err => console.error('getAllArticles Error:', err))
}

// getAllArticles('desktops')
	

function createList(data) {
	console.log(data);
	let content = ''
	data.forEach(a => {
		content += createArticle(a)
	})
	contentList.innerHTML = content
	// console.log(data);
}

function createArticle(article) {
	const { category, title, descr, id } = article
	return `
	<div class="article ${category}">
		<span class="category">Category: ${category}</span>
		<p class="title">${title}</p>
		<p class="text">${descr}</p>
		<span class="timestamp">${new Date(id).toLocaleDateString()}</span>
	</div>
	`
} 
const form = document.getElementById('form')
const sendBtn = document.getElementById('send-btn')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const formData = new FormData(form)
    const mapping = {}
    for (const key of formData.keys()) {
        mapping[key] = formData.get(key)
    }

    publish(mapping)
    form.reset()
})

async function publish(data) {
    fetch('http://localhost:3002/publish', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
} 


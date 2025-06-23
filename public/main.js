//alert('Hello')
console.log('console du navigateur')

const $contactForm = document.querySelector("#contactForm")
    
$contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    let data = new FormData($contactForm)
    data = Object.fromEntries(data.entries())
    console.log(data)
    try {
        const resp = await fetch('/api/contact', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await resp.json()
        console.log(result)
    }
    catch(err) {
        console.error('Erreur : ', err)
    }
})




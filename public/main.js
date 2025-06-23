//alert('Hello')
console.log('console du navigateur')
document.addEventListener('DOMContentLoaded', () => {
const $contactForm = document.querySelector("#contactForm")
console.log($contactForm)

if($contactForm) {
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
}

const $listing = document.querySelector('.listing')

if($listing) {
    fetch("/api/listing")
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)
        resp.messages.forEach(item => {
            $listing.innerHTML += `<li>${item.name} - ${item.email}br<p>${item.message}</p>`
        })
    })
    
    .catch(err => console.log(err))
}

})
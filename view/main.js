document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault()

    const name = document.querySelector('#name').value
    const price = document.querySelector('#price').value
    const desc = document.querySelector('#desc').value

    if(name == '' || price === '' || desc === '') {
        alert('Enter the deatils carefully!')
    } else {
        const productObject = {
            name: name,
            price: price,
            description: desc
        }
        
        console.log(productObject)

        // Posting the data from the form to the API
        const xhr = new XMLHttpRequest()
        const url = 'http://localhost:5000/products'

        xhr.open('POST', url)

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = () => {
            if(xhr.status === 201 && xhr.readyState === 4) {
                response = JSON.parse(xhr.responseText)
                console.log(response)

            }
        }
        xhr.send(JSON.stringify(productObject))
    }
})
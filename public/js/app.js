console.log('Client side javascript file is loaded!')

//  Grabbing the form data
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()  //  prevents it from auto refreshing

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //  async call that is similar to request in node
    //  This takes the info from the api and puts it in Client-Side JS
    fetch('/weather?address=' + location).then((response) => {

        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else{               
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.summary
                console.log(data.location)
                console.log(data.forecast)
            }

        })

    })
})


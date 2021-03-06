console.log('JS file')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  const address = search.value
  const uri = '/weather?address=' + address
  if(address) {
    fetch(uri).then((response)=> {
      response.json().then((data) => {
        if(data.error) {
          messageOne.textContent = data.error 
        } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
      })
    })
  } else {
    messageOne.textContent = ''
    messageTwo.textContent = 'Please enter the location'
  }
})

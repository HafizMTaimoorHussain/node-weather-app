const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loading = document.querySelector('#loading')
const loct = document.querySelector('#loct')
const forecast = document.querySelector('#forecast')
const resultCard = document.querySelector('#weather-result-card')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    resultCard.style.display = 'none'
    loading.textContent = 'Loading...'
    
    const address = search.value
    if(!address || address === '') {
        resultCard.style.display = 'none' 
        loading.textContent = 'Please provide the location!'
        return false
    }
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        loading.textContent = null
        loct.textContent = data.location
        forecast.textContent = data.forecast
        resultCard.style.display = 'block'
    })
})
})
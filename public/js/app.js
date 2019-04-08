console.log("Client side javascript loaded");

fetch('http://puzzle.mead.io/puzzle').then((response = {}) =>{

    response.json().then((data)=>{
            console.log(data)
        })

}); 



const weatherForm = document.querySelector('form')
const search = document.querySelector('input'); 
const message1 =document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    const location = search.value; 
    message1.textContent = 'Loading...'
    fetch('/weather?address=' + location).then((response = {})=>{

    response.json().then((data) =>{
        if(data.error){
            message1.textContent = data.error
        } else{
            message1.textContent = data.givenlocation
            message2.textContent = data.forecastSummary
            message3.textContent = data.tempString
        }
    })
})
    
})
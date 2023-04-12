/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '9be5289b22fc43354205811eb8896e57';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


var countryCode= 'US'

document.getElementById('generate').addEventListener('click', getWeatherData);

async function getWeatherData() {
var zipCode = document.getElementById('zip').value;
var feel = document.getElementById('feelings').value;
    console.log(feel)
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=metric`
    ).then(async (response)=> {
        const data =  await response.json();
      console.log(data.main.temp)
        postData('/postData',{
            temperature: data.main.temp,
            date: newDate,
            feel: feel,
          })
    }).then((_)=>{
        retrieveData();
      })
   
    
    
  }

  const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(data)
    });
    try{
        const newData = await response.json();
        console.log(newData);
        return newData
    }catch(e){
      console.log('error', e);
    }
  }

  const retrieveData = async () =>{
    const request = await fetch('/getweather');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
    document.getElementById('content').innerHTML = allData.feel;
    document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
   }
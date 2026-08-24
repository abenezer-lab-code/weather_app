async function fetchWeather(longitude,latitude,tempUnit,windSpeedUnit,precipationUnit){

const results ={
data:null,
isLoading:true,
isError:false
}

const theWeek = ["Sun","Mon","Thue","Wed","Thu","fri","Sat"]
const date = new Date();

const dayOfTheWeek = date.getDay()
const pastDays = dayOfTheWeek;

const forecastDays = theWeek.length - dayOfTheWeek;


try{
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&daily=weather_code&daily=temperature_2m_max&daily=temperature_2m_min&longitude=${longitude}&hourly=weather_code&hourly=temperature_2m&hourly=relative_humidity_2m&hourly=precipitation&hourly=wind_speed_10m&temperature_unit=${tempUnit}&wind_speed_unit=${windSpeedUnit}&precipitation_unit=${precipationUnit}&current=temperature_2m&current=weather_code&current=precipitation&current=relative_humidity_2m&current=wind_speed_10m&past_days=${pastDays}&forecast_days=${forecastDays}`)
if(!res.ok){
  console.log("errorjj")
  results.isError = true
  return  results
}

results.data = await res.json();
console.log(results.data)

}
catch(error){
console.log(error)
results.isError = true;
}
finally{
results.isLoading = false
}

return results
}


const fetchLocation = async (name)=>{

const data = {
  countries:[],
  isFound:true
}
try{

const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`)
if(!res.ok){
  return
}
const datas = await res.json();
data.countries = datas;
console.log(data.countries)
}
catch(error){

console.log(error)
console.log("error")
data.isFound = false
}
return data

}
const getCurrentPositions = new Promise((resolve,reject)=>{

navigator.geolocation.getCurrentPosition(
  (position) => {
    resolve(position)
  },
  (error) => {
    console.error(`Error getting location: ${error.message}`);
    location.isError = true
    reject(error)
  }
);


})




export {fetchWeather,fetchLocation,getCurrentPositions} 
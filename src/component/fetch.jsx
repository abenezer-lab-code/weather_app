
import {useEffect,useState,createContext, useContext} from "react"
const DataContext = createContext()
export default function WeatherDataProvider({children}){
const[latitude,setLatitude] = useState(9.03)
const[longitude,setLongitude] = useState(38.74)
const[isLoading,setIsLoading] = useState(true);

const[country,setCountry] = useState("usa")

const[tempUnit,setTempUNit] = useState("c")
const[precipitationUnit,setPrecipitationUnit] = useState("");
const[windSpeedUnit,setWindSpeedUnit] = useState("")
const[isError,setIsError] = useState(false);
const[data,setData] = useState("")

useEffect(()=>{
const theWeek = ["Sun","Mon","Thue","Wed","Thu","fri","Sat"]
const date = new Date();

const dayOfTheWeek = date.getDay()
const pastDays = dayOfTheWeek;

const forecastDays = theWeek.length - dayOfTheWeek;

const fetchData = async ()=>{
try{
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&daily=weather_code&daily=temperature_2m_max&daily=temperature_2m_min&longitude=${longitude}&hourly=weather_code&hourly=temperature_2m&hourly=relative_humidity_2m&hourly=precipitation&hourly=wind_speed_10m&temperature_unit=fahrenheit&current=temperature_2m&current=weather_code&current=precipitation&current=relative_humidity_2m&current=wind_speed_10m&past_days=${pastDays}&forecast_days=${forecastDays}`)
if(!res.ok){
  console.log("error")
  return 
}

const data = await res.json();

setData(data)
}
catch(error){
console.log(error)
console.log("error")
setIsError(true)
}
finally{
  setIsLoading(false)
}

}

fetchData()

},[latitude])

return (
<DataContext.Provider value={{data,latitude,longitude,isLoading,isError,country,setLatitude,setLongitude,setCountry,setIsLoading}}>
  {children}
</DataContext.Provider>

)
}
export {DataContext,WeatherDataProvider}
import {useEffect,useState,createContext} from "react";
import {fetchLocation,fetchWeather} from "../service/fetch";
import useDebounce from "../toolkit/debouncer";
const DataContext = createContext();

const ProvideData = ({children})=>{
console.log("render")
const[latitude,setLatitude] = useState()
const[longitude,setLongitude] = useState()
const[isLoading,setIsLoading] = useState(true);
const [countries,setCountries] = useState([])
console.log(countries)
const[country,setCountry] = useState("")
const [isSrcLoading,setIsSrcLoading] = useState(true)
const[isSrcErr,setSrcErr] = useState(false)
console.log(isSrcLoading)
const[tempUnit,setTempUnit] = useState("celsius")
const[precipitationUnit,setPrecipitationUnit] = useState("inch");
const[windSpeedUnit,setWindSpeedUnit] = useState("mph")
const[isError,setIsError] = useState(false);
const[data,setData] = useState("")
const [usrCurrentIsLoading,setUsrCurrentIsLoading] = useState(true)
const name = useDebounce(country,1000)
const[selectedCountry,setSelectedCountry] = useState()
useEffect(()=>{
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

getCurrentPositions.then((result)=>{
    console.log(result)
    setLatitude(result.coords.latitude)
    setLongitude(result.coords.longitude)
})
.catch(err=>{
    console.log(err)
}).finally(()=>setUsrCurrentIsLoading(false))

},[])



useEffect(()=>{
  if(usrCurrentIsLoading){
console.log("waiting")
    return
}
  
function handleFetch(name){
const countries = fetchLocation(name)

countries.then((result)=>{
    
    setCountries(result.countries.results)

})
.catch((error)=> setSrcErr(error))
.finally(()=>setIsSrcLoading(false)
   )

}

handleFetch(name)
},[name])


useEffect(()=>{
if(usrCurrentIsLoading){
console.log("waiting")
    return
}

function  handleFetch(lats,longs,tempU,windUnit,preUnit){

const fetchedData = fetchWeather(lats,longs,tempU,windUnit,preUnit)
fetchedData.then((result)=>{

setData(result.data)
setIsError(result.isError)
setIsLoading(result.isLoading)
setSrcErr(result.isNamingError)

})

}

handleFetch(latitude,longitude,tempUnit,windSpeedUnit,precipitationUnit)


},[latitude,tempUnit,windSpeedUnit,precipitationUnit])
//console.log(data)
const datas = {
data,
isSrcErr,
isSrcLoading,
latitude,
longitude,
isLoading,
isError,
country,
countries,
tempUnit,
precipitationUnit,
windSpeedUnit,
selectedCountry,

setSelectedCountry,
setLatitude,
setLongitude,
setCountry,
setPrecipitationUnit,
setWindSpeedUnit,
setTempUnit,
setIsError,
setIsLoading,
setSrcErr
}

return (


<DataContext.Provider value={datas}>
    {children}
</DataContext.Provider>

)
}
export {DataContext,ProvideData}
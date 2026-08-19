import { useState,useEffect,useContext } from "react";
import { DataContext } from "./fetch";
import useDebounce from "../toolkit/debouncer";
const SearchBar = ()=>{
  
const {country,setCountry} = useContext(DataContext)

const {latitude,setLatitude} = useContext(DataContext)
const {longitude,setLongitude} = useContext(DataContext) 

const[resultSectionIsOpen,toggleResultSection] = useState(false)
const name = useDebounce(country,1000)
const [countries,setCountries] = useState([])
useEffect(()=>{
window.addEventListener("click",()=>{
toggleResultSection(false)  
})

},[])
useEffect(()=>{

const fetchLocation = async ()=>{
try{
const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`)
if(!res.ok){
  return
}
const data = await res.json();


setCountries(data.results || [])

}
catch(error){

console.log(error)
console.log("error")
}

}



fetchLocation()

},[name])



  return (
    <div className="relative">
    <form className="flex items-center sm:flex-row flex-col justify-center gap-3 mt-10" onSubmit = {(e)=>{e.preventDefault()}}>

<div className="flex items-center  px-5 ring-2  sm:w-md w-[90%] bg-[hsl(243_23%_24%)] rounded-md py-1 ">
 <img src=".\.\public\assets\images\icon-search.svg"/>
<input value={country} type="search" className="block  px-4 py-1 sm:w-md  focus:outline-none" placeholder="search for place..." onChange={(e)=>{
setCountry(e.target.value)
toggleResultSection(prev=>{
  if(countries.length>1){ 
  return true
}
})
}}/>
</div>
<button type="submit" className="block bg-[hsl(233_67%_56%)] sm:w-30 w-[90%] px-4 py-2 rounded-md cursor-pointer">Search</button>

    </form>
<div  hidden={!resultSectionIsOpen} id="result" aria-label="items for search result" className="z-1 absolute top-11 sm:left-[27%] left-[10%]  p-3 w-[36%] bg-[hsl(243_23%_24%)]">
{countries ? countries.map((country)=>{

return <button key = {country.id} className=" block mb-3 p-1 cursor-pointer" onClick={()=>{
setLatitude((pre)=>{return country.latitude})
setLongitude((pre)=>{return country.longitude})
 
 
}}>{country.name}</button>

}):""}
</div>

</div>
  )
}
export default SearchBar 

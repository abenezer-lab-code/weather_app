import { useState,useEffect,useContext } from "react";
import { DataContext} from "../store/context"
import searchIcon from "../assets/images/icon-search.svg"
const SearchBar = ()=>{
  const {isSrcErr,isSrcLoading,setIsSrcLoading,setSrcErr} = useContext(DataContext)
const {country,setCountry} = useContext(DataContext)

const {latitude,setLatitude} = useContext(DataContext)

const {longitude,setLongitude} = useContext(DataContext) 

const[resultSectionIsOpen,toggleResultSection] = useState(false)

const {selectedCountry,setSelectedCountry} = useContext(DataContext)
const {countries,setCountries} = useContext(DataContext)
useEffect(()=>{
window.addEventListener("click",()=>{
toggleResultSection(false)  
})

},[])


  return (
    <div className="relative">
    <form  className="flex items-center sm:flex-row flex-col justify-center gap-3 mt-10" onSubmit = {(e)=>{
      e.preventDefault()
      const selectedCountry = countries?.filter(e=>e.name.toLowerCase()===country.toLowerCase().trim())
      if(selectedCountry){
      setLatitude((pre)=>{return selectedCountry[0]?.latitude})
setLongitude((pre)=>{return selectedCountry[0]?.longitude})
setSelectedCountry((prev)=>selectedCountry[0]?.name) 
 console.log(selectedCountry);
      }
else{
  setSrcErr(true)
}
      }}>

<div className="flex items-center  px-5 ring-2  sm:w-md w-[90%] bg-[hsl(243_23%_24%)] rounded-md py-1 ">
 <img src={searchIcon}/>
<input value={country} type="search" className="block  px-4 py-1 sm:w-md  focus:outline-none" placeholder="search for place..." onChange={(e)=>{
setCountry(e.target.value)
toggleResultSection(true)

}}/>
</div>
<button type="submit" className="block bg-[hsl(233_67%_56%)] sm:w-30 w-[90%] px-4 py-2 rounded-md cursor-pointer">Search</button>

    </form>
<div hidden={!resultSectionIsOpen} id="result" aria-label="items for search result" className="z-1 absolute top-14 sm:left-[27%] left-[10%]  p-3 w-[36%] bg-[hsl(243_23%_24%)]">

{countries?.length >1? countries?.map((country)=>{

return <button key = {country.id} className=" block mb-3 p-1 cursor-pointer" onClick={()=>{
setLatitude((pre)=>{return country.latitude})
setLongitude((pre)=>{return country.longitude})
setSelectedCountry(country.name) 
 toggleResultSection(false)

}}>{country.name}</button>

}):"searching"}
</div>

</div>
  )
}
export default SearchBar 

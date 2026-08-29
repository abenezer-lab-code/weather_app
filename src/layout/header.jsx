import { useContext,useState } from "react";

import { DataContext } from "../store/context";
import logo from "../assets/images/logo.svg"
import iconUnit from "../assets/images/icon-units.svg"
import iconDropDown from "../assets/images/icon-dropdown.svg";
import iconMark from "../assets/images/icon-checkmark.svg"
const Header = ()=>{
const {setPrecipitationUnit,setWindSpeedUnit,setTempUnit} = useContext(DataContext)
const [isCelsius,setisCelicius] = useState(true)
const [isInch,setIsInch] = useState(true)
const [ismph,setIsMph] = useState(true)
const [toggle,setToggle] = useState(false)

return (

<header className="flex  items-center justify-between py-4 px-2 sm:px-14 gap-5 ">
<div>
  <img src={logo} alt="Weather now"/>
  
</div>

<div className="relative">
<button aria-controls="unit-setting" aria-expanded= {toggle} aria-label="choose unit" className="block flex gap-2 items-center bg-[hsl(243_27%_20%)] px-2 py-1 rounded-md justify-center" aria-haspopup onClick={()=>setToggle(!toggle)}> 
  <img src={iconUnit} alt="Weather now" className="block"/> units
   <img src={iconDropDown} className="block"/>
   </button>
<div hidden = {!toggle}id="unit-setting" className="z-2 rounded-md absolute -left-27 top-10 bg-[hsl(243_27%_20%)] grid gap-y-3 py-2 px-2 w-50" aria-label="user setting" >

<button className=" block text-left hover:ring-1 py-1 px-2 rounded-md cursor" onClick={()=>{
  setisCelicius(true)
  setIsInch(true)
  setIsMph(true)
  setPrecipitationUnit("inch")
  setWindSpeedUnit("mph")
  setTempUnit("celsius")

}}>switch to imperial</button>

<div aria-labelledby="tempreture-text " className="flex flex-col gap-6 border-b border-b-gray-400">
<p id="tempreture-text" className=" text-sm text-[hsl(250_6%_84%)]">Tempreture</p>
<button style={{backgroundColor:isCelsius?"hsl(243,23%,24%)":"hsl(243, 27%, 20%)"}} className="block text-left p-1 rounded" aria-checked onClick={()=>{
  setTempUnit("celsius")
setisCelicius(true)
}}><span className=" mr-1">Celsius</span>(<sup>o</sup>C)<img hidden={!isCelsius} src={iconMark} aria-hidden className="inline ml-19"/></button>
<button style={{backgroundColor:!isCelsius?"hsl(243,23%,24%)":"hsl(243, 27%, 20%)"}} className="block text-left mb-2 p-1 rounded" onClick={()=>{
  setTempUnit("fahrenheit")
  setisCelicius(false)
  }}>Fahrenheit<img hidden={isCelsius} src={iconMark} aria-hidden className="inline ml-9"/></button>
</div>
<div aria-labelledby="windspeed-text" className="flex flex-col gap-6 border-b border-b-gray-400">
  <p id="windspeed-text" className="text-[hsl(250_6%_84%)] text-sm">Wind speed</p>

  <button style={{backgroundColor:!ismph?"hsl(243,23%,24%)":"hsl(243, 27%, 20%)"}} aria-checked className="block text-left p-1 rounded flex" onClick={()=>{
    
    setWindSpeedUnit("kmh")
setIsMph(false)
  }}>km/h <img hidden={ismph} src={iconMark} aria-hidden className="inline ml-30"/></button>
  <button style={{backgroundColor:ismph?"hsl(243,23%,24%)":"hsl(243, 27%, 20%)"}}  className="block text-left mb-2 p-1 rounded"  onClick={()=>{
    setWindSpeedUnit("mph")
    setIsMph(true)
    }}>mph<img hidden={!ismph} src={iconMark} aria-hidden className="inline ml-9" /></button>
</div>
<div aria-labelledby="percipitation-text" className="flex flex-col gap-6 ">
<p id="percipitation-text" className="text-[hsl(250_6%_84%)] text-sm">precipitation</p>
<button style={{backgroundColor:!isInch?"hsl(243,23%,24%)":"hsl(243, 27%, 20%)"}}  aria-checked className="flex block text-left  p-1 rounded "  onClick={()=>{
  setPrecipitationUnit("mm")
  setIsInch(false)
  }}><span>Millimeter(mm)</span><img hidden={isInch} src={iconMark} aria-hidden className="inline ml-9"/></button>
<button style={{backgroundColor:isInch?"hsl(243,23%,24%)":"hsl(243, 27%, 20%)"}}  className="block mb-2 text-left p-1 rounded" onClick={()=>{
  setPrecipitationUnit("inch")
  setIsInch(true)
  }}>inches<img hidden={!isInch} src={iconMark} aria-hidden className="inline ml-9" /></button>
</div>
</div>
</div>


</header>

)

}
export default Header
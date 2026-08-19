
const Header = ()=>{

return (

<header className="flex  items-center justify-between py-4 px-2 sm:px-14 gap-5 ">
<div>
  <img src='.\.\public\assets\images\logo.svg' alt="Weather now"/>
</div>

<div className="relative">
<button aria-controls="unit-setting" aria-expanded="false" aria-label="choose unit" className="block flex gap-2 items-center bg-[hsl(243_27%_20%)] px-2 py-1 rounded-md justify-center" aria-haspopup> 
  <img src='.\public\assets\images\icon-units.svg' alt="Weather now" className="block"/> units
   <img src=".\public\assets\images\icon-dropdown.svg" className="block"/>
   </button>
<div hidden id="unit-setting" className=" rounded-md absolute -left-27 top-10 bg-[hsl(243_27%_20%)] grid gap-y-3 py-2 px-2 w-50" aria-label="user setting" >

<button className=" block text-left hover:ring-1 py-1 px-2 rounded-md cursor">switch to imperial</button>

<div aria-labelledby="tempreture-text " className="flex flex-col gap-6 border-b border-b-gray-400">
<p id="tempreture-text" className=" text-sm text-[hsl(250_6%_84%)]">Tempreture</p>
<button className="block text-left bg-[hsl(243_23%_24%)] p-1 rounded" aria-checked ><span className=" mr-1">Celsius</span>(<sup>o</sup>C)<img src=".\public\assets\images\icon-checkmark.svg" aria-hidden className="inline ml-19"/></button>
<button className="block text-left mb-2 p-1 rounded" >Farhrenheit<img src=".\public\assets\images\icon-checkmark.svg" aria-hidden className="inline ml-9" hidden/></button>
</div>
<div aria-labelledby="windspeed-text" className="flex flex-col gap-6 border-b border-b-gray-400">
  <p id="windspeed-text" className="text-[hsl(250_6%_84%)] text-sm">Wind speed</p>

  <button aria-checked className="block text-left bg-[hsl(243_23%_24%)] p-1 rounded">km/h <img src=".\public\assets\images\icon-checkmark.svg" aria-hidden className="inline ml-30"/></button>
  <button className="block text-left mb-2 p-1 rounded">mph<img src=".\public\assets\images\icon-checkmark.svg" aria-hidden className="inline ml-9" hidden/></button>
</div>
<div aria-labelledby="percipitation-text" className="flex flex-col gap-6 ">
<p id="percipitation-text" className="text-[hsl(250_6%_84%)] text-sm">percipitation</p>
<button aria-checked className="block text-left bg-[hsl(243_23%_24%)] p-1 rounded ">Millimeteres(mm)<img src=".\public\assets\images\icon-checkmark.svg" aria-hidden className="inline ml-9"/></button>
<button className="block mb-2 text-left p-1 rounded">inches<img src=".\public\assets\images\icon-checkmark.svg" aria-hidden className="inline ml-9" hidden/></button>
</div>
</div>
</div>


</header>

)

}
export default Header
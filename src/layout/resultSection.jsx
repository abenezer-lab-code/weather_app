import { useContext, useState } from "react";
import { getWeatherImage } from "../toolkit/weathericon"
import { DataContext } from "../store/context";
import iconDrop from "../assets/images/icon-dropdown.svg";
import iconLoading from "../assets/images/icon-loading.svg"
import bigBackground from "../assets/images/bg-today-large.svg";
import smallBackground from "../assets/images/bg-today-small.svg";
export default function Result(){
const {country,setCountry} = useContext(DataContext)
const {isLoading,setIsLoading,isError} = useContext(DataContext)
const {data,setData} = useContext(DataContext)
const {isSrcErr} = useContext(DataContext)
if(isSrcErr){
  return <h1 className="text-center text-2xl mt-6">No Search Result found!</h1>
}

return (
<div className=" mx-3 my-5 px-4 grid gap-x-3 gap-y-2 sm:grid-cols-[2fr_1fr] sm:grid-rows-[minmax(10rem,19rem)_minmax(10rem,15rem)_minmax(10rem,14rem)] ">

<CurrentWeatherDisplay datas = {data}/>
<HourlyForeCast datas={data}/>
<DetailWeather datas = {data} currentCountry={country}/>
<DailyForeCast datas={data}/>

</div>


    )
}

const CurrentWeatherDisplay  = ({datas,currentCountry})=>{
  const {isLoading} = useContext(DataContext)
let imageSrc = getWeatherImage(datas?.current?.weather_code)
const time = String(new Date(datas?.current?.time))
const {setSelectedCountry,selectedCountry} = useContext(DataContext)

return (

 <div style={{background: isLoading &&"hsl(243, 27%, 20%)"}}  className={`p-5 grid items-center mb-2 rounded-2xl sm:bg-[url(${bigBackground})] bg-[url(${smallBackground})]  bg-no-repeat bg-cover`}>
<div className="text-center">
<img hidden = {!isLoading} src={iconLoading} alt="Weather now" className="block w-17 m-auto"/> <span hidden={!isLoading}>Loading ...</span>
<p className="text-2xl mb-2">{selectedCountry}</p>
<p className="text-[hsl(250_6%_84%)] text-md mb-3">{ !isLoading && time.slice(0,16)}</p>
</div>
<div className="flex items-center justify-center">
  <img src={imageSrc} className="block w-35 sm:w-30"/>
    <p className="text-[clamp(3rem,9vw,12rem)]"> {datas?.current?.temperature_2m} <sup>o</sup></p>
</div>
  </div>
)

}

const DetailWeather = ({datas})=>{
const array = ["feels like","Humidity","Wind","Precipitation"]
const {isLoading} = useContext(DataContext)

if(isLoading){
return <div  className="p-3 flex flex-wrap gap-2 justify-around mb-10">
{
   array.map((e)=>{

  return < DetailWeatherCard key={e}  data = {e}/>
  
      })
}
</div>
}
  const values = datas ? Object?.entries(datas?.current):[]
values.splice(3,1)
const units = Object.values(datas?.current_units)
units.splice(0,2)
units.splice(1,1)

return (

  <div className="p-3 flex flex-wrap gap-2 justify-between">
  { values?.slice(2)?.map((e,index)=>{

  return < DetailWeatherCard key={e[0]}  data = {e} unit = {units[index]}/>
  
      })}
  </div>
)


}

const DetailWeatherCard = ({data,unit})=>{
const {isLoading} = useContext(DataContext)
  
if(isLoading){
  return (
    <div className="bg-[hsl(243_27%_20%)] px-2 py-4 rounded-md w-40 h-27 sm:h-30">
  <h4 className="text-[hsl(250_6%_84%)]">{data}</h4>
  <p className="m-auto text-center">-</p>
</div>
  )
}
let names = ""
if(data[0].includes("temp")){
names = "Feels like"
}
if(data[0].includes("preci")){
  names="Precipitation"
}
if(data[0].includes("relative")){
  names = "Humidity"
}
if(data[0].includes("wind")){
  names="Wind"
}

return (
<div className="bg-[hsl(243_27%_20%)] px-2 py-4 rounded-md w-40 h-27 sm:h-30">
  <h4 className="text-[hsl(250_6%_84%)]">{names}</h4>
  <p className="mt-4 text-3xl">{data[1]} {unit}</p>
</div>
)

}


const DailyForeCast = ({datas})=>{
const {isLoading} = useContext(DataContext)
  const theWeek = ["Sun","Mon","Thue","Wed","Thu","fri","Sat"]
if(isLoading){
return (
  <section className=" flex gap-6 center justify-around sm:col-start-1">
{
theWeek.map((e,index)=>{
  return ( 
<article className=" bg-[hsl(243_27%_20%)] p-4 rounded-md flex flex-col items-center h-40 w-8" key={`{${e}-${index}}`}>

</article>
  )
})

}
</section>
)
}

const dailyMaxWeather = datas?.daily?.temperature_2m_max;
const dailyMinWeaterh = datas?.daily?.temperature_2m_min;
const dailyWeatherCode = datas?.daily?.weather_code
return (
  <section className=" sm:my-10 my:19 col-start-1">
    <h3 className="text-bold text-md mb-2">Daily foreCast</h3>
    <div className="flex flex-wrap gap-3 justify-between">
    {
      dailyMaxWeather?.map((e,index)=>{
const weathecode = getWeatherImage(dailyWeatherCode[index])
     

  return (  <article className=" w-24 bg-[hsl(243_27%_20%)] p-1 rounded-md  flex flex-col items-center" key={`{${e}-${index}}`}>
<div className="grid grid-column-1 grid-row-2 ">
<p className="text-center">{theWeek[index]}</p>
<img className="block w-19" src={weathecode} aria-hidden/>
</div>
<div className="flex gap-2 mx-auto items-center">
<p className="">{e}</p>
<p>{dailyMinWeaterh[index]}</p>
<p></p>
</div>

    </article>)

     })
}
</div>
  </section>
)

}
const HourlyForeCast = ({datas})=>{
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const [expanded,setExpanded] = useState(true)
const date = new Date();

const dayOfTheWeek = date.getDay()

const dayInISOSString = date.toISOString().slice(0,10)
const[requestedDate,setRequestedDate] = useState(dayInISOSString);



const [today,setToday] = useState(days[dayOfTheWeek])
const {isLoading} = useContext(DataContext)

if(isLoading){
return (
<section className="bg-[hsl(243_27%_20%)] p-6 rounded-xl">
  <div className="flex justify-between mb-4 relative">
  <h3>Hourly forecast</h3>
  <button type="button" aria-controls="days-control"  aria-label="choose day you want to see"  className="bg-[hsl(243_23%_30%)] px-3 py-1 rounded-md flex items-center gap-2">
  <span className="block">{today}</span> <img aria-hidden="true" src=".\assets\images\icon-dropdown.svg" />
  </button>
 
  </div>
{
  days.map((e)=>{

return <HourlyForeCastCard  key={e} />
  })
}
</section>

 
)

}


const time = datas?.hourly?.time.filter(e=>{
  return e.includes(requestedDate)
}).slice(2,10);
const firstIndex = datas?.hourly?.time.indexOf(time[0])

const lastIndex = datas?.hourly?.time.indexOf(time[time.length-1])
const weatherCode = datas?.hourly?.weather_code.slice(firstIndex,lastIndex+1)
const temperature = datas?.hourly?.temperature_2m.slice(firstIndex,lastIndex+1)


return (
<section className="bg-[hsl(243_27%_20%)]  sm:row-start-1 sm:row-end-4 sm:col-start-2 p-6 rounded-xl">
  <div className="flex justify-between mb-4 relative">
  <h3>Hourly forecast</h3>
  <button type="button" aria-controls="days-control" aria-expanded={!expanded} aria-label="choose day you want to see"  className="bg-[hsl(243_23%_30%)] px-3 py-1 rounded-md flex items-center gap-2" onClick={()=>{
  
    setExpanded(!expanded)
  }}>
  <span className="block">{today}</span> <img aria-hidden="true" src={iconDrop} />
  </button>
  <div hidden={expanded} className="absolute bg-[hsl(243_23%_24%)] right-0 top-9 rounded-xl" id="days-control">

   {
     days?.map((day)=>{
   return <button key={day}
    className=" block text-left  py-3 pl-3 rounded-md cursor-pointer mb-1 w-50" onClick={()=>{
  setToday(day)
      setRequestedDate(()=>{
const indexOfTheDay = days.indexOf(day);

const todayIndex = dayOfTheWeek;

const difference = indexOfTheDay - todayIndex;

const tdate = new Date()
 tdate.setDate( tdate.getDate() + (difference))

return  tdate.toISOString().slice(1,10)
      })
    }}
    >{day}</button>
  })
   }


  </div>
  </div>
{
  time?.map((e,index)=>{
const dateInHour = new Date(e).getHours()
//console.log(weatherCode?.current?.weather_code)
let imageSrc = getWeatherImage(weatherCode[index])

    return <HourlyForeCastCard hour = {dateInHour} temp={temperature[index]} key={e} weatercode={imageSrc} />
  })

}
  <div>


  </div>
</section>

)

}

const HourlyForeCastCard = ({hour,temp,weatercode})=>{
const {isLoading} = useContext(DataContext)

return (

  <article className="ring bg-[hsl(243_27%_20%)] m-w-[90%] m-h-400 px-4 py-4 rounded-md flex justify-between items-center mb-2">
<div className="flex gap-3 items-center justify-center h-10">
  <img hidden={isLoading} src={weatercode} aria-hidden className="w-15"/>
<p>{ !isLoading && hour} { !isLoading && (hour >= 12 ? 'PM' : 'AM')}</p>
</div>

<p>{ !isLoading && temp}</p>
  </article>
)

}
import { useContext, useState } from "react";
import { getWeatherImage } from "./toolkit/weathericon";


import { DataContext } from "./fetch";
export default function Result(){
const {country,setCountry} = useContext(DataContext)
const {data,setData} = useContext(DataContext)

    return (
<div className="grid sm:grid-cols-[1fr_1fr_1fr]   grid-cols-1 grid-rows-[auto_auto_auto] mx-3 my-4 gap-x-6 sm:px-10">

<CurrentWeatherDisplay datas = {data}/>
<HourlyForeCast datas={data}/>
<DetailWeather datas = {data} currentCountry={country}/>
<DailyForeCast datas={data}/>

</div>


    )
}

const CurrentWeatherDisplay  = ({datas,currentCountry})=>{
  console.log(datas)
let imageSrc = getWeatherImage(datas?.current?.weather_code)
const time = String(new Date(datas?.current?.time))
console.log(currentCountry)
return (

 <div className=" p-5 grid col-start-1 col-end-3 row-start-1 row-end-2 grid-cols-1 sm:grid-cols-2 sm:h-60 sm:grid-rows-1 items-center mb-2 rounded-2xl bg-[url('.\.\public\assets\images\bg-today-small.svg')] sm:bg-[url('.\.\public\assets\images\bg-today-large.svg')] bg-no-repeat bg-cover">
<div className="text-center">
<p className="text-2xl mb-2">{currentCountry}</p>
<p className="text-[hsl(250_6%_84%)] text-md mb-3">{time.slice(0,16)}</p>
</div>
<div className="flex items-center justify-center">
  <img src={imageSrc} className="block w-35 sm:w-30"/>
<p className="text-7xl">{datas?.current?.temperature_2m}<sup>o</sup></p>
</div>
  </div>
)

}

const DetailWeather = ({datas})=>{
//console.log(datas)
  const values = datas ? Object?.entries(datas?.current):[]
values.splice(3,1)
return (

  <div className="ring p-3 flex flex-wrap gap-2 justify-around row-start-2 col-start-1 col-end-3 sm:h-40">
  {values.slice(2).map((e)=>{

  return < DetailWeatherCard key={e[0]}  data = {e}/>
  
      })}
  </div>
)


}

const DetailWeatherCard = ({data})=>{
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
  <p className="mt-4 text-3xl">{data[1]}</p>
</div>
)

}


const DailyForeCast = ({datas})=>{

  const theWeek = ["Sun","Mon","Thue","Wed","Thu","fri","Sat"]
const dailyMaxWeather = datas?.daily?.temperature_2m_max;
const dailyMinWeaterh = datas?.daily?.temperature_2m_min;
const dailyWeatherCode = datas?.daily?.weather_code
return (
  <section className=" row-start-3 col-start-1 col-end-3">
    <h3 className="text-bold text-md mb-2">Daily foreCast</h3>
    <div className="flex flex-wrap gap-3 justify-around">
    {
      dailyMaxWeather?.map((e,index)=>{
const weathecode = getWeatherImage(dailyWeatherCode[index])
     

  return (  <article className=" bg-[hsl(243_27%_20%)] p-4 rounded-md flex flex-col items-center" key={`{${e}-${index}}`}>
<div className="grid grid-column-1 grid-row-2 ">
<p className="text-center">{theWeek[index]}</p>
<img className="block w-19" src={weathecode} aria-hidden/>
</div>
<div className="flex">
<p className="text-center">{e}</p>
<p>{dailyMinWeaterh[index]}</p>
</div>

    </article>)

     })
}
</div>
  </section>
)

}
const HourlyForeCast = ({datas})=>{
console.log(datas)
const [expanded,setExpanded] = useState(true)
const date = new Date();

const dayOfTheWeek = date.getDay()

const dayInISOSString = date.toISOString().slice(0,10)


const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const [today,setToday] = useState(days[dayOfTheWeek])
const[requestedDate,setRequestedDate] = useState(dayInISOSString);

const time = datas?.hourly?.time.filter(e=>{
  return e.includes(requestedDate)
}).slice(2,10);
const firstIndex = datas?.hourly?.time.indexOf(time[0])

const lastIndex = datas?.hourly?.time.indexOf(time[time.length-1])
const weatherCode = datas?.hourly?.weather_code.slice(firstIndex,lastIndex+1)
const temperature = datas?.hourly?.temperature_2m.slice(firstIndex,lastIndex+1)
//console.log(temp);
//console.log(time);

return (
<section className="bg-[hsl(243_27%_20%)]  sm:row-start-1 sm:row-end-4 sm:col-start-3 sm:col-end-3 p-6 rounded-xl">
  <div className="flex justify-between mb-4 relative">
  <h3>Hourly forecast</h3>
  <button type="button" aria-controls="days-control" aria-expanded={!expanded} aria-label="choose day you want to see"  className="bg-[hsl(243_23%_30%)] px-3 py-1 rounded-md flex items-center gap-2" onClick={()=>{
  
    setExpanded(!expanded)
  }}>
  <span className="block">{today}</span> <img aria-hidden="true" src=".\.\public\assets\images\icon-dropdown.svg" />
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
console.log(weatherCode?.current?.weather_code)
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

return (

  <article className="ring bg-[hsl(243_27%_20%)] px-4 py-4 rounded-md flex justify-between items-center mb-2">
<div className="flex gap-3 items-center justify-center">
  <img src={weatercode} aria-hidden className="w-15"/>
<p>{hour} { hour >= 12 ? 'PM' : 'AM'}</p>
</div>

<p>{temp}</p>
  </article>
)

}
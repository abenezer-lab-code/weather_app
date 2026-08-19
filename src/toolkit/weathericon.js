import sunny from "/assets/images/icon-sunny.webp"
import rain from "/assets/images/icon-rain.webp"
import snow from "/assets/images/icon-snow.webp"
import drizzle from "/assets/images/icon-drizzle.webp"
import fog from "/assets/images/icon-fog.webp"
import overcast from "/assets/images/icon-overcast.webp"
import partlyCloud from "/assets/images/icon-partly-cloudy.webp"
import storm from "/assets/images/icon-storm.webp"
export function getWeatherImage(code){
    
if(code === 0){
    return sunny
}
if(code === 2 || code===1){
    return partlyCloud
}
if(code === 3){
    return overcast
}
if(code === 45 || code === 48){
    return fog
}
if(code=== 51 ||code=== 53 || code=== 55 || code=== 56 || code=== 57){
    return drizzle
}
if(code === 61 ||code=== 63 ||code=== 65 ||code=== 66 ||code=== 67) {
    return rain

}
if(code===71||code===73||code===75 ||code===75 ||code===77 ||code===80 ||code===71 ||code===82||code===81 ||code===85 ||code===86){
    return snow
}
if(code>90){
    return storm
}
}
import SearchBar from "./layout/search-bar";
import Header from "./layout/header";
import Result from "./layout/resultSection"
import { ProvideData } from "./store/context";
import { DataContext } from "./store/context";
import { useContext, useState } from "react";
import iconError from "./assets/images/icon-error.svg";

import iconRetry from "./assets/images/icon-retry";
function App() {

return (

  <>
  <ProvideData>

  <Header/>
  <Main/>
 </ProvideData>
  </>

)
}

const Main = ()=>{
 const {isError,setIsError} = useContext(DataContext)

const{isLoading,setIsLoading} = useContext(DataContext);

if(isError){

return (
<div className="mx-auto  flex flex-col justify-between items-center mt-5 gap-y-2">
<img hidden = {!isError} src={iconError} alt="Weather now" className="h-7 block w-17 m-auto"/> 
<h2 className="mb-4 text-3xl ">Something went Wrong</h2>
<p className="text-[hsl(240_6%_70%)]">We couldn't connect to the server(API error).please try Again in few moments.</p>
<button className="bg-[hsl(243_23%_30%)] mt-2 px-3 py-1 rounded-md flex items-center gap-2 block cursor-pointer" onClick={()=>{
  
 setIsLoading(true)
 window.location.reload()
  }}><img aria-hidden src={iconRetry}/><span>Retry</span></button>
</div>
)
}




return (
<main>
  <h2 className="text-4xl text-center font-[700] ">How's the sky looking today ?</h2>
<SearchBar/>
<Result/>

</main>

)

}



export default App

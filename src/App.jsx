import SearchBar from "./component/search-bar";
import Header from "./component/header";
import Result from "./component/resultSection";
import WeatherDataProvider from "./component/fetch";
function App() {

return (

  <>
  <Header/>
  <Main/>
 
  </>

)
}

const Main = ()=>{

return (
<main>
  <h2 className="text-4xl text-center font-[700] ">How's the sky looking today ?</h2>
<WeatherDataProvider> 
  <SearchBar/>
<Result/>
</WeatherDataProvider> 
</main>

)

}



export default App

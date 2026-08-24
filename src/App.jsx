import SearchBar from "./layout/search-bar";
import Header from "./layout/header";
import Result from "./layout/resultSection"
import { ProvideData } from "./store/context";
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

return (
<main>
  <h2 className="text-4xl text-center font-[700] ">How's the sky looking today ?</h2>
<SearchBar/>
<Result/>

</main>

)

}



export default App

import Navigation from "./component/navigation/Navigation"
import Searchbar from "./component/searchbar/searchbar"
import ResultLayout from "./Layout/resultLayout/resultLayout"
import Forms from "./component/Forms/Forms"
import { useSelector } from "react-redux"
import "./App.css"

function App() {
  const modal = useSelector((state) => state.modal)
  const showcase = useSelector((state) => state.showcase)
  // console.log(modal.modaltype)

  const getForms = () => { 
    switch (modal.modaltype) {
      case "login":
        return <Forms type="login" />
      case "signup":
        return <Forms type="signup" />
      case "edit":
        return <Forms type="edit" />
      default:
        return ""
   
    }
  }
  const getShowcase = () => {
    switch (showcase.showcase) {
      case 1:
        return <Searchbar />
      
      case 2:
        return <ResultLayout />
    
      default:
        return ""
       
    }
  }

  return (
    <div className="App">
      <Navigation />
      {getShowcase()}
      {getForms()}
    </div>
  )
}

export default App

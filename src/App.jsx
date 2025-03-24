import '../src/app.css'
import Options from "./components/features/Options"
import CreateGlobalItem from './components/features/Options/CreateGlobalItem'
import ShoppingList from './components/features/ShoppingList/ShoppingList'

function App() {

  return (
    <>
      <Options/>
      <ShoppingList/>
      <CreateGlobalItem/>
    </>
  )
}

export default App
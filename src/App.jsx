import '../src/app.css'
import Options from "./components/features/Options"
import CreateItemForm from "./components/features/ShoppingList/CreateItemForm"
import AddItemMenu from "./components/features/ShoppingList/AddItemMenu/AddItemMenu"
function App() {

  return (
    <>
      <Options/>
      <CreateItemForm/>
      <AddItemMenu/>
    </>
  )
}

export default App

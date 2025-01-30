import Options from "./components/features/Options"
import CreateItemForm from "./components/features/ShoppingList/CreateItemForm"
import AddItemMenu from "./components/features/ShoppingList/AddItemMenu/AddItemMenu"
import { CreateItemProvider } from "./context/CreateItemContext"
function App() {

  return (
    <>
      <Options/>
      <CreateItemProvider>
        <CreateItemForm/>
      </CreateItemProvider>
      <AddItemMenu/>
    </>
  )
}

export default App

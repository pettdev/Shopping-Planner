import { Button } from "../../../common"

const SaveList = () => {

  const saveListHandler = async (e) => {
    e.preventDefault()
    // TODO: Guardar lista en el backend
    alert("Lista guardada exitosamente")
  }

  return (
    <>
      <Button text="Guardar lista" onClick={(e) => saveListHandler(e)}/>
    </>
  )
}

export default SaveList
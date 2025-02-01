import { createContext, useContext, useState } from "react";

const CreateItemContext = createContext()

export const CreateItemProvider = ({children}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    selected_category: '',
    selected_unit: '',
    exempt:''
  })

  const updateFormData = (newFormData) => setFormData(newFormData)

  return (
    <CreateItemContext.Provider value={{formData, updateFormData}}>
      {children}
    </CreateItemContext.Provider>
  )
}

export const useCreatedItemContext = () => {
  const context = useContext(CreateItemContext)
  if(!context) throw new Error('useCreatedItemContext must be used within a CreateItemProvider component')
    return context
}
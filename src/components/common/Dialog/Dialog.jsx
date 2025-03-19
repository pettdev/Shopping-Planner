import { useRef, useEffect } from "react"
import './Dialog.css';

const Dialog = ({openState, children}) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    if(!dialogRef.current) return
    if(openState) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [openState])

  const toggleDialog = () => {
    if(!dialogRef.current) return
    openState(false)
  }
  return (
    <dialog ref={dialogRef} onClick={(e) => {if(e.currentTarget === e.target) toggleDialog()}}>
      <div className="close-button" onClick={toggleDialog}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
      {children}
    </dialog>
  )
}

export default Dialog
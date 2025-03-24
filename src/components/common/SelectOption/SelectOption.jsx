import './SelectOption.css'
import {Label} from ".."
import { useState, useRef, useEffect } from 'react'

const SelectOption = ({id, labelText, options, value, onChange, ...props}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(value || "")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const dropdownRef = useRef(null)
  const optionsRef = useRef([])

  // Actualizar el estado interno cuando cambia el valor externo
  useEffect(() => {
    setSelectedOption(value || "")
  }, [value])

  // Cerrar el dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    
    // Simular el evento onChange para mantener la compatibilidad con el componente original
    if (onChange) {
      const syntheticEvent = {
        target: { value: option }
      }
      onChange(syntheticEvent)
    }
  }

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault()
      setIsOpen(true)
      setHighlightedIndex(0)
      return
    }

    if (!isOpen) return

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        break
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < options.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : prev
        )
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          handleOptionClick(options[highlightedIndex])
        }
        break
      default:
        break
    }
  }

  // Scroll al elemento resaltado
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].scrollIntoView({
        block: 'nearest',
        inline: 'start'
      })
    }
  }, [highlightedIndex, isOpen])

  // Inicializar la referencia de opciones
  useEffect(() => {
    optionsRef.current = optionsRef.current.slice(0, options.length)
  }, [options])

  // Chevron down icon
  const chevronDownIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  )

  // Chevron up icon
  const chevronUpIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  )

  return (
    <Label htmlFor={id} labelText={labelText}>
      <div 
        className="select-option-container" 
        ref={dropdownRef}
        tabIndex="0"
        onKeyDown={handleKeyDown}
        {...props}
      >
        <div 
          className="select-option" 
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          id={id}
        >
          <span className="selected-text">
            {selectedOption || "Seleccionar opción"}
          </span>
          <span className="dropdown-arrow">{isOpen ? chevronUpIcon : chevronDownIcon}</span>
        </div>
        
        {isOpen && (
          <ul className="options-list" role="listbox">
            <li 
              className={`option ${"" === selectedOption ? 'selected' : ''} ${highlightedIndex === -1 ? 'highlighted' : ''}`}
              onClick={() => handleOptionClick("")}
              role="option"
              aria-selected={"" === selectedOption}
              ref={el => optionsRef.current[-1] = el}
              data-disabled
            >
              Seleccionar opción
            </li>
            {options.map((option, index) => (
              <li 
                key={option} 
                className={`option ${option === selectedOption ? 'selected' : ''} ${highlightedIndex === index ? 'highlighted' : ''}`}
                onClick={() => handleOptionClick(option)}
                role="option"
                aria-selected={option === selectedOption}
                ref={el => optionsRef.current[index] = el}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Label>
  )
}

export default SelectOption
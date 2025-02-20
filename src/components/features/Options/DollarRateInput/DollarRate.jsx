import './DollarRate.css'
import { useEffect, useState } from 'react'
import { useCurrency, useDollarRate } from '../../../../context'
import { Button, Input, SelectOption, ToggleSwitch } from '../../../common'
import { DecimalInputSanitizer } from '../../../../utils'
import currencies from '../../../../context/CurrencyContext/helpers/currencies'
import { getBCV, getParalelo } from '../../../../services/DollarRates/pyDolarVenezuelaAPI'

const DollarRate = () => {
  // React states
  const [isChecked, setIsChecked] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const [option, setOption] = useState('')
  const [manualValue, setManualValue] = useState('')
  const [showInputs, setShowInputs] = useState(true)

  // Custom context hooks
  const { rate, updateRate } = useDollarRate()
  const { currency, selectCurrency } = useCurrency()

  // Validar strings enfocados a valores decimales
  const validator = new DecimalInputSanitizer()

  // Moneda principal del componente
  const dollarCurrency = currencies.USD

  // Opciones para elegir la tasa en dólares
  const options = [
    { text: 'Escribir manualmente' },
    { text: 'BCV' },
    { text: 'Paralelo' }
  ]
  const optionTexts = options.map(option => option.text)
  const optionManual = options[0].text
  const optionBCV = options[1].text
  const optionParalelo = options[2].text

  // Consumo de API de dólares en tiempo real
  useEffect(() => {
    const fetchData = async () => {
      if (option === optionBCV) {
        try {
          const newRate = await getBCV()
          updateRate(newRate)
          selectDollarCurrency(newRate)
        } catch (error) {
          console.error('Algo salió mal al obtener BCV:', error)
        }
      } else if (option === optionParalelo) {
        try {
          const newRate = await getParalelo()
          updateRate(newRate)
          selectDollarCurrency(newRate)
        } catch (error) {
          console.error('Algo salió mal al obtener Paralelo:', error)
        }
      }
    }

    if (option) {
      fetchData()
    }
  }, [option])

  //Metodos reutilizables
  const renderManualInputs = (bool) => {
    setShowInputs(bool)
  }

  const toggleOnChange = (bool) => {
    setIsChecked(bool)
  }

  const selectDollarCurrency = (rate = 0) => {
    if (option === optionManual) {
      if (isApplied && manualValue >= 0.01) {
        if (isChecked && currency.code !== dollarCurrency.code) {
          selectCurrency(dollarCurrency)
        }
      }
    } else {
      if (rate >= 0.01) {
        if (isChecked && currency.code !== dollarCurrency.code) {
          selectCurrency(dollarCurrency)
        }
      }
    }
  }

  const manualValueHandler = (e) => {
    const value = e.target.value
    const sanitizedValue = validator.getSanitizedOf(value)
    setManualValue(sanitizedValue)
  }

  useEffect(() => {
    if(manualValue >= 0.01){
      updateRate(manualValue)
      selectDollarCurrency()
      renderManualInputs(false)
    }
    setIsApplied(false)
  },[isApplied])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setIsApplied(true)
  }
  
  const toggleClickHandler = () => {
    toggleOnChange(!isChecked)
  }

  const onSelectedChange = (e) => {
    const value = e.target.value
    setOption(value)
  }

  const editHandler = () => {
    renderManualInputs(true)
  }

  const cancelHandler = () => {
    renderManualInputs(false)
  }

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ToggleSwitch
          label="Usar dólares"
          onChange={toggleOnChange}
          onClick={toggleClickHandler}
        />
        {isChecked && showInputs && (
          <SelectOption
            value={option}
            options={optionTexts}
            onChange={e => onSelectedChange(e)}
          />
        )}
        {!showInputs && (isChecked && rate > 0.01) && (
          <Button text='Editar' onClick={editHandler} />
        )}
      </div>

      {showInputs && (isChecked && option === optionManual) && (
        <>
          <Input
            labelText="Tasa:"
            onChange={manualValueHandler}
            value={manualValue}/>
          <Button text="Aplicar" type="submit" />
          <Button text="Cancelar" onClick={cancelHandler} />
        </>
      )}

      {!showInputs && (isChecked && rate > 0.01) && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa personalizada.</div>
      )}

      {isChecked && option === optionBCV && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa Banco Central de Venezuela.</div>
      )}

      {isChecked && option === optionParalelo && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa EnParaleloVzla.</div>
      )}
    </form>
  )
};

export default DollarRate
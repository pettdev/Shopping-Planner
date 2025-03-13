import './DollarRate.css'
import { useEffect, useState } from 'react'
import { useCurrency, useDollarRate } from '../../../../context'
import { Button, Input, SelectOption, ToggleSwitch } from '../../../common'
import { DecimalInputSanitizer } from '../../../../utils'
import { getBCV, getParalelo } from '../../../../services/DollarRates/pyDolarVenezuelaAPI'
import { exchangeVESforUSD as exchanger } from '../../../../context/CurrencyContext/helpers/exchangeVESforUSD'


const DollarRate = () => {
  // React states
  const [isToggleON, setIsToggleON] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const [option, setOption] = useState('')
  const [manualRate, setManualRate] = useState('')
  const [showInputs, setShowInputs] = useState(true)
  // Custom context hooks
  const {rate, updateRate} = useDollarRate()
  const {currency, selectCurrency} = useCurrency()
  // Validar strings enfocados a valores decimales
  const validator = new DecimalInputSanitizer()
  // Moneda principal del componente
  const [bolivar, dollar] = exchanger.getPair()

  // Opciones para elegir la tasa en dólares
  const options = [
    {text: 'Tasa manual'},
    {text: 'BCV'},
    {text: 'Paralelo'}
  ]

  const optionTexts = options.map(option => option.text)
  const optionManual = options[0].text
  const optionBCV = options[1].text
  const optionParalelo = options[2].text

  // Consumo de API de dólares
  useEffect(() => {
    const fetchData = async () => {
      // Opcion BCV
      if (option === optionBCV) {
        try {
          const fetchedRate = await getBCV()
          updateRate(fetchedRate)
          selectDollarAsCurrency(fetchedRate)
        } catch (error) {
          console.error('Algo salió mal al obtener BCV:', error)
        }
      // Opcion Paralelo
      } else if (option === optionParalelo) {
        try {
          const fetchedRate = await getParalelo()
          updateRate(fetchedRate)
          selectDollarAsCurrency(fetchedRate)
        } catch (error) {
          console.error('Algo salió mal al obtener Paralelo:', error)
        }
      } 
    }
    // Si la opcion no es manual, se ejecuta la funcion fetchData
    if (option !== optionManual) {
      fetchData()
    } else {
      // Opcion Manual
      selectDollarAsCurrency(rate)
    }
  }, [option, rate])

  const renderManualInputs = (bool) => {
    setShowInputs(bool)
  }
 
  const selectDollarAsCurrency = (dollarRate) => {
    if (dollarRate > 1) {
      if (isToggleON && !currency.isEqualTo(dollar)) {
        selectCurrency(dollar)
      }
    }
  }

  const manualValueHandler = (e) => {
    const value = e.target.value
    setManualRate(validator.getSanitizedOf(value))
  }

  useEffect(() => {
    // Toggle OFF
    if (!isToggleON) {
      
      exchanger.convertQuoteToBase()
      console.log('Toggle apagado'.toUpperCase())
      // Cambiar a bolívares si la moneda actual es dólar
      if (currency.isEqualTo(dollar)) {
        selectCurrency(bolivar)
      }
    // Toggle ON
    } else {
      console.log('Toggle encendido'.toUpperCase())
      // Cambiar a dólares si la tasa es válida
      if (rate > 1) {
        exchanger.convertBaseToQuote()
        selectCurrency(dollar)
      }
    }
  }, [isToggleON, currency, dollar, bolivar, rate, selectCurrency])

  useEffect(() => {
    // Si la tasa manual es mayor a 0.01, se actualiza la tasa y se oculta el input
    if(manualRate >= 0.01){
      updateRate(manualRate)
      renderManualInputs(false)
    }
    setIsApplied(false)
  },[isApplied])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setIsApplied(true)
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
          checked={isToggleON}
          onChange={(checked) => setIsToggleON(checked)}
        />
        {isToggleON && showInputs && (
          <SelectOption
            value={option}
            options={optionTexts}
            onChange={e => onSelectedChange(e)}
          />
        )}
        {!showInputs && (isToggleON && rate > 0.01) && (
          <Button text='Editar' onClick={editHandler}/>
        )}
      </div>

      {showInputs && (isToggleON && option === optionManual) && (
        <>
          <Input
            labelText="Tasa:"
            onChange={manualValueHandler}
            value={manualRate}/>
          <Button text="Aplicar" type="submit" />
          <Button text="Cancelar" onClick={cancelHandler} />
        </>
      )}
      {/* Si la tasa es manual, se muestra el input para editarla */}
      {!showInputs && (isToggleON && rate > 0.01) && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa personalizada.</div>
      )}
      {/* Si la tasa es la del Banco Central de Venezuela, se muestra el mensaje */}
      {isToggleON && option === optionBCV && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa Banco Central de Venezuela.</div>
      )}
      {/* Si la tasa es la del paralelo, se muestra el mensaje */}
      {isToggleON && option === optionParalelo && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa EnParaleloVzla.</div>
      )}
    </form>
  )
}

export default DollarRate
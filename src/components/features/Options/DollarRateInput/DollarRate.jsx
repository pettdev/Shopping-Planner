import './DollarRate.css'
import { useEffect, useState } from 'react'
import { useCurrency, useDollarRate } from '../../../../context'
import { Button, Input, SelectOption, ToggleSwitch } from '../../../common'
import { DecimalInputSanitizer } from '../../../../utils'
import { currencies } from '../../../../data'
import { getBCV, getParalelo } from '../../../../services/Currencies/pyDolarVenezuelaAPI'

function DollarRate() {
  const [isChecked, setIsChecked] = useState(false)
  const [isApplied, setIsApplied] = useState(false)
  const { rate, updateRate } = useDollarRate()
  const { currency, selectCurrency  } = useCurrency()
  const validator = new DecimalInputSanitizer()
  const [option, setOption] = useState('')
  const [manualValue, setManualValue] = useState('')
  

  const US_DOLLAR_CODE = 'USD'
  const dollarCurrency = currencies.currencies.find(currency => currency.code === US_DOLLAR_CODE)

  const options = [
    {text: 'Escribir manualmente'},
    {text: 'BCV'},
    {text: 'Paralelo'}
  ]

  const optionTexts = options.map(option => option.text)
  const optionManual = options[0].text
  const optionBCV = options[1].text
  const optionParalelo = options[2].text

  useEffect(() => {
    const fetchData = async () => {
      if (option === optionBCV) {
        try {
          const newRate = await getBCV()
          updateRate(newRate)
          selectDollarAsCurrency(newRate)
        } catch (error) {
          console.error('Algo salió mal al obtener BCV:', error)
        }
      } else if (option === optionParalelo) {
        try {
          const newRate = await getParalelo()
          updateRate(newRate)
          selectDollarAsCurrency(newRate)
        } catch (error) {
          console.error('Algo salió mal al obtener Paralelo:', error)
        }
      }
    }
  
    if (option) {
      fetchData()
    }
  }, [option])
  
  const onChecked = (bool) => {
    setIsChecked(bool)
  }

  const setApply = () => {
    setIsApplied(true)
  }

  const selectDollarAsCurrency = (rate = 0) => {
    if (option === optionManual) {
      if (isApplied && manualValue >= 0.01) {
        if (isChecked && currency.name !== dollarCurrency.name) {
          selectCurrency(dollarCurrency)
        }
      }
    } else {
      if (rate >= 0.01) {
        if (isChecked && currency.name !== dollarCurrency.name) {
          selectCurrency(dollarCurrency)
        }
      }
    }
  }

  const onChangeHandler = (e) => {
    const value = e.target.value
    const sanitizedValue = validator.getSanitizedOf(value)
    sanitizedValue >= 0.01 && setManualValue(sanitizedValue)
  }

  useEffect(()=>{
    console.log('render-forzado:',rate)
  },[rate])

  useEffect(()=>{
    
    selectDollarAsCurrency()
    updateRate(manualValue)
    setIsApplied(false)
  } 
  ,[isApplied])

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setApply()
  }

  const onToggleClickHandler = () => {
    setIsChecked(!(isChecked))
  }

  const onSelectedChange = (e) => {
    const value = e.target.value
    setOption(value)
    console.log(value)
  }

  return (
    <form onSubmit={e => onSubmitHandler(e)}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ToggleSwitch 
          label="Usar dólares" 
          onChange={onChecked} 
          onClick={onToggleClickHandler} 
        />
        {isChecked && (
          <SelectOption 
            options={optionTexts}
            onChange={e => onSelectedChange(e)}
          />
        )}
      </div>

      {isChecked && option === optionManual && (
        <>
          <Input 
            labelText="Tasa:" 
            onChange={onChangeHandler} 
            value={manualValue}
          />
          <Button text="Aplicar" type="submit" />
          <Button text="Cancelar" />
        </>
      )}
      
      {isChecked && option === optionBCV && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa Banco Central de Venezuela.</div>
      )}
      
      {isChecked && option === optionParalelo && (
        <div><span style={{ fontWeight: 'bold' }}>{rate} Bs/USD.</span>  Tasa EnParaleloVzla.</div>
      )}
    </form>
  )
}

export default DollarRate
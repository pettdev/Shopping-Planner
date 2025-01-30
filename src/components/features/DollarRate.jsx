import {useDollarRate} from '../../context/DollarRateContext'
import {CheckToggler} from '../../components/common';

function DollarRate() {
    const {price, updatePrice} = useDollarRate()

    return (
      <>
        <form name='options'>{
            <CheckToggler 
              labelText={"Cambiar a Bolívares"}
              id={'bolivarPrice'}
              onChange={updatePrice}
              min={0}
              max={100000}
              conditionalInputType={'number'}
              conditionalPlaceholder={'Ingresar tasa'}
              conditionalButtonLabel={'Aplicar'} />}
        </form>
      </>
    )
  }

export default DollarRate
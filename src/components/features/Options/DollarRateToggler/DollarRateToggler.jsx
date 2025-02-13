import {useDollarRate} from '../../../../context/DollarRateContext'
import {CheckToggler} from '../../../common';

const DollarRateToggler = () => {
    const {updatePrice} = useDollarRate()
    
    return (
      <>
        <form name='options'>
          {
            <CheckToggler 
              labelText={'Cambiar a Bolívares'}
              id={'bolivarPrice'}
              conditionalInputType={'number'}
              min={0}
              max={100000}
              conditionalPlaceholder={'Ingresar tasa'}
              onChange={updatePrice}
              conditionalButtonLabel={'Aplicar'}
              renderOnCondition={true}
            />
          }
        </form>
      </>
    )
  }

export default DollarRateToggler
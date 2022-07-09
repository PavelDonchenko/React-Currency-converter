import React from 'react';

function FormCurrency({curencyList, selectedCurrency, onChangeCurrency, inputValue, onChangeInput}) {
  return (
    <form>
    <input 
    type="number" 
    value = {inputValue}
    onChange = {onChangeInput}
    />
    <select value = {selectedCurrency} onChange = {onChangeCurrency}>
        {curencyList.map((cur) => (
            <option 
            key = {cur}
            value={cur}>{cur}</option>
        ))}
        
    </select>
</form>
  )
}

export default FormCurrency
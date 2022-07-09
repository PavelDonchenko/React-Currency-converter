import React from 'react';
import axios from 'axios';
import FormCurrency from './FormCurrency';
import Modal from 'react-modal';

import xulo from './assets/hulo.jpg'
import zel from './assets/zeljpg.jpg'



function Curency() {

    const [curencyList, setCurencyList] = React.useState([])
    const [startCurrency, setStartCurrency] = React.useState()
    const [endCurrency, setEndCurrency] = React.useState()
    const [inputValue, setInputValue] = React.useState('1')
    const [exchangeRate, setExchangeRate] = React.useState()
    const [inputInStartValue, setInputInStartValue] = React.useState(true)
    const [rub, setRub] = React.useState(false)
    const [uah, setUah] = React.useState(false)
    const [date, setDate] = React.useState()


    let startValue, endValue
    if (inputInStartValue) {
        startValue = inputValue
        endValue = (inputValue * exchangeRate).toFixed(4)
    } else {
        endValue = inputValue
        startValue = inputValue / exchangeRate
    }
    React.useEffect(() => {
        const fetchData = async function () {
            const getCurrencyUrl = await axios.get('https://api.exchangerate.host/latest?base=USD&symbols=EUR,NOK,SEK,DKK,USD,UAH,RUB')
            const optionCur = Object.keys(getCurrencyUrl.data.rates)
            setCurencyList(optionCur)
            setStartCurrency(getCurrencyUrl.data.base)
            setEndCurrency(optionCur[1])
            setExchangeRate(getCurrencyUrl.data.rates[optionCur[1]])
            setDate(getCurrencyUrl.data.date);

        }
        fetchData()
    }, [])

    React.useEffect(() => {
        const fetchCurrentData = async function () {
            const getSelectedCurrency = await axios.get(`https://api.exchangerate.host/latest?base=${startCurrency}&symbols=${endCurrency}`)
            setExchangeRate(getSelectedCurrency.data.rates[endCurrency])

            if (startCurrency === "RUB" || endCurrency === "RUB") {
                openModal()
                setRub(true)
                setUah(false)
            } else if (startCurrency === "UAH" || endCurrency === "UAH"){
                openModal()
                setUah(true)
                setRub(false)
            }
        }
        fetchCurrentData()
    }, [startCurrency, endCurrency])

    const handleStartInputChange = (e) => {
        setInputValue(e.target.value)
        setInputInStartValue(true)
    }
    const handleEndInputChange = (e) => {
        setInputValue(e.target.value)
        setInputInStartValue(false)
    }


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    Modal.setAppElement('#root');
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (

        <div className="currency">
            <div className='currency-left'>
                <i>ви віддаєте</i>
                <FormCurrency
                    curencyList={curencyList}
                    selectedCurrency={startCurrency}
                    onChangeCurrency={e => setStartCurrency(e.target.value)}
                    inputValue={startValue}
                    onChangeInput={handleStartInputChange}
                />
                <div className="info">Курс обміну актуальний на {date} 1 {startCurrency} = {exchangeRate} {endCurrency}</div>

                <div className='icon'>
                    <svg version="1.1" id="Layer_1" x="0px" y="0px"
                        width="64px" height="64px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
                        <polyline fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="54.083,51 
  	63.083,42 54.083,33 "/>
                        <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="63" y1="42" x2="9" y2="42" />
                        <polyline fill="none" stroke="#000000" strokeWidth="2" strokeLinejoin="bevel" strokeMiterlimit="10" points="10.083,13 
  	1.083,22 10.083,31 "/>
                        <line fill="none" stroke="#000000" strokeWidth="2" strokeMiterlimit="10" x1="1" y1="22" x2="55" y2="22" />
                    </svg>
                </div>
            </div>

            <div className='currency-right'>
                <i>Ви отримуєте</i>
                <FormCurrency
                    curencyList={curencyList}
                    selectedCurrency={endCurrency}
                    inputValue={endValue}
                    onChangeCurrency={e => setEndCurrency(e.target.value)}
                    onChangeInput={handleEndInputChange}
                />
                <div className="info">Комісія: { (inputValue / exchangeRate).toFixed(3) } UAH</div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className={uah ? 'modal modal-ua' : 'modal modal-rus'} >
                    <button onClick={closeModal}>x</button>
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{uah ? "Слава Україні !!!" : "PUTIN X**LO"}</h2>
                    <div className="modal-img">
                        <img src={uah ? `${zel}` : `${xulo}`} alt = "pic"/>
                    </div>
                    <p>{uah ? "Красава, купи ще, i на BAYRAKTAR не забудь" : "Ти шо, дурний? Який рубль?"}</p>
                </div>
            </Modal>
        </div>
    )
}

export default Curency
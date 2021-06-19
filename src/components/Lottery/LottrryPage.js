import './LotteryPage.scss'
import { useRef, useState } from 'react'
import DeleteImg from '../../img/delete.png'
import { changeLottery } from '../Firebase'
const LottrryPage = ({ pageState, setPageState, information }) => {
  const [discountContent, setDiscount] = useState('')
  const LotterBtn = useRef(null)
  const LottertDiscount = useRef(null)
  const discount = ['現金折抵200', '現金折抵100', '現金折抵50', '商品75折', '商品85折', '商品95折']
  const discountLength = discount.length
  let timeout
  function handleState() {
    if (LotterBtn.current.innerHTML === 'Start') {
      timeout = setInterval(function () {
        let random = parseInt(Math.random() * discountLength)
        let randomName = discount[random]
        LottertDiscount.current.innerHTML = randomName
      }, 50)
      LotterBtn.current.innerHTML = 'Stop'
    } else {
      clearInterval(timeout)
      LotterBtn.current.innerHTML = 'Start'
      LotterBtn.current.style.pointerEvents = 'none'
      LotterBtn.current.style.backgroundColor = 'lightgray'
      setDiscount(LottertDiscount.current.innerHTML)
      changeLottery(information[0].email, LottertDiscount.current.innerHTML)
      window.location.reload()
    }
  }

  return (
    <div className="lotteryPage" style={{ display: pageState ? '' : 'none' }}>
      <img
        src={DeleteImg}
        onClick={() => {
          setPageState(false)
        }}
        alt=""
      />
      <div
        className="m-btn g-btn-start"
        onClick={() => {
          handleState()
        }}
        ref={LotterBtn}
      >
        Start
      </div>
      <div className="g-name" ref={LottertDiscount}>
        抽獎內容
      </div>
    </div>
  )
}
export default LottrryPage

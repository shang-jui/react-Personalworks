import React from 'react'
import './Shop.scss'
import Delete from '../../img/trash.png'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createShoplistsInDB } from '../Firebase'
import { icon } from '../AddLocalStorage'

const Shop = ({ information, status }) => {
  const [shopList, setShopList] = useState([])
  const [finalPrice, setFinalPrice] = useState(0)
  const [shipping, setShipping] = useState(70)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userIphone, setUserIphone] = useState('')
  const [userAddress, setUserAddress] = useState('')
  const [userTime, setUserTime] = useState('morning')
  const [localStorageStatus, setLocalStorage] = useState(false)

  //撈LOCALSTORAGE
  useEffect(() => {
    const task = []
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    if (tasks == null) {
      task.push({
        count: '',
        item_id: '',
        name: '',
        price: '',
      })
    } else {
      tasks.forEach((element) => {
        task.push({
          count: element.count,
          item_id: element.item_id,
          name: element.name,
          price: element.price,
        })
      })
    }
    setShopList(task)
  }, [localStorageStatus])

  const lists = []
  let allPrice = 0
  shopList.forEach((element) => {
    lists.push({
      count: element.count,
      item_id: element.item_id,
      name: element.name,
      price: element.price,
    })
    allPrice += parseInt(element.price)
  })

  useEffect(() => {
    if (allPrice > 350) {
      setFinalPrice(allPrice)
      setShipping(0)
    } else {
      setFinalPrice(allPrice + 70)
      setShipping(70)
    }
  }, [shopList])

  //數量onchange改變事件
  const handleOnchange = (e) => {
    const changeCount = e.target.value
    const changePrice = changeCount * 350
    const changeId = e.target.parentNode.id
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(function (task, i) {
      if (changeId == task.item_id) {
        tasks[i].count = parseInt(changeCount)
        tasks[i].price = parseInt(changePrice)
      }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
    setLocalStorage(!localStorageStatus)
  }
  //刪除
  const handleDelete = (e) => {
    const targetLi = e.target.parentNode.parentNode
    const changeId = e.target.parentNode.parentNode.id
    const confirmAgain = window.confirm('你確定嗎？')
    if (confirmAgain) {
      setTimeout(function () {
        targetLi.remove()
      }, 500)
    }
    const newTasks = []
    let tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(function (task, i) {
      if (changeId != task.item_id) {
        newTasks.push(task)
      }
    })
    localStorage.setItem('tasks', JSON.stringify(newTasks))
    setLocalStorage(!localStorageStatus)
    icon()
  }
  //收件資料填寫
  useEffect(() => {
    setUserName(information[0].name)
    setUserEmail(information[0].email)
    setUserAddress(information[0].address)
  }, [userName])

  //更改收件資料
  const hangleChangeName = (e) => {
    setUserName(e.target.value)
  }
  const hangleChangeEmail = (e) => {
    setUserEmail(e.target.value)
  }
  const hangleChangeIphone = (e) => {
    setUserIphone(e.target.value)
  }
  const hangleChangeAddress = (e) => {
    setUserAddress(e.target.value)
  }
  const hangleChangeTime = (e) => {
    setUserTime(e.target.value)
  }
  //寫入firebase
  const writeInFirebase = () => {
    let shopLists = []
    let shopCount = 0
    shopList.forEach((element, index) => {
      shopLists.push({
        amount: element.count,
        item: element.name,
      })
      shopCount = index
    })
    let day = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    const date = year + '/' + month + '/' + day
    let shopListID = uuidv4()
    let info = {
      mail: userEmail,
      shopLists: shopLists,
      total: finalPrice,
      date: date,
      id: shopListID,
      count: shopCount,
    }
    if (status === true) {
      createShoplistsInDB(info)
    } else {
      alert('請先登入')
    }
  }

  return (
    <div className="shop">
      <div className="title1">
        <h1>購物車</h1>
        <img src="img/Path 1.png" alt=""></img>
      </div>
      <main>
        <div className="view">
          <div className="cart">
            <div className="row-title">
              <div className="name">品項</div>
              <div className="qty">數量</div>
              <div className="price">單價</div>
              <div className="subtotal">小計</div>
            </div>
            <div className="list">
              {lists.map((marker) => (
                <div className="listCount" key={marker.item_id} id={marker.item_id}>
                  <p>{marker.name}</p>
                  <select onChange={(e) => handleOnchange(e)} defaultValue={parseInt(marker.count)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </select>
                  <p>
                    NT.<span>350</span>
                  </p>
                  <p>
                    NT.<span>{marker.price}</span>
                  </p>
                  <div className="deleteImg">
                    <img className="delete" src={Delete} alt="" onClick={handleDelete} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="target">
            <div className="country">
              <span className="text">配送國家</span>
              <select>
                <option className="area">台灣或離島</option>
              </select>
            </div>
            <div className="country">
              <span className="text">付款方式</span>
              <select>
                <option className="payment">信用卡付款</option>
                <option className="payment">貨到付款</option>
              </select>
            </div>
          </div>
          <div className="reminder">
            <div>※提醒您：</div>
            <div>● 請填寫正確收件人資訊，避免包裹配送不達</div>
            <div>● 請填寫正確收件人姓名 ( 與證件相符 )，避免無法領取</div>
          </div>
          <div className="recipient">
            <div className="title">收件資料</div>
            <div className="line">
              <div className="text">收件人姓名</div>
              <div className="input">
                <input
                  type="text"
                  id="recipient-name"
                  placeholder="必填"
                  value={userName}
                  onChange={(e) => hangleChangeName(e)}
                />
              </div>
            </div>
            <div className="line">
              <div className="text">Email</div>
              <div className="input">
                <input
                  type="text"
                  id="recipient-email"
                  placeholder="必填(範例:exaple@gmail.com)"
                  value={userEmail}
                  onChange={(e) => hangleChangeEmail(e)}
                />
              </div>
            </div>
            <div className="line">
              <div className="text">手機號碼</div>
              <div className="input">
                <input
                  type="text"
                  id="recipient-phone"
                  placeholder="必填(範例09XX-XXXXXX)"
                  onChange={(e) => hangleChangeIphone(e)}
                  value={userIphone}
                />
              </div>
            </div>
            <div className="line">
              <div className="text">收件地址</div>
              <div className="input">
                <input
                  type="text"
                  id="recipient-adress"
                  placeholder="必填"
                  value={userAddress}
                  onChange={(e) => hangleChangeAddress(e)}
                />
              </div>
            </div>
            <div className="line">
              <div className="text">配送時間</div>
              <div className="input">
                <label>
                  <input
                    type="radio"
                    value="moring"
                    name="recipient-time"
                    defaultChecked
                    onChange={(e) => hangleChangeTime(e)}
                  />
                  <span className="time">08:00 - 12:00</span>
                </label>
                <label>
                  <input type="radio" value="afternoon" name="recipient-time" onChange={(e) => hangleChangeTime(e)} />
                  <span className="time">14:00 - 18:00</span>
                </label>
                <label>
                  <input type="radio" value="anytime" name="recipient-time" onChange={(e) => hangleChangeTime(e)} />
                  <span className="time">不指定</span>
                </label>
              </div>
            </div>
          </div>
          <div className="payment">
            <div className="title">付款資料</div>
            {/* <div id="cardview-container"></div> */}
            <div className="line">
              <div className="text">信用卡號碼</div>
              <div className="input">
                <div className="tpfield" id="card-number">
                  {/* <input type="text" placeholder="**** **** **** ****" /> */}
                </div>
              </div>
            </div>
            <div className="line">
              <div className="text">有效期限</div>
              <div className="input">
                <div className="tpfield" id="card-expiration-date">
                  {/* <input type="text" placeholder="MM/YY" /> */}
                </div>
              </div>
            </div>
            <div className="line">
              <div className="text">安全碼</div>
              <div className="input">
                <div className="tpfield" id="card-ccv">
                  {/* <input type="text" placeholder="ccv" /> */}
                </div>
              </div>
            </div>
          </div>
          <div className="confirm">
            <div className="row">
              <div className="title">總金額</div>
              <div className="priceView">
                <span className="unit">NT.</span>
                <span id="subtotal">{finalPrice}</span>
              </div>
            </div>
            <div className="row">
              <div className="title">運費</div>
              <div className="priceView">
                <span className="unit">NT.</span>
                <span id="freight">{shipping}</span>
              </div>
            </div>
            <div className="row">
              <div className="seperator"></div>
            </div>
            <div className="row">
              <div className="title">應付金額</div>
              <div className="priceView">
                <span className="unit">NT.</span>
                <span id="total">{finalPrice + shipping}</span>
              </div>
            </div>
            <div className="row">
              {/* <button id="submit-button" onClick={writeInFirebase}>
                確認付款
              </button> */}
              <button id="submit-button">確認付款</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Shop

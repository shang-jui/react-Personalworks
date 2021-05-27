import React from 'react'
import './Information.scss'
import firebase from 'firebase'
import { withRouter } from 'react-router'
import { useState, useRef } from 'react'
import defaultImg from '../../img/iconfinder_v-33_3162613.png'
import { lists, logOut } from '../Firebase'
import { v4 as uuidv4 } from 'uuid'
import { urlencoded } from 'body-parser'

const Information = (props) => {
  const [listState, setListState] = useState(true)
  const [list, setList] = useState([])
  const { information } = props

  const handleSetListState = () => {
    if (listState == true) {
      setListState(false)
      lists(information[0].email, handleSetList)
    } else {
      setListState(true)
    }
  }
  const handleSetList = (data) => {
    setList(data)
  }
  // const allLists = []
  // list.forEach((data) => {
  //   allLists.push({
  //     items: data.items,
  //     mail: data.mail,
  //     id: data.id,
  //     firebaseID: data.firebaseID,
  //     date: data.date,
  //     total: data.total,
  //     listTotal: data.listTotal,
  //     shopLists: data.shopLists,
  //   })
  // })

  return (
    <div className="InformationDiv">
      <div className="memberInformation">
        <div
          className="defaultImg"
          style={{
            backgroundImage: `url(${information[0].personUrl ? information[0].personUrl : defaultImg})`,
          }}
        ></div>
        <div className="topInformation">
          <h1>姓名:{information[0].name}</h1>
          <button type="button" onClick={() => logOut(props)}>
            登出
          </button>
        </div>
        <ul>
          <li>信箱:{information[0].email}</li>
        </ul>
      </div>
      <div className="memberShopList ">
        <button type="button" onClick={handleSetListState}>
          已付款訂單
        </button>
        <ul className={` listOutLine ${listState ? 'close' : ''}`}>
          {list.map((marker) => (
            <li className="outLine " key={marker.firebaseID}>
              <ul>
                <li>訂單編號:{marker.id}</li>
                <li>訂單日期:{marker.date}</li>
                <li>購買幾項:{marker.listTotal}</li>
                <li>
                  商品明細
                  <ul>
                    {marker.shopLists.map((shopList) => (
                      <li key={uuidv4()}>
                        <p>
                          品項名稱:{shopList.item} 購買個數:{shopList.amount} 金額:{shopList.amount * 350}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>總金額:{marker.total}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default withRouter(Information)

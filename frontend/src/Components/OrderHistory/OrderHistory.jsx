import React from 'react'
import './orderHistory.css'
import { TbCurrencyTaka } from "react-icons/tb";

const OrderHistory = () => {
  return (
    <div className='order-history-container'>
      <h2>Order History</h2>
      <div className="order-history">
            <table className='order-history-table'>
                <thead>
                   <tr>
                    <th>Order ID</th>
                    <th>Transaction ID</th>
                    <th className='products-title'>Products Title</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Order Date</th>
                </tr> 
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>REF1732295719962</td>
                    <td>[Rapoo NK2600 Spill- Resistant Wired Black Keyboard with Bangla]</td>
                    <td>1</td>
                    <td><TbCurrencyTaka />760</td>
                    <td>2024-11-22 23:15:39</td>
                </tr> 
                
                
                </tbody>
                
            </table>
      </div>
     
    </div>
  )
}

export default OrderHistory

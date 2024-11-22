import React, { useEffect } from 'react'
import './PaymentResult.css'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PaymentResult = () => {
    const query = new URLSearchParams(useLocation().search);
    const status = query.get('status'); // 'success' or 'fail'
    const transactionId = query.get('tranId'); // Transaction ID

  return (
    <div className='payment-result-container'>
        {status==='success'?
        <div className='payment-success'>
          <h1>Payment Successfull</h1>
          <p>Transaction ID: {transactionId}</p>
        </div>
        :
        <div className='payment-fail'>
          <h1>Payment Failed! Try Again</h1>
          </div>
        }


      {/* <h1>Payment {status === 'success' ? "Successfull" : "Failed"}</h1>
      <p>Transaction ID: {transactionId}</p> */}
    </div>
  )
}

export default PaymentResult
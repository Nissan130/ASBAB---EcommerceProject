import React, { useContext, useEffect, useState } from 'react';
import './orderHistory.css';
import { TbCurrencyTaka } from "react-icons/tb";
import { GlobalContext } from '../../Context/GlobalContext';
import axios from "axios";

const OrderHistory = () => {
  const { userId } = useContext(GlobalContext);
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch user order history from the backend
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/orderHistory/${userId}`);
        setOrderHistory(response.data);
      } catch (error) {
        console.error("Error fetching order history", error);
      }
    };
    fetchOrderHistory();
  }, [userId]);

  // Helper function to format order date
  const formatOrderDate = (isoDate) => {
    const date = new Date(isoDate);

    // Month Names Array
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[date.getMonth()]; // Get the month name
    const day = date.getDate(); // Day of the month
    const year = date.getFullYear(); // Full year

    // Format time in 12-hour clock
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight

    // Return formatted date and time
    return `${monthName} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
  };

  return (
    <div className='order-history-container'>
      <h2>Order History</h2>
      <div className="order-history">
        {orderHistory.length !== 0 ? (
          <table className='order-history-table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Transaction ID</th>
                <th className='products-title'>Products Title</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.transaction_id}</td>
                  <td>{order.products_title}</td>
                  <td>{order.total_quantity}</td>
                  <td><TbCurrencyTaka />{order.total_price_amount}</td>
                  {/* Format order date */}
                  <td>{formatOrderDate(order.order_date)}</td>
                  <td>{order.payment_method}</td> {/* Payment Method */}
                  <td>{order.payment_status}</td> {/* Payment Status */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div><h3>No order history</h3></div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import './Orders.css'; // You can style your table accordingly
import { TbCurrencyTaka } from "react-icons/tb";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  
  // Fetch all orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5002/admin/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchOrders();
  }, []);

  // Helper function to format the order date
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

  // Handle payment status change
  const handlePaymentStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5002/admin/orders/${orderId}`, {
        payment_status: newStatus
      });
      if (response.data.success) {
        // Update the order status in the local state after the successful update
        setOrders(orders.map(order => 
          order.order_id === orderId ? { ...order, payment_status: newStatus } : order
        ));
      } else {
        alert("Failed to update payment status.");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Error updating payment status. Please try again.");
    }
  };

  return (
    <div className="admin-orders-container">
      <h2>Admin Order Management</h2>
      <div className="admin-orders">
        {orders.length > 0 ? (
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Transaction ID</th>
                <th>Products</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Payment Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.transaction_id}</td>
                  <td>{order.products_title}</td>
                  <td>{order.total_quantity}</td>
                  <td><TbCurrencyTaka />{order.total_price_amount}</td>
                  <td>{formatOrderDate(order.order_date)}</td>
                  <td>{order.payment_method}</td>
                  <td>{order.payment_status}</td>
                  <td>
                    <select
                      value={order.payment_status}
                      onChange={(e) => handlePaymentStatusChange(order.order_id, e.target.value)}
                    >
                      <option value="Not Paid">Not Paid</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div><h3>No orders available</h3></div>
        )}
      </div>
    </div>
  );
};

export default Orders;

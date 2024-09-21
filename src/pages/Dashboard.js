import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { BsArrowDownRight } from "react-icons/bs";
import './Dashboard.css';

const Dashboard = () => {
  const [paymentsofline, setPaymentsofline] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${base_url}/paymentsofline`);
        setPaymentsofline(response.data.data || []);
      } catch (error) {
        console.error("Error fetching paymentsofline:", error);
      }
    };

    const fetchevents = async () => {
      try {
        const response = await axios.get(`${base_url}/events`);
        setEvents(response.data || []);
        console.log("Fetched events:", response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchIncomeData = async () => {
      try {
        const response = await axios.get(`${base_url}/incomeStatistics`);
        setIncomeData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchevents();
    fetchPayments();
    fetchIncomeData();
  }, []);

  const totalAmount = paymentsofline.reduce((total, payment) => total + payment.amount, 0);

  return (
   <div className="dashboard-container">
  <h4 className="dashboard-title">Dashboard</h4>
  <div className="summary-card">
    <div>
      <p className="total-amount-label">Total Amount</p>
      <h4 className="total-amount">₹{totalAmount}</h4>
    </div>
    <div className="summary-trend">
      <h6 className="trend-value">
        <BsArrowDownRight />
        32%
      </h6>
      <p className="trend-description">Compared to April 2023</p>
    </div>
  </div>

  <div className="mt-4">
  <h3 className="events-title">Events</h3>
  <div className="row">
    {events.length === 0 ? (
      <p>No events available.</p>
    ) : (
      events.slice(0, 6).map(event => ( 
        <div className="col-md-4" key={event._id}>
          <div className="card event-card">
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h6 className="event-title">{event.title}</h6>
              <p className="event-description">
                {event.description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 50)}...
              </p>
              <p className="event-detail"><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US')}</p>
              <p className="event-detail"><strong>Category:</strong> {event.category.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 50)}...</p>
              <p className="event-detail"><strong>Address:</strong> {event.address.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 50)}...</p>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>


  <div className="mt-4">
    <h3 className="payments-title">Recent Payments</h3>
    <div>
      {paymentsofline.slice(-10).map(payment => (
        <div className="card payment-card" key={payment._id}>
          <div className="card-header payment-header">
            <h6>{payment.productModel}</h6>
          </div>
          <div className="card-body payment-body">
            <p><strong>First Name:</strong> {payment.profileId?.firstName}</p>
            <p><strong>Amount:</strong> ₹{payment.amount}</p>
            <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleDateString('en-US')}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );

};

export default Dashboard;

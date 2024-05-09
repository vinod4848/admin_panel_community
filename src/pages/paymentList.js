import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import "./PaymentList.css";

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [years, setYears] = useState([]);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(`${base_url}/getAllOrders`);
        setPaymentList(response.data);
        setLoading(false);

        const uniqueYears = [
          ...new Set(
            response.data.map((payment) =>
              new Date(payment.created_at).getFullYear()
            )
          ),
        ];
        setYears(uniqueYears.sort());
      } catch (error) {
        console.error("Error fetching payment data:", error);
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPaymentList = () => {
    switch (filter) {
      case "all":
        return paymentList;
      case "7days":
        return paymentList.filter((payment) => {
          const createdAt = new Date(payment.created_at);
          const today = new Date();
          const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));
          return createdAt >= sevenDaysAgo;
        });
      case "15days":
        return paymentList.filter((payment) => {
          const createdAt = new Date(payment.created_at);
          const today = new Date();
          const fifteenDaysAgo = new Date(today.setDate(today.getDate() - 15));
          return createdAt >= fifteenDaysAgo;
        });
      case "30days":
        return paymentList.filter((payment) => {
          const createdAt = new Date(payment.created_at);
          const today = new Date();
          const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
          return createdAt >= thirtyDaysAgo;
        });
      default:
        return paymentList.filter((payment) => {
          const createdAt = new Date(payment.created_at);
          return createdAt.getFullYear() === parseInt(filter);
        });
    }
  };

  const getTotalAmount = () => {
    const filteredList = filteredPaymentList();
    return filteredList.reduce(
      (total, payment) => total + payment.amount_paid,
      0
    );
  };

  const generateCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," + convertToCSV(filteredPaymentList());
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "payment_list.csv");
    document.body.appendChild(link);
    link.click();
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",") + "\n";
    const csv = data.reduce((acc, row) => {
      const values = Object.values(row).join(",") + "\n";
      return acc + values;
    }, "");
    return header + csv;
  };

  return (
    <div>
      <div className="payment-list-container" id="payment-list-container">
        <h1 className="page-title">Payment List</h1>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="7days">Last 7 Days</option>
          <option value="15days">Last 15 Days</option>
          <option value="30days">Last 30 Days</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button className="download-csv-button" onClick={generateCSV}>
          Download CSV
        </button>

        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : filteredPaymentList().length === 0 ? (
          <p className="no-payments-text">No payments found</p>
        ) : (
          <>
            <table className="payment-table">
              <thead>
                <tr>
                  <th>OrderBy</th>
                  <th>Contact No.</th>
                  <th>Package Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Order ID</th>
                  <th>Amount Paid</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredPaymentList().map((payment, index) => (
                  <tr key={index}>
                    <td>
                      {payment.profileId?.firstName}{" "}
                      {payment.profileId?.lastName}
                    </td>
                    <td>{payment.userId?.phone}</td>
                    <td>{payment.packageId?.packagename}</td>
                    <td>{payment.packageId?.description}</td>
                    <td>{payment.packageId?.price}</td>
                    <td>{payment.orderId}</td>
                    <td>{payment.amount_paid}</td>
                    <td>{new Date(payment.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6"></td>
                  <td>Total Amount:</td>
                  <td>{getTotalAmount()}</td>
                </tr>
              </tfoot>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentList;

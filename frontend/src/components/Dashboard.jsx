import React, { useState, useEffect } from "react";
import { fetchShopifyData } from "../api/api";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import './Dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalVisitors = 1000; 

  useEffect(() => {
    fetchOrders();
  }, []);

 
  const fetchOrders = async () => {
    try {
      const response = await fetchShopifyData();
      const fetchedOrders = response.data || [];

      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);

      
      const totalSalesValue = fetchedOrders.reduce((acc, order) => acc + parseFloat(order.current_total_price || 0), 0);
      setTotalSales(totalSalesValue);

    
      const totalOrders = fetchedOrders.length;
      const conversionRateValue = totalVisitors ? (totalOrders / totalVisitors) * 100 : 0;
      setConversionRate(conversionRateValue.toFixed(2));

    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
      setFilteredOrders([]);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = orders.filter((order) =>
      order.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
      order.current_total_price.toString().includes(e.target.value) // Adjust to add more fields as needed
    );
    setFilteredOrders(filtered);
  };

  // Sort orders 
  const handleSort = (field) => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (field === "created_at") {
        return sortOrder === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else if (field === "current_total_price") {
        return sortOrder === "asc"
          ? parseFloat(a.current_total_price) - parseFloat(b.current_total_price)
          : parseFloat(b.current_total_price) - parseFloat(a.current_total_price);
      }
      return 0;
    });
    setFilteredOrders(sortedOrders);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField(field); 
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  
  const openOrderDetail = (order) => {
    console.log("View details for:", order);
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <a href="#" className="logo">
              <img src="../assets/logo.png" alt="Shopify logo" />
              <span className="nav-item">Shopify</span>
            </a>
          </li>
          <li>
            <a href="#">
            <MdDashboard className="fas" />
              <span className="nav-item">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="logout">
            <FiLogOut className="fas" />
              <span className="nav-item">Log out</span>
            </a>
          </li>
        </ul>
      </nav>

      <section className="main">
        <div className="main-top">
          <h1>Dashboard</h1>
        </div>

        <div className="users">
          <div className="card">
            <h4>Total Orders</h4>
            <span>{orders.length}</span>
          </div>
          <div className="card">
            <h4>Total Sales</h4>
            <p>${totalSales.toFixed(2)}</p>
          </div>
          <div className="card">
            <h4>Conversion Rate</h4>
            <span>{conversionRate}%</span>
          </div>
        </div>

        {/* Search and sort section */}
        <div className="search-sort-section">
          <input
            type="text"
            placeholder="Search Orders"
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
          <button onClick={fetchOrders}>Refresh</button>
          <div className="sort-options">
            <button onClick={() => handleSort("created_at")}>
              Sort by Date {sortField === "created_at" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </button>
            <button onClick={() => handleSort("current_total_price")}>
              Sort by Price {sortField === "current_total_price" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </button>
          </div>
        </div>

        <section className="orders">
          <div className="orders-list">
            <h1>Order List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>ID</th>
                  <th>Subtotal</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>{order.name}</td>
                    <td>{order.current_subtotal_price} {order.currency}</td>
                    <td>{order.current_total_price} {order.currency}</td>
                    <td>{order.financial_status}</td>
                    <td>
                      <button onClick={() => openOrderDetail(order)}>View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pagination */}
        <div className="pagination">
          {[...Array(Math.ceil(filteredOrders.length / ordersPerPage))].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={i + 1 === currentPage ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

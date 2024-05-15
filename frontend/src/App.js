import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const API_URL = "http://localhost:4000/";

function App() {
  // State to store the data fetched from the API
  const [data, setData] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchData(currentPage);
  }, [currentPage]);

  // Function to fetch data from the API
  const fetchData = async (pageIndex = 1) => {
    try {
      // Define query parameters
      const queryData = {
        pageSize: 10,
        pageIndex,
      };
      const queryString = new URLSearchParams(queryData).toString();

      // Define body data
      const bodyData = {};
      // Make GET request using Axios
      const response = await axios.get(
        `${API_URL}fetchStudentDetails?${queryString}`,
        bodyData
      );
      console.log(response);
      // Update state with fetched data
      setData(response?.data?.res || []);
      setTotalItems(response?.data.count || 0);
    } catch (error) {
      // If an error occurs, set the error state
      setError(error);
    } finally {
      // Set loading state to false after fetching data (whether successful or not)
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Data Table</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Total Marks</th>
            <th>Roll Number</th>
            {/* Add additional table headings as needed */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.date_of_birth}</td>
              <td>{item.gender}</td>
              <td>{item.email}</td>
              <td>{item.phone_number}</td>
              <td>{item.address}</td>
              <td>{item.total_marks}</td>
              <td>{item.roll_number}</td>
              {/* Add additional table cells based on your data structure */}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
      />
    </div>
  );
}

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;

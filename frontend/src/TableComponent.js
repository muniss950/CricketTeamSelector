
// TableComponent.js
import React, { useEffect, useState } from 'react';
import './App.css';

const TableComponent = ({ data }) => {
  // Dynamically get the columns (keys of the first object)
  const columns = data.length ? Object.keys(data[0]) : [];

  return (
    <div className="table-container">
      <h2>Data Table</h2>
      <table className="styled-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {item[column] === null || item[column] === undefined ? 'N/A' : item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

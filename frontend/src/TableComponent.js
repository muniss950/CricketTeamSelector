
// // TableComponent.js
// import React, { useEffect, useState } from 'react';
// import './App.css';

// const TableComponent = ({ data }) => {
//   // Dynamically get the columns (keys of the first object)
//   const columns = data.length ? Object.keys(data[0]) : [];

//   return (
//     <div className="table-container">
//       <h2>Data Table</h2>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             {columns.map((column, index) => (
//               <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               {columns.map((column, colIndex) => (
//                 <td key={colIndex}>
//                   {item[column] === null || item[column] === undefined ? 'N/A' : item[column]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;

// TableComponent.js
// import React from 'react';
// import './App.css';

// const TableComponent = ({ data, onRowClick }) => {
//   const columns = data.length ? Object.keys(data[0]) : [];

//   return (
//     <div className="table-container">
//       <h2>Data Table</h2>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             {columns.map((column, index) => (
//               <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index} onClick={() => onRowClick(item)}>
//               {columns.map((column, colIndex) => (
//                 <td key={colIndex}>
//                   {item[column] === null || item[column] === undefined ? 'N/A' : item[column]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;


import React from 'react';
import './App.css';

const TableComponent = ({ data, onRowClick }) => {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  const columns = Object.keys(data[0]); // Extract column names from the first object

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
            <tr key={index} onClick={() => onRowClick(item)}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {/* Check if the value is null or undefined, then display 'N/A' */}
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

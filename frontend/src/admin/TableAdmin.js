
import React from 'react';
import '../App.css';

// A generic table component that accepts different buttons and actions
const TableComponent = ({ data, columns, buttons, onRowClick, onButtonClick }) => {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Dynamically set columns if not provided
  const displayColumns = columns || Object.keys(data[0]);

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            {displayColumns.map((column, index) => (
              <th key={index}>{column.charAt(0).toUpperCase() + column.slice(1)}</th>
            ))}
            {buttons && buttons.length > 0 && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => onRowClick && onRowClick(item)}>
              {displayColumns.map((column, colIndex) => (
                <td key={colIndex}>
                  {/* Check if the value is null or undefined, then display 'N/A' */}
                  {item[column] === null || item[column] === undefined ? 'N/A' : item[column]}
                </td>
              ))}
              {buttons && buttons.length > 0 && (
                <td>
                  {buttons.map((button, buttonIndex) => (
                    <button
                      key={buttonIndex}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking buttons
                        onButtonClick(button.action, item);
                      }}
                    >
                      {button.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;

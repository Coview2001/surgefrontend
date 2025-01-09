import React from 'react';

const CustomCard = ({ 
  title, 
  content, 
  date, 
  buttonText1, 
  buttonText2, 
  headerBackgroundColor = '#f8d7da' // Default background color
}) => {
  return (
    <div style={styles.cardContainer}>
      <div style={{ ...styles.cardHeader, backgroundColor: headerBackgroundColor }}>
        <h3 style={styles.title}>{title}</h3>
        <button style={styles.button}>{'>'}</button>
      </div>
      <div style={styles.cardContent}>
        <ul style={styles.list}>
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div style={styles.dateContainer}>
        <p style={styles.dateText}>{date}</p>
      </div>
      <div style={styles.cardFooter}>
        <button style={styles.footerButton}>{buttonText1}</button>
        <button style={styles.footerButton}>{buttonText2}</button>
      </div>
    </div>
  );
};

// Inline styles for the custom card component
const styles = {
  cardContainer: {
    backgroundColor: 'white',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    margin: '20px',
    padding: '15px',
    fontFamily: 'Arial, sans-serif',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '8px',
  },
  title: {
    margin: 0,
    fontSize: '18px',
    color: '#333',
  },
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#333',
  },
  cardContent: {
    padding: '10px 0',
    fontSize: '14px',
    color: '#333',
    maxHeight: '150px', // Set a fixed height for the list
    overflowY: 'auto',
    minHeight: "150px",
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    // Add scrolling if content exceeds the max height
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '10px',
  },
  dateText: {
    fontSize: '12px',
    color: '#333',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  footerButton: {
    backgroundColor: '#007bff',
    border: 'none',
    padding: '5px 10px',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default CustomCard;

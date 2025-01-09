import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function MyDraggableComponent() {


  return (
    <div className="container-fuild mt-5 pt-5 d-flex align-items-center">
    <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f8f9fa' }}>
      Left Div
    </div>
    <div className="bg-primary" style={{ width: '2px', backgroundColor: '#000000', height: '100%' }}>h</div>
    <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f8f9fa' }}>
      Right Div
    </div>
  </div>
  );
}

export default MyDraggableComponent;

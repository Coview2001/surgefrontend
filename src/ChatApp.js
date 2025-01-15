import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Tabs, Tab } from 'react-bootstrap';
import Select from 'react-select';
import HeaderHome from './HeaderHome';
import { Spinner } from 'react-bootstrap';
import CryptoJS from 'crypto-js';

const ChatApp = () => {
  const [selectedTutors, setSelectedTutors] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [activeTab, setActiveTab] = useState('inbox');
  const [messageContent, setMessageContent] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messageListRef = useRef(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const secretKey = 'gvhbfijsadfkefjnujrbghj';
  const [loading, setLoading] = useState(true);

  const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
  const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
  useEffect(() => {
    const fetchMessagesAndTutors = async () => {
      try {
        const inboxResponse = await fetch(`https://surgebackend.azurewebsites.net/studentinbox/${decryptedStudentId}`);
        const inboxData = await inboxResponse.json();
        setInboxMessages(inboxData.data);
 
        const sentResponse = await fetch(`https://surgebackend.azurewebsites.net/studentsent/${decryptedStudentId}`);
        const sentData = await sentResponse.json();
        setSentMessages(sentData.data);
 
        const tutorsResponse = await fetch('https://surgebackend.azurewebsites.net/tutordetails/');
        const tutorsData = await tutorsResponse.json();
        setTutors(tutorsData.data.map(tutor => ({
          value: tutor.userID,
          label: `${tutor.firstName} ${tutor.lastName}`.trim()
        })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching messages or tutors:', error);
        setLoading(false);
      }
    };
 
    fetchMessagesAndTutors();
  }, []);
 
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const formattedTime = date.getUTCHours().toString().padStart(2, '0') + ':' + date.getUTCMinutes().toString().padStart(2, '0');
 
    return `${formattedDate} ${formattedTime}`;
  };
 
 const handleSendMessage = async () => {
    setLoading(true);
  if (!selectedTutors.length) {
    alert('Please select at least one tutor.');
    return;
  }
  if (!messageSubject) {
    alert('Please enter a subject.');
    return;
  }
  if (!messageContent) {
    alert('Please enter your message.');
    return;
  }
  if (file && file.size > 5 * 1024 * 1024) {
    alert('File size must be less than 5MB.');
    return;
  }
 
  const messageData = {
    // To: selectedTutors.value,
    To: selectedTutors.map(tutor => tutor.value),
    From: decryptedStudentId,
    Subject: messageSubject,
    Content: messageContent,
  };
  // //console.log('first',messageData)
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  formData.append('data', JSON.stringify(messageData));
 
  try {
    const response = await fetch('https://surgebackend.azurewebsites.net/send_email_to_tutor/', {
      method: 'POST',
      body: formData,
    });
    const responseData = await response.json();
    const newMessages = responseData.data.map(message => ({
      Timestamp: message.Timestamp,
      Attachments: message.Attachments,
      name: message.name,
      id: message.id,
      Message_Id: message.Message_Id,
      From_User: message.From_User,
      To_User: message.To_User,
      Subject: message.Subject,
      Content: message.Content,
    }));
 
    // If you want to add all messages to the state
    setSentMessages((prevMessages) => [...prevMessages, ...newMessages]);
    setMessageContent('');
    setMessageSubject('');
    setSelectedTutors([]);
    setFile(null);
    setShowForm(false);
    setLoading(false);
  } catch (error) {
    console.error('Error sending message:', error);
    setLoading(false);
  }
};
 
 
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setFileError('File size must be less than 5MB');
      setFile(null);
    } else {
      setFileError('');
      setFile(selectedFile);
    }
  };
 
  const markAsRead = async (message) => {
    const { Content, Subject,Message_Id } = message;// Extract relevant details
    // //console.log('first',message)
 
    const messageData = {
      Content,
      Subject,
      Message_Id,
    };
 
    try {     
        const response = await fetch('https://surgebackend.azurewebsites.net/mark-as-read/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: JSON.stringify(messageData) }),
      });
 
      if (!response.ok) {
        throw new Error('Failed to mark as read');
      }
 
      const responseData = await response.json();
      // //console.log('Mark as read response:', responseData);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };
 
  const handleNewMessageClick = () => {
    setSelectedMessage(null);
    setShowForm(true);
  };
 
  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
 
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
 
      const link = document.createElement('a');
      link.href = urlBlob;
      link.download = `data.${url.split('.').pop()}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(urlBlob);
    } catch (error) {
      console.error('Download error:', error);
    }
  };
 
 
  const handleMessageClick = (message) => {
    if (activeTab === 'inbox') {
      setSelectedMessage(message);
      setShowForm(false);
      markAsRead(message);
      setSelectedMessages((prevSelected) => {
   
          return [...prevSelected, message];
      });
    } else {
      setSelectedMessage(message);
      setShowForm(false);
    }
  };
 
  return (
    <div className="App">
    <HeaderHome/>
    {loading ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border mx-2" style={{ color: '#3F51B5' }} /> Loading...
    </div>
  ) : (
    <div className='container-fluid p-0 m-0 d-flex' style={{ backgroundColor:'#faf6fe', overflow: 'hidden' }}>
                  

      <div className="row flex-grow-1" style={{padding:'60px 20px 0 5px' , maxHeight:'100%'}}>
        <div className="col-md-4" style={{ borderRight: '1px solid #ccc', padding: '10px', height: '93vh', overflowY: 'hidden' }}>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="inbox" title="Inbox">
              <div ref={messageListRef} className="message-list" style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}>
              {inboxMessages.slice().reverse().map((message) => (
            <div
              key={message.id}
              onClick={() => handleMessageClick(message)}
              className="message-item"
              style={{
                backgroundColor: selectedMessages.some((m) => m.id === message.id) ? '#f1eff0' : (message.Seen=== true ? '#f1eff0' : '#efddf1'),
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '3px solid white',
                borderLeft: '10px solid white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{message.name}</strong>
                <span>{formatTimestamp(message.Timestamp)}</span>
              </div>
              Subject: <strong>{message.Subject}</strong><br />
            </div>
          ))}
              </div>
            </Tab>
            <Tab eventKey="sent" title="Sent">
              <div ref={messageListRef} className="message-list" style={{ height: '100vh', overflowY: 'auto' }}>
                {sentMessages.slice().reverse().map((message) => (
                  <div key={message.id} onClick={() => handleMessageClick(message)} className="message-item" style={{ backgroundColor: '#efddf1',padding:"10px", cursor: 'pointer', borderBottom: '3px solid white', borderLeft: '10px solid white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{message.name}</strong>
                      <span>{formatTimestamp(message.Timestamp)}</span>
                    </div>
                    Subject: <strong>{message.Subject}</strong><br />
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
 
        <div className="col-md-8" style={{ padding: '20px', overflowY: 'auto', position: 'relative', backgroundColor: '#fff' }}>
          {showForm ? (
            <>
              <h5>Send Message to Trainers</h5>
              <Form>
                <Form.Group controlId="tutorSelect">
                  <Form.Label>Select Trainers</Form.Label>
                  <Select
                    isMulti
                    options={tutors}
                    value={selectedTutors}
                    onChange={setSelectedTutors}
                  />
                </Form.Group>
                <Form.Group controlId="subjectInput">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                    placeholder="Enter subject"
                  />
                </Form.Group>
                <Form.Group controlId="messageInput">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message"
                  />
                </Form.Group>
                <Form.Group controlId="formFile">
                  <Form.Label>File Upload (max 5MB)</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                  {fileError && <div style={{ color: 'red' }}>{fileError}</div>}
                </Form.Group>
                <Button variant="primary" onClick={handleSendMessage}>
                  Send Message
                </Button>
              </Form>
            </>
          ) : (
            selectedMessage && (
              <div style={{ padding: '20px', backgroundColor: '#f9f9f9', zIndex: 10, border: '1px solid #ccc', borderRadius: '8px' }}>
                <h5>{selectedMessage.name}</h5>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p><strong>Subject:</strong> {selectedMessage.Subject}</p>
                  <span>{formatTimestamp(selectedMessage.Timestamp)}</span>
                </div>
                <p>{selectedMessage.Content}</p>
 
                {selectedMessage.Attachments && selectedMessage.Attachments !== "" && (
                  <div className="attachment">
                    <button
                      onClick={() => handleDownload(selectedMessage.Attachments)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '10px 15px',
                        borderRadius: '5px',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '10px',
                        background: 'linear-gradient(135deg, #7335B7, #9b59b6)',
                        transition: 'background 0.5s ease-in-out',
                      }}
                    >
                      <i className="fas fa-download" style={{ marginRight: '5px' }}></i> Download Attachment
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
 
        <Button
          onClick={handleNewMessageClick}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '24px',
            display: 'flex',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #7335B7, #9b59b6)',
            alignItems: 'center',
            zIndex: 15,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          +
        </Button>
      </div>
    </div>
  )}
  </div>
  );
};
 
export default ChatApp;
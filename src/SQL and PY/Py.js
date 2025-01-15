import React, { useState, useEffect } from 'react';


function Py() {
  const [splitOffset, setSplitOffset] = useState(1000); 
  const [verticalSplitOffset1, setVerticalSplitOffset1] = useState(400); 
  const [verticalSplitOffset2, setVerticalSplitOffset2] = useState(400); 
  const [initialX, setInitialX] = useState(null);
  const [initialY, setInitialY] = useState(null);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [isDraggingVertical1, setIsDraggingVertical1] = useState(false);
  const [isDraggingVertical2, setIsDraggingVertical2] = useState(false);

  const handleHorizontalMouseDown = (e) => {
    setIsDraggingHorizontal(true);
    setInitialX(e.clientX);
  };

  const handleVerticalMouseDown1 = (e) => {
    setIsDraggingVertical1(true);
    setInitialY(e.clientY);
  };

  const handleVerticalMouseDown2 = (e) => {
    setIsDraggingVertical2(true);
    setInitialY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDraggingHorizontal && initialX !== null) {
      const dx = e.clientX - initialX;
      setSplitOffset(splitOffset + dx);
      setInitialX(e.clientX);
    }
    if (isDraggingVertical1 && initialY !== null) {
      const dy = e.clientY - initialY;
      setVerticalSplitOffset1(verticalSplitOffset1 + dy);
      setInitialY(e.clientY);
    }
    if (isDraggingVertical2 && initialY !== null) {
      const dy = e.clientY - initialY;
      setVerticalSplitOffset2(verticalSplitOffset2 + dy);
      setInitialY(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingHorizontal(false);
    setIsDraggingVertical1(false);
    setIsDraggingVertical2(false);
    setInitialX(null);
    setInitialY(null);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingHorizontal, isDraggingVertical1, isDraggingVertical2, initialX, initialY]);

  return (
    <div className=''>
      <div className="col" style={{ height: '', width: '100vw', overflow: 'hidden'}}>
        <div className='row  mt-5 pt-2 pb-3 px-3' style={{ backgroundColor: '#9ECEDA', overflow: 'hidden', maxHeight: '92.5vh' }}>
          <div className="InputQuery  col-md-4 mx-1" style={{ height: '100vh', overflowY: 'auto', width: splitOffset, minWidth: '20%', maxWidth: '70%' }}>
            <div className='col result'>
              <div className='row'>
                <div style={{ width: '100%', height: verticalSplitOffset1, backgroundColor: '#F5FAFB', color: 'black', overflow: 'auto' }}>
                  Div 1
                </div>
              </div>
              <div className='' onMouseDown={handleVerticalMouseDown1} style={{ width: '100%', height: '1vh', backgroundColor: '#9ECEDA', color: 'black', cursor: 'row-resize' }}></div>
              <div className='row'>
                <div style={{ width: '100%', height: `calc(100vh - ${verticalSplitOffset1}px - 2vh)`, backgroundColor: '#F5FAFB', color: 'black', overflow: 'auto' }}>
                  Div 2
                </div>
              </div>
            </div>
          </div>
          <div className='' onMouseDown={handleHorizontalMouseDown} style={{ width: '0%', height: '100vh', backgroundColor: '#9ECEDA', color: 'black', cursor: 'col-resize', padding: '1px' }}></div>
          <div className="OutputDatabaseTables col mx-1 mb-3" style={{ height: '100vh', overflow: 'auto', width: splitOffset }}>
            <div className='col result'>
              <div className='row'>
                <div style={{ width: '100%', height: verticalSplitOffset2, backgroundColor: '#F5FAFB', color: 'black', overflow: 'auto' }}>
                  Div 3
                </div>
              </div>
              <div className='' onMouseDown={handleVerticalMouseDown2} style={{ width: '100%', height: '1vh', backgroundColor: '#9ECEDA', color: 'black', cursor: 'row-resize' }}></div>
              <div className='row'>
                <div style={{ width: '100%', height: `calc(100vh - ${verticalSplitOffset2}px - 2vh)`, backgroundColor: '#F5FAFB', color: 'black', overflow: 'auto' }}>
                  Div 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row body mt-5 pt-2 pb-3' style={{backgroundColor:'#9ECEDA', overflow:'hidden', maxHeight: '92.5vh'}}>
              <div className='qns'>
              </div>
              <div className="InputQuery  col-md-4 mx-1 " style={{ height: '100vh', overflowY: 'auto',width: splitOffset, minWidth: '20%', maxWidth: '70%' }}>
                  <div className='col result' >
                    <div className='row'>
                      <div style={{ width: '100%', height: '42vh',backgroundColor:'#F5FAFB', color:'black', overflow: 'auto' }}>
                      {questionName}
                      </div>
                    </div>
                    <div className='row'>
                      <div style={{ width: '100%', height: '1vh',backgroundColor:'#9ECEDA', color:'black' }}>
                      </div>
                    </div>
                    <div className='row'>
                      <div style={{ width: '100%', height: '52vh',backgroundColor:'#F5FAFB', color:'black', overflow: 'auto' }}>
                      <Tabs className='custom-tabs mt-1  mb-2' variant="pills" activeKey={activeTab} onSelect={(k) => setActiveTab(k)} style={{ fontSize: '12px' }}>
                        <Tab eventKey="tables" title="Table">
                          <div className='col DBT' style={{ height: '35vh', overflowX: 'auto' }}>
                            {data && data.Tables && (
                              <div className="d-flex flex-row">
                                {data.Tables.map(table => {
                                  const isSelected = selectedTableName === table.tab_name;
                                  return (
                                    <div
                                      key={table.tab_name}
                                      className={`bbb m-1 d-flex justify-content-start ${isSelected ? 'text-dark font-weight-bold rounded' : 'text-dark font-weight-normal'}`}
                                      onClick={() => handleTableNameClick(table.tab_name)}
                                      style={{
                                        transform: isSelected ? 'scale(1.1)' : 'none',
                                        transition: isSelected ? 'transform 0.5s' : 'none',
                                        backgroundColor: isSelected ? '#d5c3c34f' : '',
                                        color: isSelected ? 'white' : 'black',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      <div className="bbb" style={{ fontSize: '12px' }}>
                                        {table.tab_name}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {selectedTableName && (
                              <div>
                                {data.Tables.map(table => {
                                  if (table.tab_name === selectedTableName) {
                                    return (
                                      <div key={table.tab_name}>
                                        <table className="table table-bordered table-sm rounded" style={{ maxWidth: '100vw', width: '20vw', fontSize: '12px' }}>
                                          <thead>
                                            <tr>
                                              {Object.keys(table.data[0]).map((key, index) => (
                                                <th key={index} className='text-center' style={{ maxWidth: `${key.length * 10}px` }}>{key}</th>
                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {table.data.map((item, index) => (
                                              <tr key={index}>
                                                {Object.entries(item).map(([key, value], i) => (
                                                  <td key={i} className='text-center' style={{ minWidth: `${value.toString().length * 8}px` }}>{value}</td>
                                                ))}
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    );
                                  }
                                  return null;
                                })}
                              </div>
                            )}
                          </div>
                        </Tab>
                        <Tab eventKey="output" title="Expected Output">
                          {data && (
                            <div className="col expectedOutput" style={{ height: '35vh', overflowX: 'auto', fontSize: '12px' }}>
                              <div className="table-responsive">
                                <table className="table table-bordered table-sm" style={{ tableLayout: 'auto', width: 'auto' }}>
                                  <thead>
                                    <tr>
                                      {data.Question.ExpectedOutput.length > 0 &&
                                        Object.keys(data.Question.ExpectedOutput[0]).map((key, index) => (
                                          <th key={index} className='text-center'>{key}</th>
                                        ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.Question.ExpectedOutput.map((item, index) => (
                                      <tr key={index}>
                                        {Object.values(item).map((value, i) => (
                                          <td key={i} className='px-3 text-center' style={{ whiteSpace: 'nowrap', padding: '5px' }}>{value}</td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </Tab>
                      </Tabs>
                      </div>
                    </div>
                  </div>
              </div>
              <div className='curserDiv' onMouseDown={handleMouseDown}></div>
              <div className=" OutputDatabaseTables col  mx-1 mb-3" style={{ height: '100vh', overflow: 'auto',width: splitOffset}}>
                  <div className='col'>
                  <div className='row '>
                      <AceEditor
                        mode="sql"
                        theme="dreamweaver"
                        onChange={setSqlQuery }
                        value={sqlQuery}
                        placeholder="Write your SQL query here... "
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={false}
                        highlightActiveLine={false}
                        wrapEnabled={true}
                        className="pe-3 pt-3"
                        style={{ width: '100%', height: '42vh' }}
                      />
                    </div>
                    <div className='col d-flex justify-content-end align-items-center p-2'>
                    <div className='col d-flex justify-content-start align-items-center text-wrap'>
                    {executingQuery && (
                      <h5>Processing....</h5>
                    )}
                    {!executingQuery && successMessage && (
                      <div>
                      <h5>{successMessage}</h5>
                      <p style={{fontSize:'12px'}}>{additionalMessage}</p>
                      </div>
                      )}
                  </div>
                  <button
                      className="btn btn-dark btn-sm mx-2"
                      onClick={() => { handleRun(false); setShowTable(false); }}
                      style={{ backgroundColor: '#FFFFFF', color: '#000000' }}
                    >
                      RUN CODE
                    </button>
                    <button className="btn btn-dark btn-sm" onClick={handleSubmit}  style={{ backgroundColor: '#EEEBAD', color: '#000000' }}>
                      SUBMIT CODE
                    </button>
                    </div>
                    <div className='row pb-5'  style={{ backgroundColor: '#2C2C2C', height: '50vh', backgroundColor: '#F5FAFB', overflow:'auto' }}>
                      <p style={{ fontSize: '15px' }}>Your output:</p>
                        <div className="table-responsive">
                          {runResponseTable && Array.isArray(runResponseTable) ? (
                            <div>
                              <table className="table table-bordered table-sm" style={{ maxWidth: '39vh', fontSize: '12px', tableLayout: 'auto', width: 'auto'}}>
                                <thead>
                                  <tr>
                                    {Object.keys(runResponseTable[0]).map((key, index) => (
                                      <th key={index} className='text-center'>{key}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {runResponseTable.map((item, index) => (
                                    <tr key={index}>
                                      {Object.values(item).map((value, i) => (
                                        <td key={i} className='text-center' style={{ minWidth: `${value.toString().length * 10}px` }}>{value}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <pre>
                              {runResponseTable && Object.keys(runResponseTable).length > 0 &&
                                <table className="table table-bordered table-sm" style={{ fontSize: '10px' }}>
                                  <tbody>
                                    {Object.entries(runResponseTable).map(([key, value]) => (
                                      <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              }
                            </pre>
                          )}
                        </div>
                        {runResponseTestCases && (
                          <div className="col">
                            <div>
                            {runResponseTestCases.map((testCase, index) => (
                              <p key={index} className="">
                                {Object.entries(testCase).map(([key, value], i) => {
                                  let textColor = 'text-dark';
                                  if (value === 'Passed') {
                                    textColor = 'text-primary';
                                  } else if (value === 'Failed') {
                                    textColor = 'text-danger';
                                  }
                                  return (
                                    <span key={i} className=' border-2 rounded-3 p-2  px-3 my-5' style={{backgroundColor:'#FFFFFF', fontSize:'12px'}}>
                                      {key}: <span className={textColor}>{value}</span>
                                    </span>
                                  );
                                })}
                              </p>
                            ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
              </div>
            </div>
    </div>
  );
}

export default Py;

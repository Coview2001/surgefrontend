import React from 'react'

function Extra() {
  return (
    <div>
                  

                <div className="InputQuery   col-md-4 border border-primary rounded mx-1 mb-3" style={{ height: '40vh', overflowY: 'auto',width: splitOffset, minWidth: '20%', maxWidth: '70%' }}>
                  <div className='col result' >
                    <h3 className='text-primary '>Input :</h3>
                    <AceEditor
                      mode="sql"
                      theme="idle_fingers"
                      onChange={setSqlQuery }
                      value={sqlQuery}
                      placeholder="Write your SQL query here..."
                      fontSize={16}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      wrapEnabled={true}
                      className="pe-3"
                      style={{ width: '100%', height: '33vh', borderRadius: '10px' }}
                    />
                  </div>
              </div>
              <div className='curserDiv' onMouseDown={handleMouseDown}></div>
              <div className=" OutputDatabaseTables col border border-dark rounded mx-1 mb-3" style={{ height: '40vh', overflow: 'auto',width: splitOffset}}>
                  <div className='col'>
                    <Tabs className=''  activeKey={activeTab} onSelect={(k) => setActiveTab(k)} >
                      <Tab className='' eventKey="output" title="Output" >
                        {executingQuery ? (
                          <div className='text-center mt-5 pt-5' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <h4 className='text-secondary'>{submittingAnswer ? 'Submitting your answer' : 'Executing your query'}</h4>
                            <PulseLoader className='pt-2' color="#9ab4c9" size={5}/>
                          </div>
                        ) : (
                          <div className="mt-3 table table-responsive " style={{ height: '30vh' }}>
                            {showTable ? (
                              response && Array.isArray(response) ? (
                                response.map((table, index) => (
                                  <div key={index}>
                                    <h4>{table.tab_name}</h4>
                                    <table className="table table-bordered table-sm table-striped table-hover" style={{ maxWidth: '50vh' }}>
                                      <thead>
                                        <tr>
                                          {Object.keys(table.data[0]).map((key, index) => (
                                            <th key={index} className='text-center'>{key}</th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {table.data.map((item, index) => (
                                          <tr key={index}>
                                            {Object.values(item).map((value, i) => (
                                              <td key={i} className='ps-3'>{value}</td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                ))
                              ) : (
                                <pre>{response && Object.keys(response).length > 0 &&
                                  <table className="table table-bordered table-sm  table-striped table-hover">
                                    <tbody>
                                      {Object.entries(response).map(([key, value]) => (
                                        <tr key={key}>
                                          <td>{key}</td>
                                          <td>{value}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                }</pre>
                              )
                            ) : (
                              response && Array.isArray(response) ? (
                                <table className="table table-bordered table-sm table-striped table-hover" style={{ maxWidth: '60vh' }}>
                                  <thead>
                                    <tr>
                                      {Object.keys(response[0]).map((key, index) => (
                                        <th key={index} className={key === 'Error' ? 'text-center text-white bg-danger' : 'text-center  bg-info'}>{key}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {response.map((item, index) => (
                                      <tr key={index}>
                                        {Object.values(item).map((value, i) => (
                                          <td key={i} className='text-center' style={{ minWidth: `${value.toString().length * 10}px` }}>{value}</td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              ) : (
                                <pre className=''>{Object.entries(response || {}).map(([key, value]) => `${key}: ${value}`).join('\n')}</pre>
                              )
                            )}
                          </div>
                        )}
                      </Tab>
                      <Tab eventKey="tables" title="Database Tables">
                        <div className='col border DBT' style={{height: '35vh', overflowX: 'auto',  }}>
                          {questions[questionIndex]?.Table && (
                            <div className="d-flex flex-row">
                              {tables.map(table => {
                                const isSelected = selectedTableName === table.tab_name;
                                if (questions[questionIndex]?.Table.includes(table.tab_name)) {
                                  return (
                                    <div 
                                      key={table.tab_name} 
                                      className={`bbb m-1 d-flex justify-content-start ${isSelected ? 'bg-warning text-dark font-weight-bold rounded' : ' text-dark font-weight-normal'}`} 
                                      onClick={() => handleTableNameClick(table.tab_name)}
                                      style={{ transform: isSelected ? 'scale(1.1)' : 'none',
                                              transition: isSelected ? 'transform 0.5s' : 'none',
                                              backgroundColor: isSelected ? '#fffff' : '#00000',

                                      }} 
                                    >
                                      <div 
                                        className={`bbb mx-2 ${isSelected ? 'pointer' : 'cursor-pointer'}`}
                                        style={{ cursor: isSelected ? 'pointer' : 'pointer' }}
                                      >
                                        {table.tab_name}
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          )}
                          {selectedTableName && (
                            <div>
                              {tables.map(table => {
                                if (table.tab_name === selectedTableName) {
                                  return (
                                      <div key={table.tab_name}>
                                        <table className="table table-bordered table-sm rounded mx-3 table-striped table-hover" style={{ maxWidth: '100vw', width: '20vw' }}>
                                          <thead>
                                            <tr>
                                              {Object.keys(table.data[0]).map((key, index) => (
                                                <th key={index} className='text-center bg-warning' style={{ maxWidth: `${key.length * 12}px` }}>{key}</th>
                                              ))}
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {table.data.map((item, index) => (
                                              <tr key={index}>
                                                {Object.entries(item).map(([key, value], i) => (
                                                  <td key={i} className='text-center' style={{ minWidth: `${value.toString().length * 10}px` }}>{value}</td>
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
                    </Tabs>
                  </div>
              </div>
    </div>
  )
}

export default Extra
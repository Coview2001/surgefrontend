import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import InternshipInstructionHeader from "./InternshipInstructionHeader";
import vscode1 from "../Img/vscode1.png";
import vscode2 from "../Img/vscode2.png";
import vscode3 from "../Img/vscode3.png";
import CryptoJS from "crypto-js";

function InstructionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const secretKey = "gvhbfijsadfkefjnujrbghj";
  const encryptedStudentId = sessionStorage.getItem("StudentId"); // Decrypt the data
  const decryptedStudentId = CryptoJS.AES.decrypt(
    encryptedStudentId,
    secretKey
  ).toString(CryptoJS.enc.Utf8);

  const navigate = useNavigate();

  const handleDownload = () => {
    setIsLoading(true); // Start loading
    const Url = "https://surgebackend.azurewebsites.net/internship/zip-file/";
    const data = {
      StudentId: decryptedStudentId,
      Name: "download_ZIP_file",
    };

    fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        const fileUrl = response.path;
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", "FlaskSample.zip");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      })
      .finally(() => {
        setIsLoading(false); // End loading
      });
  };

  const handleHomePage = () => {
    navigate("/InternshipDashboard");
  };

  return (
    <div className="container-fluid mt-5">
      <InternshipInstructionHeader />
      <div className="p-3">
        <h1 className="text-primary mb-4 pt-2">
          Instructions for Setting Up Your Project Environment
        </h1>

        <div className="card mb-4 border border-1 border-dark">
          <div
            className="card-header text-white"
            style={{ backgroundColor: "#404040", fontSize: "18.14px" }}
          >
            STEP 1: Install VS Code
          </div>
          <div className="card-body ">
            <ul>
              <li>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18.14px",
                  }}
                >
                  <p>
                    Download and install Visual Studio Code from the
                    <a
                      href="https://code.visualstudio.com/"
                      target="_blank"
                      className="text-dark"
                    >
                      {" "}
                      official website
                    </a>
                    .
                  </p>
                  <img
                    src={vscode1}
                    alt="Visual Studio Code Icon"
                    style={{ maxWidth: "30%", height: "40vh", margin: "0px 0" }}
                  />
                </div>
              </li>
              <li className="mt-3">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18.14px",
                  }}
                >
                  <p>
                    After installation, open VS Code and go to the Extensions
                    view by clicking on the square icon in the sidebar or
                    pressing Ctrl+Shift+X.
                  </p>
                  <img
                    src={vscode2}
                    alt="Visual Studio Code Icon"
                    style={{ maxWidth: "30%", height: "40vh", margin: "0px 0" }}
                  />
                </div>
              </li>
              <li className="mt-3">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18.14px",
                  }}
                >
                  <p>Search for "SQLite Viewer" and install the extension.</p>
                  <img
                    src={vscode3}
                    alt="Visual Studio Code Icon"
                    style={{ maxWidth: "30%", height: "40vh", margin: "0px 0" }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="card mb-4">
          <div
            className="card-header text-white"
            style={{ backgroundColor: "#404040" }}
          >
            STEP 2: Install Python
          </div>
          <div className="card-body">
            <ul>
              <li>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18.14px",
                  }}
                >
                  <p>
                    Download Python from the
                    <a
                      href="https://www.python.org/downloads/"
                      target="_blank"
                      className="text-dark"
                    >
                      {" "}
                      official Python website
                    </a>{" "}
                    and follow the installation instructions.
                  </p>
                  <div
                    style={{
                      width: "560px",
                      height: "315px",
                      overflow: "hidden",
                    }}
                  >
<iframe src="https://drive.google.com/file/d/1pirCjinIjea9PnRrCkXnzKDZ0ucu_1QH/preview"
        width="100%" height="100%" allow="autoplay" frameborder="0" allowfullscreen>
</iframe>
                  </div>
                </div>
              </li>
              <li className="mt-3">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18.14px",
                  }}
                >
                  <p>
                    To open Command Prompt, go to Start, search for cmd, and
                    click on Command Prompt, or press Win + R, type cmd, and hit
                    Enter.
                  </p>
                </div>
              </li>
              <li className="">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "18.14px",
                  }}
                >
                  <p>
                    Make sure to add Python to your system PATH during
                    installation.
                  </p>
                  <div
                    style={{
                      width: "560px",
                      height: "315px",
                      overflow: "hidden",
                    }}
                  >
                    <iframe src="https://drive.google.com/file/d/1noY-0dgPkr0PIH75Ah3LChjIfyt-Ue0w/preview"
        width="100%" height="100%" allow="autoplay; encrypted-media" frameborder="0" allowfullscreen>
</iframe>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="card mb-4">
          <div
            className="card-header text-white"
            style={{ backgroundColor: "#404040" }}
          >
            STEP 3: Download and Set Up the Zip File
          </div>
          <div className="card-body">
            <ul>
              <li>
                <p>
                  Download the provided zip file and extract its contents. Open
                  the extracted folder in VS Code.
                </p>
                <button
                  onClick={handleDownload}
                  className="btn btn-sm btn-outline-primary mb-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Downloading...
                    </>
                  ) : (
                    "Download Zip file"
                  )}
                </button>
              </li>
              <li>
                <p>
                  Navigate to the project directory in the terminal and install
                  the required dependencies by running:
                </p>
                <pre className="bg-light p-2">
                  pip install -r requirements.txt
                </pre>
              </li>
              <li>
                <p>
                  Once the dependencies are installed, start the project by
                  running:
                </p>
                <pre className="bg-light p-2">python app.py</pre>
              </li>
              <li>
                <p>This will run the project on your local machine.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="card mb-4">
          <div
            className="card-header text-white"
            style={{ backgroundColor: "#404040" }}
          >
            STEP 4: Building and Developing Pages
          </div>
          <div className="card-body">
            <p>
              You can now start building your pages and replace the placeholder
              content in the VS Code project.
            </p>
          </div>
        </div>

        <p className="text-center">
          That's it! You've successfully set up a basic development environment.
          Happy coding!
        </p>
        <p className="text-center">To start building pages</p>
        <div className="text-center mb-3">
          <Button onClick={handleHomePage} className="btn btn-primary">
            Click here..!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InstructionPage;

import React, { useMemo, useEffect, useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  Modal,
  IconButton,
} from "@mui/material";
import BugReportIcon from "@mui/icons-material/BugReport";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
// import Hexagon from "../../components/Hexagon";
import CoursePageHeaderHome from './CoursePageHeaderHome'
import {Spinner } from 'react-bootstrap';
import  DetailPanel from './DetailPanel'
import HeaderHome from "./HeaderHome";
import CryptoJS from 'crypto-js';
function Tickets() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");

 const secretKey = 'gvhbfijsadfkefjnujrbghj';
 const encryptedStudentId = sessionStorage.getItem('StudentId');// Decrypt the data
 const decryptedStudentId = CryptoJS.AES.decrypt(encryptedStudentId, secretKey).toString(CryptoJS.enc.Utf8);
 const studentId = decryptedStudentId


 const fetchBugs = async () => {
    try {
      const bugsResponse = await axios.get(
        `https://surgebackend.azurewebsites.net/internshipreport/bugs/?student_id=${decryptedStudentId}`
      );
      setBugs(
        bugsResponse.data.map((bug) => ({ ...bug, studentname: undefined }))
      );
      if (bugsResponse.data.length > 0) {
        setStudentName(bugsResponse.data[0].studentname);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }; 
 
  useEffect(() => {
    fetchBugs();
  }, [studentId]);
 
  const columns = useMemo(
    () => [
      {
        accessorKey: "sl_id",
        header: "Ticket Number",
      },
      {
        accessorKey: "Issue_type",
        header: "Support Type",
      },
      {
        accessorKey: "Reported",
        header: "Reported Date",
        Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "Resolved",
        header: "Responded Date",
        Cell: ({ cell }) =>
          cell.getValue()
            ? new Date(cell.getValue()).toLocaleDateString()
            : "Not resolved",
      },
      {
        accessorKey: "BugStatus",
        header: "Status",
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={{
              color: cell.getValue() === "Pending" ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {cell.getValue()}
          </Box>
        ),
      },
    ],
    []
  );
 
  const table = useMaterialReactTable({
    columns,
    data: bugs,
    enableExpanding: true,
    initialState: {
      sorting: [
        {
          id: "BugStatus",
          desc: false,
        },
      ],
    },
    renderDetailPanel: ({ row }) => (
      <DetailPanel row={row} onCommentAdded={fetchBugs} />
    ),
  });
 
  if (loading) {
    
  }
 
  return (
    <div className=" container-fluid " style={{padding:'50px 20px 20px 40px'}}>
      <HeaderHome/>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border mx-2" style={{ color: '#3F51B5' }} /> Loading...
        </div>
      ) : (
        <div className='pt-2'>
                      
    <Box style={{ marginTop: "2%", marginLeft: "2%", marginRight: "2%" }}>
      {/* <Typography variant="h5" gutterBottom>
        Student Name: {studentName}
      </Typography> */}
      <MaterialReactTable table={table} />
    </Box>
    </div>
    )}
    </div>

  );
}
 
export default Tickets;
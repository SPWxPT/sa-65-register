import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { StudentInterface} from "../interfaces/IStudent";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetStudent } from "../services/HttpClientService";

// import { GenderInterface} from "../interfaces/IGender";
// import { GetGender } from "../services/HttpClientService";




function Students() {
  const [student, setStudent] = useState<StudentInterface[]>([]);

  const getStudent = async () => {
    let res = await GetStudent();  console.log(res)
    if (res) {
      setStudent(res);
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    { field: "STUDENT_NUMBER", headerName: "รหัสนักศึกษา", width: 200 },
    { field: "STUDENT_NAME", headerName: "ชื่อ-นามสกุล", width: 200 },
    { field: "Gender", headerName: "เพศ", width: 100 , valueFormatter: (params) => params.value.GENDER_NAME,},    
    { field: "Program", headerName: "หลักสูตรการศึกษา", width: 200 , valueFormatter: (params) => params.value.Program_name,},    
    { field: "Province", headerName: "จังหวัด", width: 200 , valueFormatter: (params) => params.value.Name,},    
       
  ];

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div>
      <Container maxWidth="md">
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลพนักงาน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/student/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={student}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Container>
    </div>
  );
}

export default Students;
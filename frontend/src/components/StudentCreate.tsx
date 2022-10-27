import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { StudentInterface } from "../interfaces/IStudent";
// import { CreateStudent } from "../services/HttpClientService";
// import { InputLabel, MenuItem } from "@mui/material";
import { GenderInterface } from "../interfaces/IGender";
import { ProvinceInterface } from "../interfaces/IProvince";
import { ProgramInterface } from "../interfaces/IProgram";
import { RoleInterface } from "../interfaces/IRole";
import {
  GetGender,
  GetProvince,
  GetRole,
  GetProgram,
  CreateStudent,
} from "../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function StudentCreate() {
  const [student, setStudent] = React.useState<StudentInterface>({});
  const [program, setProgram] =  React.useState<ProgramInterface[]>([]);
  const [gender, setGender] =  React.useState<GenderInterface[]>([]);
  const [province, setProvince] =  React.useState<ProvinceInterface[]>([]);
  const [role, setRole] =  React.useState<RoleInterface[]>([]);

  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof student;
    setStudent({
      ...student,
      [name]: event.target.value,
    });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof StudentCreate;
    const { value } = event.target;
    setStudent({ ...student, [id]: value });
  };

  const getGenders = async () => {
   let res = await GetGender();
   if (res) {
      setGender(res);
    }
  };

  const getProvinces = async () => {
    let res = await GetProvince();
    if (res) {
      setProvince(res);
    }
  };

  const getRole = async () => {
    let res = await GetRole();
    if (res) {
      setRole(res);
    }
  };

  const getProgram = async () => {
    let res = await GetProgram();
    if (res) {
      setProgram(res);
    }
  };

  useEffect(() => {
    getGenders();
    getProvinces();
    getRole();
    getProgram();
  }, []);


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  async function submit() {
     let data = {
      GenderID: convertType(student.GenderID),
      ProvinceID: convertType(student.ProvinceID),
      ProgramID: convertType(student.ProgramID),
      RoleID: convertType(student.RoleID),
      STUDENT_NUMBER: student.STUDENT_NUMBER,
      STUDENT_NAME: student.STUDENT_NAME,
      PERSONAL_ID: student.PERSONAL_ID,
      Password: student.Password,
    };
    console.log(data);

    let res = await CreateStudent(data);
    if (res) {
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
      <Paper>
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box sx={{ paddingX: 2, paddingY: 1 }}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              สร้างข้อมูลนักศึกษา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
          <Grid item xs={6}>
            <p>รหัสนักศึกษา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="STUDENT_NUMBER"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลรหัสนักศึกษา"
                value={student.STUDENT_NUMBER || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อ - นามสกุล</p>
              <TextField
                id="STUDENT_NAME"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่อ-นามสกุล"
                value={student.STUDENT_NAME || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รหัสประจำตัวประชาชน</p>
              <TextField
                id="PERSONAL_ID"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกรหัสบัตรประชาชน"
                value={student.PERSONAL_ID || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>รหัสผ่าน</p>
              <TextField
                id="Password"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกรหัสผ่าน"
                value={student.Password || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={student.GenderID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {gender.map((item: GenderInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.GENDER_NAME}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                native
                value={student.ProvinceID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ProvinceID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกจังหวัด
                </option>
                {province.map((item: ProvinceInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Name}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>หลักสูตร</p>
              <Select
                native
                value={student.ProgramID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ProgramID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหลักสูตรการศึกษา
                </option>
                {program.map((item: ProgramInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Program_name}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
              <p>บทบาท</p>
              <Select
                native
                value={student.RoleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoleID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกบทบาท
                </option>
                {role.map((item: RoleInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Role_name}
                </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/students"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึกข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default StudentCreate;

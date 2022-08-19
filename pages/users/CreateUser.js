import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/layouts";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";


const dataStatusPegawai = [
  {
    value: 1,
    label: "Organik",
  },
  {
    value: 2,
    label: "Non Organik",
  },
];
const CreateUsers = (props) => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [nippos, setNippos] = useState("");
  const [jabatan, setJabatan] = useState(0);
  const [kantor, setKantor] = useState(0);
  const [statusAkun, setStatusAkun] = useState(1);
  const [statusPeg, setStatusPeg] = useState(1);
  const [password, setPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [descErr, setDescErr] = useState('')

  const router = useRouter();
  const handleSubmit = async (event) => {
    setSubmit(!submit);
    event.preventDefault();

    const data = {
      nama: nama,
      email: email,
      nippos: statusPeg == 2 ? email : nippos,
      jabatan: jabatan,
      kantor: kantor,
      statusakun: statusAkun,
      statuspegawai: statusPeg,
      password: password,
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.TOKEN,
      },
      body: JSON.stringify(data),
    });
    const dat = await res;
    const resData = await dat.json();
    if (dat.status == 200) {
      router.push("/users/");
    } else {
      setSubmit(false);
      setError(true);
      setDescErr(resData.message)
    }
  }

  
  return (
    <Layout titleHead="Buat User">
      <Grid container spacing={5}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 400,
            }}
          >
             <Collapse in={error}>
        <Alert
        severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(false)
                setDescErr('')
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
            {/* hello */}
          terjasdi kesalahan : {descErr}
        </Alert>
      </Collapse>
            <Grid container sx={{ margin: 1 }}>
              <Grid item xs={12} md={8} lg={8}>
                <Typography variant="h6" component="h6">
                  Form Tambah User
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
              <TextField
                id="statusPegawai"
                select
                label="Status Pegawai"
                value={statusPeg}
                onChange={(e) => setStatusPeg(e.target.value)}
                fullWidth
                margin="normal"
                size="small"
              >
                {dataStatusPegawai.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                disabled={submit ? true : false}
                fullWidth
                label="Nama"
                id="nama"
                margin="normal"
                size="small"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              <TextField
              disabled={submit ? true : false}
                fullWidth
                label="Email"
                id="email"
                margin="normal"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {statusPeg == 1 ? (
                <TextField
                disabled={submit ? true : false}
                  fullWidth
                  label="NIPPOS"
                  id="nippos"
                  margin="normal"
                  size="small"
                  value={nippos}
                  onChange={(e) => setNippos(e.target.value)}
                />
              ) : null}
              <TextField
              disabled={submit ? true : false}
                fullWidth
                label="Jabatan"
                id="jabatan"
                margin="normal"
                size="small"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
              />
              <TextField
              disabled={submit ? true : false}
                fullWidth
                label="Kantor"
                id="kantor"
                margin="normal"
                size="small"
                value={kantor}
                onChange={(e) => setKantor(e.target.value)}
              />

              <TextField
              disabled={submit ? true : false}
                fullWidth
                label="Pawssword"
                id="password"
                type="password"
                margin="normal"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />



              <Button
              disabled={ submit ? true : false}
                type="submit"
                variant="contained"
                sx={{ float: "right", mt: 1 }}
              >
                      { submit ? <CircularProgress size={24} /> : 'Simpan' }
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

// export const getServerSideProps = async () => {
//   const bodyPost = { nippos: "" };
//   const res = await fetch("http://20.198.213.153:8001/getUser", {
//     method: "POST",
//     headers: {
//       Accept: "application.json",
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + process.env.TOKEN,
//     },
//     body: JSON.stringify(bodyPost),
//   });
//   const dataUser = await res.json();
//   return {
//     props: {
//       dataUser,
//     },
//   };
// };

export default CreateUsers;

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
  import { useEffect, useRef, useState } from "react";
  import { Layout } from "../../../components/layouts";
  import Alert from "@mui/material/Alert";
  import IconButton from "@mui/material/IconButton";
  import Collapse from "@mui/material/Collapse";
  import CloseIcon from "@mui/icons-material/Close";
  import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
  
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
  const UpdateUser = (props) => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState("");
    const [nippos, setNippos] = useState("");
    const [jabatan, setJabatan] = useState('');
    const [kantor, setKantor] = useState('');
    const [statusAkun, setStatusAkun] = useState(1);
    const [statusPeg, setStatusPeg] = useState(1);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);
    const [descErr, setDescErr] = useState("");
  
    const router = useRouter();
    let { dataKantor, dataJabatan, dataUser } = props;
    dataUser = dataUser[0]
    const form = useRef()
    useEffect(() => {
      console.log(dataUser);
      setNama(dataUser.nama)
      setEmail(dataUser.email)
      setNippos(dataUser.nippos)
      setKantor(dataUser.id_kantor);
      setJabatan(dataUser.id_jabatan);
      setStatusPeg(dataUser.status_pegawai)
    }, []);
  
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
      };
  
      const res = await fetch("/api/users/updateUser", {
        method: "PUT",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
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
        setDescErr(resData.message);
      }
    };
  
    return (
      <Layout titleHead="Buat User">
        <Grid container spacing={5}>
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
                        setError(false);
                        setDescErr("");
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  terjasdi kesalahan : {descErr}
                </Alert>
              </Collapse>
              <Grid container sx={{ margin: 1 }}>
                <Grid item xs={12} md={8} lg={8}>
                  <Typography variant="h6" component="h6">
                    Form Edit User
                  </Typography>
                </Grid>
              </Grid>
              <ValidatorForm
                  ref={form}
                  onSubmit={handleSubmit}
              >
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
                <TextValidator
                  disabled={submit ? true : false}
                  fullWidth
                  label="Nama"
                  id="nama"
                  margin="normal"
                  size="small"
                  value={nama}
                  onChange={e => setNama(e.target.value)}
                  validators={['required']}
                  errorMessages={['field harus diisi']}
                />
                <TextValidator
                  disabled={statusPeg == 2 ? true : false}
                  fullWidth
                  label="Email"
                  id="email"
                  margin="normal"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validators={['required', 'isEmail']}
                  errorMessages={['field harus diisi', 'format email salah']}
                />
                {statusPeg == 1 ? (
                  <TextValidator
                    disabled={submit ? true : false}
                    fullWidth
                    label="NIPPOS"
                    id="nippos"
                    margin="normal"
                    size="small"
                    value={nippos}
                    onChange={(e) => setNippos(e.target.value)}
                    validators={['required']}
                    errorMessages={['field harus diisi']}
                  />
                ) : null}
                <TextField
                  disabled={submit ? true : false}
                  id="jabatan"
                  select
                  label="jabatan"
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                  fullWidth
                  margin="normal"
                  size="small"
                >
                  {dataJabatan.map((option) => (
                    <MenuItem key={option.idjabatan} value={option.idjabatan}>
                      {option.namajabatan}
                    </MenuItem>
                  ))}
                </TextField>
  
                <TextField
                  disabled={submit ? true : false}
                  id="kantor"
                  select
                  label="kantor"
                  value={kantor}
                  onChange={(e) => setKantor(e.target.value)}
                  fullWidth
                  margin="normal"
                  size="small"
                >
                  {dataKantor.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.namaKantor}
                    </MenuItem>
                  ))}
                </TextField>
  
                <Button
                  disabled={submit ? true : false}
                  type="submit"
                  variant="contained"
                  sx={{ float: "right", mt: 1 }}
                >
                  {submit ? <CircularProgress size={24} /> : "Simpan"}
                </Button>
              </ValidatorForm>
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    );
  };
  
  export const getServerSideProps = async (context) => {
    const {id} = context.params
    
    const resUser = await fetch(process.env.URLUSERMANAGE + "/getUser", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.TOKEN,
      },
      body: JSON.stringify({ nippos: id }),
    });

    const resKantor = await fetch(process.env.URLUSERMANAGE + "/getKantor", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.TOKEN,
      },
      body: JSON.stringify({ nopend: "" }),
    });
  
    const resJabatan = await fetch(process.env.URLUSERMANAGE + "/getJabatan", {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.TOKEN,
      },
      body: JSON.stringify({ idJabatan: "" }),
    });
    const statusUser = await resUser;
    const dataUser = await statusUser.json();
    const dataKantor = await resKantor.json();
    const dataJabatan = await resJabatan.json();

    if (statusUser.status == 404) { 
      return {
        notFound: true,
      }
     }
  
    return {
      props: {
        dataKantor,
        dataJabatan,
        dataUser
      },
    };
  };
  
  export default UpdateUser;
  
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Layout } from "../../components/layouts";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useState } from "react";

const Users = (props) => {
  let { dataUser } = props;
  const router = useRouter();
  dataUser = dataUser.data

  const directEdit = (val) => {
    router.push("/users/update-user/" + val);
  };
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nippos, setNippos] = useState("");
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [descErr, setDescErr] = useState("");

  const handleDelete = async (value) => {
    setOpen(true);
    setSubmit(!submit);

    const data = { nippos: value };
    const res = await fetch("/api/users/deleteUser", {
      method: "DELETE",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dat = await res;

    const resData = await dat.json();
    if (dat.status == 200) {
      setOpen(false)
      setSubmit(false)
      router.push("/users/");
    } else {
      setSubmit(false);
      setError(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setNippos("");
    setError(false)
    setSubmit(false)
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: "nama",
      headerName: "nama",
      width: 150,
      editable: false,
    },
    {
      field: "nippos",
      headerName: "Nippos",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: false,
    },
    {
      field: "jabatan",
      headerName: "Jabatan",
      width: 110,
      editable: false,
    },
    {
      field: "status_pegawai",
      headerName: "Status Pegawai",
      width: 150,
      editable: false,
      renderCell: (value) =>
        value.row.status_pegawai == 1 ? (
          <Chip
            variant="outlined"
            label="Organik"
            color="primary"
            size="small"
          />
        ) : (
          <Chip
            variant="outlined"
            label="Non Organik"
            color="warning"
            size="small"
          />
        ),
    },
    {
      field: "status_akun",
      headerName: "Status akun",
      width: 110,
      editable: false,
      renderCell: (value) =>
        value.row.status_akun == 1 ? (
          <Chip variant="outlined" label="Aktif" color="success" size="small" />
        ) : (
          <Chip
            variant="outlined"
            label="Tidak Aktif"
            color="error"
            size="small"
          />
        ),
    },

    {
      field: "id",
      headerName: "Aksi",
      width: 100,
      editable: false,
      renderCell: (value) => {
        return (
          <ButtonGroup disableElevation variant="contained" aria-label="aksi">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() =>
                DialogDelete(value.row.nama, value.row.nippos, !open)
              }
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>

            <IconButton
              aria-label="edit"
              onClick={() => directEdit(value.row.nippos)}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        );
        // value.row.id == 1 ? <Chip label="Aktif" color="success" size="small" /> : <Chip label="Tidak Aktif" color="error" size="small" />
      },
    },
  ];

  const DialogDelete = (name, nippos, stat) => {
    setOpen(stat);
    setName(name);
    setNippos(nippos);
  };

  return (
    <Layout titleHead="List User">
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 400,
            }}
          >
            <Grid container sx={{ margin: 1 }}>
              <Grid item xs={12} md={8} lg={8}>
                <Typography variant="h6" component="h6">
                  Tabel User
                </Typography>
              </Grid>
              <Grid item lg={4} md={4} xs={12}>
                <Link href={"/users/CreateUser"}>
                  <Button
                    variant="outlined"
                    sx={{ float: "right", marginRight: 1 }}
                  >
                    Tambah User
                  </Button>
                </Link>
              </Grid>
            </Grid>
            <DataGrid
              getRowId={(a) => a.id}
              rows={dataUser}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Hapus akun"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           
            {submit ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              
              
              <p>
                {error ? <>Terjadi kesalahan silahkan coba lagi</> :
                (
                <>Apakah anda yakin akan menghapus data dengan nama : <b>{name}</b> dan Nippos/Email : <b>{nippos}</b></>
                )
              }
              </p>
              
            )
            }

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={submit ? true : false} onClick={handleClose}>
            Batal
          </Button>
          {error ? null : (
            <Button
              disabled={submit ? true : false}
              onClick={() => handleDelete(nippos)}
              autoFocus
            >
              Hapus
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const bodyPost = { nippos: "" };
  const res = await fetch(process.env.URLUSERMANAGE + "/getUser", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.TOKEN,
    },
    body: JSON.stringify(bodyPost),
  });
  const dataUser = await res.json();
  return {
    props: {
      dataUser,
    },
  };
};

export default Users;

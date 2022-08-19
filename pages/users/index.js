import { Button, Grid, Paper, Typography } from "@mui/material";
import { Layout } from "../components/layouts";
import { DataGrid } from "@mui/x-data-grid";

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
    width: 110,
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
    width: 110,
    editable: false,
  },
  {
    field: "status_akun",
    headerName: "Status akun",
    width: 110,
    editable: false,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const Users = (props) => {
  const { dataUser } = props;
  const tableUser = [];
  if (dataUser.length != 0) {
    dataUser.map((a, idx) => {
      tableUser.push({
        email: a.email,
        jabatan: a.jabatan,
        kantor: a.kantor,
        nama: a.nama,
        nippos: a.nippos,
        status_akun: a.status_akun,
        status_pegawai: a.status_pegawai,
        id: idx,
      });
    });
  }

  console.log(tableUser);

  // console.log(dataUser);
  return (
    <Layout titleHead="List User">
      <Grid container spacing={3}>
        {/* Chart */}
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
              <Button variant="outlined" sx={{float:'right', marginRight:1}}>Tambah User</Button>
              </Grid>
            </Grid>
            <DataGrid
              getRowId={(a) => a.id}
              rows={tableUser}
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
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const bodyPost = { nippos: "" };
  const res = await fetch("http://20.198.213.153:8001/getUser", {
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

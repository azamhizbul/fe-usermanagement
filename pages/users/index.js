import { Grid, Paper } from "@mui/material";
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
              height: 400,
            }}
          >
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
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaXBwb3MiOiI5NzIzMjU5MzEiLCJlbWFpbCI6ImFhYUBocy5jb2EiLCJleHAiOjE2NjA4MzM1MzN9.R8WPb7ef52_Acdz_V_iShZocMkAuBlKMq0a6cA8Q4E4",
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

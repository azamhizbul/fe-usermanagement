import {
  Box,
  Button, CircularProgress, Grid, Paper,
  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
  const Users = () => {
    const router = useRouter();
    useEffect(() =>{
      const kantor = async () => {
        const data = await getDataKantor()
        setStateKantor(data)
      }  
      kantor()
    },[])

    const getDataKantor = async () => {
      const reqBody = {kantor : ""}
      const rest = await fetch("/api/kantor", {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.TOKEN,
        },
        body: JSON.stringify(reqBody),
      });
      const dataUser = await rest;
      const dataRes = await dataUser.json();
      return dataRes.data
    }

    const [stateKantor, setStateKantor] = useState("")
    
    const columns = [
      {
        field: "nopend",
        headerName: "Nopend",
        width: 150,
        editable: false,
      },
      {
        field: "namaKantor",
        headerName: "Nama Kantor",
        width: 150,
        editable: false,
      },
      {
        field: "jnsKantor",
        headerName: "Jenis Kantor",
        width: 150,
        editable: false,
      },
      {
        field: "alamat",
        headerName: "Alamat",
        width: 250,
        editable: false,
      },
    ];
  
    return (
      <Layout titleHead="List Kantor">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                minHeight: 600,
              }}
            >
              <Grid container sx={{ margin: 1 }}>
                <Grid item xs={12} md={8} lg={8}>
                  <Typography variant="h6" component="h6">
                    Tabel Kantor
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <Link href={"/users/CreateUser"}>
                    <Button
                      variant="outlined"
                      sx={{ float: "right", marginRight: 1 }}
                    >
                      Tambah Kantor
                    </Button>
                  </Link>
                </Grid>
              </Grid>
              {stateKantor == "" ? 
              <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop:"auto",
                marginBottom:"auto",
              }}
            >
              <CircularProgress />
            </Box>
              :
               <DataGrid
                getRowId={(a) => a.id}
                rows={stateKantor}
                columns={columns}
                pageSize={100}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            }
            </Paper>
          </Grid>
        </Grid>
      </Layout>
    );
  };
  
  export default Users;
  
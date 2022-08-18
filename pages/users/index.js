import { Grid, Paper } from "@mui/material"
import { Layout } from "../components/layouts"
const Users = (props) => {
  const {dataUser} = props
  console.log(dataUser);
    return (
        <Layout titleHead="List User">
                  <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  
                </Paper>
              </Grid>
            </Grid>
        </Layout>
    )
}


export const getServerSideProps = async () => {
  const bodyPost = {nippos:""}
  const res = await fetch('http://20.198.213.153:8001/getUser',
  {
    method : 'POST',
    headers: {
      'Accept': 'application.json',
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaXBwb3MiOiI5NzIzMjU5MzEiLCJlbWFpbCI6ImFhYUBocy5jb2EiLCJleHAiOjE2NjA4MTg0ODV9.7LI_Lyiy33DAsVq8dffXhF0OAg2-2gLVme7YWa4_T88',
    },
    body: JSON.stringify(bodyPost)
  }
  )
  console.log(res);
  const dataUser = await res.json()
  return {
    props:{
      dataUser
    }
  }
}

export default Users
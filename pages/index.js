import { Grid, Paper } from "@mui/material"
import { Layout } from "./components/layouts"

const Home = () => {
  return (
    <Layout titleHead="Home">
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

export default Home
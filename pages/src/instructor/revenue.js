import { useState, useEffect } from "react"
import axios from "axios"

import { stripeCurrencyFormatter } from ".././../../utils/currency"
import { useRouter } from "next/router"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn"
import SettingsIcon from "@mui/icons-material/Settings"
import { CircularProgress } from "@mui/material"
import { Container, CssBaseline, Grid, Typography } from "@material-ui/core"
import { Box } from "@mui/system"
import { wrapper } from "../../../redux/store"
import { getSession, useSession } from "next-auth/react"
import { loadUser } from "../../../redux/user/userAction"
import { parseCookies } from "nookies"
import { useDispatch, useSelector } from "react-redux"
import { sendBalanceRequest } from "../../../redux/instructor/instrActions"

const InstructorRevenue = () => {
  const router = useRouter()

  const dispatch = useDispatch()

  const accountBalance = useSelector((state) => state.accountBalance)
  const { loading, error, balance } = accountBalance

  const { data: session } = useSession()

  const cookies = parseCookies()
  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  useEffect(() => {
    let isCancelled = false
    if (!isCancelled) {
      dispatch(sendBalanceRequest(user))
    }
    return () => {
      isCancelled = true
    }
  }, [])

  const handlePayoutSettings = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
      const { data } = await axios.get("/api/instructor/payout", config)
      // console.log(data)

      router.push(data)
    } catch (err) {
      // setLoading(false)
      console.log(err)
      alert("Unable to access payout settings. Try later.")
    }
  }

  return (
    <>
      <Box style={{ marginLeft: "6rem", marginTop: "1rem" }}></Box>
      <Container component="main" maxWidth="sm">
        <Box style={{ marginLeft: "6rem", marginBottom: "2rem" }}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">
                Revenue report <MonetizationOnIcon className="float-right" />{" "}
              </Typography>
              <small>
                You get paid directly from stripe to your bank account every 48
                hour
              </small>
              <hr />

              <Typography variant="h5">
                Pending balance{" "}
                {/* {balance?.pending &&
                    balance?.pending.map((bp, i) => (
                      <span key={i} className="float-right">
                        {stripeCurrencyFormatter(bp)}
                      </span>
                    ))} */}
              </Typography>
              <small>For last 48 hours</small>
              <hr />
              <Typography variant="h5">
                Payouts{" "}
                {!loading ? (
                  <SettingsIcon
                    className="float-right pointer"
                    onClick={handlePayoutSettings}
                  />
                ) : (
                  <CircularProgress />
                )}
              </Typography>
              <small>
                Update your stripe account details or view previous payouts.
              </small>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req })
      const cookies = parseCookies()

      const user = cookies?.user
        ? JSON.parse(cookies.user)
        : session?.user
        ? session?.user
        : req.cookies.user && JSON.parse(req.cookies.user)

      store.dispatch(loadUser(user?.email, user))

      return {
        props: {
          session,
        },
      }
    }
)

export default InstructorRevenue

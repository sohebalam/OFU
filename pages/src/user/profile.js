import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Checkbox from "@mui/material/Checkbox"
import { Alert } from "@mui/lab"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles"
import Container from "@mui/material/Container"
import PersonIcon from "@mui/icons-material/Person"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { getSession } from "next-auth/react"
import Link from "next/link"
import { Box } from "@mui/material"
import { parseCookies } from "nookies"
import { useSession, signIn, signOut } from "next-auth/react"
// import cookie from "js-cookie"
import axios from "axios"
import { loadUser } from "../../../redux/user/userAction"
import { dispatch } from "react-redux"
import { wrapper } from "../../../redux/store"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profile: {
    marginTop: theme.spacing(19),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Dashboard = () => {
  const { dbUser, loading, message } = useSelector((state) => state.profile)

  // //console.log(dbUser)
  const router = useRouter()
  const dispatch = useDispatch()

  const cookies = parseCookies()

  const { data: session } = useSession()

  const user = dbUser || session?.user || cookies.user
  // const { email } = user && user
  const email = user?.email

  // //console.log(user)

  const subscriber = "subscriber"

  const userRole = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    try {
      if (!user.role) {
        const { data } = await axios.post(
          `/api/user/update`,
          { subscriber, email },
          config
        )
      }
    } catch (error) {
      //console.log(error)
    }
  }

  useEffect(() => {
    if (!session && !cookies?.user) {
      router.push("/src/user/login")
    }
    userRole()
  }, [router])
  const classes = useStyles()

  const submitHandler = (e) => {
    // e.preventDefault()
    // const userData = {
    //   name,
    //   email,
    //   password,
    // }
    // dispatch(updateProfile(userData))
    // router.reload()
  }

  const onChange = (e) => {
    //console.log("update")
    // setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        user && (
          <Grid container>
            <Grid item sm={4}>
              <Box mt="0.5rem">{/* <UserNav /> */}</Box>
            </Grid>

            <Grid item sm={4}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Update Profile
                  </Typography>
                  {loading && <CircularProgress />}
                  {message && <Alert severity="success">{message}</Alert>}
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={submitHandler}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          autoComplete="name"
                          name="name"
                          variant="outlined"
                          required
                          fullWidth
                          id="Name"
                          label="Name"
                          autoFocus
                          value={user?.name || ""}
                          onChange={onChange}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={user?.email || ""}
                          onChange={onChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          // value={user?.password || ""}
                          onChange={onChange}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Update Profile
                    </Button>
                    <Grid container justifyContent="flex-end"></Grid>
                  </form>
                </div>
              </Container>
            </Grid>
            <Grid item sm={4}>
              <Box styles={{ marginTop: "1rem" }}>
                <Container component="main" maxWidth="xs">
                  <div className={classes.profile}>
                    {user && (
                      <div>
                        <p>Signed in as {user?.email}</p>
                        <p>Name: {user?.name}</p>

                        {user && Array.isArray(user?.role) ? (
                          user?.role.map((role) => (
                            <>
                              <p>Role: {role}</p>
                            </>
                          ))
                        ) : (
                          <>
                            <p>Role: {role}</p>
                          </>
                        )}

                        {/* <img src={dbUser?.image} alt={dbUser?.name} /> */}
                      </div>
                    )}
                  </div>
                </Container>
              </Box>
            </Grid>
          </Grid>
        )
      )}
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
        : ""

      store.dispatch(loadUser(user.email, user))

      return {
        props: {
          session,
        },
      }
    }
)

export default Dashboard

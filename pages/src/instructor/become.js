import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser, regInstructor } from "../../../redux/user/userAction"
import { getSession } from "next-auth/react"
import {
  Button,
  Typography,
  Container,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material"

const Become = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  const cookies = parseCookies()
  const { data: session } = useSession()

  const user = dbUser
    ? dbUser
    : cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  // //console.log("become", user)

  const router = useRouter()

  const newInstructor = useSelector((state) => state.newInstructor)
  const {
    loading: instructorLoading,
    error: instructorError,
    link,
  } = newInstructor

  useEffect(() => {
    if (link) {
      // window.location.href = link
      router.push(link)
    } else {
      instructorError
    }
  }, [link])

  const BecomeInstructor = async (e) => {
    e.preventDefault()

    // //console.log("Become Instructor")
    dispatch(regInstructor(user?.email))
  }

  return (
    <>
      <Typography variant="h3">Become an Instructor</Typography>

      {instructorLoading ? (
        <CircularProgress />
      ) : (
        <Container component="main">
          <Box mt="1rem">
            <Typography>
              Register with Stripe to receive payments from students
            </Typography>
          </Box>
          <Box mt="1rem">
            <Button
              onClick={BecomeInstructor}
              variant="contained"
              color="secondary"
              // disabled={(dbUser && (dbUser.role = "instructor")) || loading}
            >
              Register for Stripe
            </Button>
          </Box>
          {instructorError && <Alert severity="error">{instructorError}</Alert>}
        </Container>
      )}
    </>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default Become

import { useEffect } from "react"

import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { CircularProgress } from "@mui/material"
import { useRouter } from "next/router"
import { loadUser } from "../../redux/user/userAction"
import { getSession, useSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { wrapper } from "../../redux/store"

const StripeCallback = () => {
  const router = useRouter()
  const profile = useSelector((state) => state.profile)
  const { dbUser } = profile

  const { data: session } = useSession()

  const user = dbUser || session

  const dispatch = useDispatch()

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    if (user) {
      axios
        .post("/api/stripe/status", { email: user?.email }, config)
        .then((res) => {
          router.push("/src/instructor/dashboard")
          dispatch(loadUser())
        })
    }
  }, [user])

  return <CircularProgress />
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

export default StripeCallback

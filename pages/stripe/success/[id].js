import { useEffect, useState } from "react"
// import { SyncOutlined } from "@ant-design/icons"
// import UserRoute from "../../../components/routes/UserRoute"
import { useRouter } from "next/router"
import axios from "axios"
import { CircularProgress, Grid } from "@material-ui/core"
import { loadUser } from "../../../redux/user/userAction"
import { wrapper } from "../../../redux/store"
import { getSession, useSession } from "next-auth/react"
import { parseCookies } from "nookies"
import { useSelector } from "react-redux"

const StripeSuccess = () => {
  // router
  const router = useRouter()
  const { id } = router.query
  const cookies = parseCookies()
  const [loading, setLoading] = useState(false)

  // console.log(id)

  // useEffect(() => {
  //   if (id) successRequest()
  // }, [id])

  const profile = useSelector((state) => state.profile)
  const { dbUser } = profile

  const { data: session } = useSession()

  const user = dbUser || session

  const successRequest = async () => {
    if (user?._id && !/@gmail\.com$/.test(user?._id)) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }

      // console.log(config)

      const { data } = await axios.post(`/api/stripe/${id}`, {}, config)

      router.push(`/src/course/subscribed/${data?.course?.slug}`)
    }

    const { data } = await axios.post(`/api/stripe/${id}`)
    // //console.log("SUCCESS REQ DATA", data);
    router.push(`/user/course/${data?.course?.slug}`)
  }

  return (
    <>
      <body onLoad={successRequest()}>
        <Grid>
          <Grid item xs={9} mb="5">
            <div className="d-flex justify-content-center p-5">
              <CircularProgress />
            </div>
          </Grid>
          <Grid item xs={3} padding="5"></Grid>
        </Grid>
      </body>
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

      store.dispatch(loadUser(user?.email, user))

      return {
        props: {
          session,
        },
      }
    }
)

export default StripeSuccess

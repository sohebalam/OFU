import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import cookie from "js-cookie"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "../../redux/user/userAction"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import InstructorMenu from "./InstructorMenu"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import MenuButton from "./MenuButton"
import { Avatar, Grid } from "@mui/material"
import Image from "next/image"
export default function ButtonAppBar() {
  const cookies = parseCookies()
  const router = useRouter()
  const [userState, setUserState] = useState("")

  const { data: session } = useSession()
  // //console.log(cookies.token)
  const dispatch = useDispatch()

  // const profile = useSelector((state) => state.profile)
  // const { loading, error, dbUser } = profile

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  // //console.log(userState)
  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user)

    if (user) {
      // //console.log("header", user)
      dispatch(loadUser(user.email, user))
    }
  }, [router, setUserState])

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    setUserState("")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mr: 2, backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            size="large"
            // edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            // sx={{ flexGrow: 1 }}
          >
            <Link href="/">
              <Box>
                <Image
                  alt="Remy Sharp"
                  src="/ofulogo.png"
                  width={50}
                  height={50}
                />
              </Box>
            </Link>
          </IconButton>
          <Box sx={{ flexGrow: 1, mt: "1rem", ml: "1rem" }}>
            <Image alt="Remy Sharp" src="/logo2.png" width={150} height={50} />
          </Box>
          {/* <Typography variant="h6" component="div">
            {userState && userState.name}
          </Typography> */}

          {/* <Box sx={{ ml: 2 }}> */}
          {userState ? (
            <>
              <InstructorMenu setUserState={setUserState} />
              <MenuButton setUserState={setUserState} />
              {/* <Button color="inherit" onClick={logoutHandler}>
                <ExitToAppIcon />
                Logout
              </Button> */}
            </>
          ) : (
            <>
              <Link href="/src/user/login">
                <Button color="tertiary">Login</Button>
              </Link>
              <Link href="/src/user/register">
                <Button color="tertiary">Register</Button>
              </Link>
            </>
          )}
          {/* </Box> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

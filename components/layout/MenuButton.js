import React, { useEffect } from "react"
import { Button } from "@mui/material"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { signOut } from "next-auth/react"
import PersonIcon from "@mui/icons-material/Person"
// import Link from "next/link"
import { useSession } from "next-auth/react"
import { useSelector } from "react-redux"
import Link from "next/link"
import cookie from "js-cookie"
const MenuButton = ({ setUserState }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile
  const { data: session } = useSession()
  // //console.log(dbUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
    cookie.remove("token")
    cookie.remove("user")
    setUserState("")
    handleClose()
    // router.push("/user/login")
  }
  useEffect(() => {}, [dbUser])
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "black" }}
      >
        <PersonIcon style={{ marginRight: "0.25rem" }} />
        {dbUser?.name || session?.user.name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {dbUser && dbUser.role && dbUser.role.includes("instructor") ? (
          <div>
            {/* <Link href="/user/instructor/create">
              <MenuItem onClick={handleClose}>Create Course</MenuItem>
            </Link> */}
          </div>
        ) : (
          dbUser &&
          dbUser.isAllowed === true && (
            <div>
              <Link href="/user/instructor/new">
                <MenuItem onClick={handleClose}>Become instructor</MenuItem>
              </Link>
            </div>
          )
        )}
        {dbUser?.role === "admin" && (
          <div>
            <Link href="/">
              <MenuItem onClick={handleClose}>Rooms</MenuItem>
            </Link>

            <Link href="/">
              <MenuItem onClick={handleClose}>Courses</MenuItem>
            </Link>
            <Link href="/">
              <MenuItem onClick={handleClose}>Users</MenuItem>
            </Link>
          </div>
        )}

        <Link href="/src/user/profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link href={`/src/course/dashboard`}>
          <MenuItem onClick={handleClose}>My Courses</MenuItem>
        </Link>

        {/* <Link> */}
        <MenuItem onClick={handleSignout}>SignOut</MenuItem>
        {/* </Link> */}
      </Menu>
    </div>
  )
}

export default MenuButton

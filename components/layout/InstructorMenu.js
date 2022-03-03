import React, { useEffect } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { signOut } from "next-auth/react"
import PersonIcon from "@mui/icons-material/Person"
import Link from "next/link"
import LayersIcon from "@mui/icons-material/Layers"
import cookie from "js-cookie"

import { useSelector } from "react-redux"
import { Box } from "@mui/material"

const InstructorMenu = ({ setUserState }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  // //console.log(dbUser)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
        <LayersIcon style={{ marginRight: "0.25rem" }} />
        {dbUser && dbUser.role.includes("instructor")
          ? "Instructor"
          : "Become Instructor"}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box>
          <>
            <Link href="/src/instructor/create">
              <MenuItem onClick={handleClose}>Create Course</MenuItem>
            </Link>
          </>
          {!dbUser?.role.includes("instructor") ? (
            <Link href="/src/instructor/become">
              <MenuItem onClick={handleClose}>Become Instructor</MenuItem>
            </Link>
          ) : (
            <>
              <Link href="/src/instructor/dashboard">
                <MenuItem onClick={handleClose}>Instructor Dashboard</MenuItem>
              </Link>
              <Link href="/src/instructor/revenue">
                <MenuItem onClick={handleClose}>Account Dashboard</MenuItem>
              </Link>
            </>
          )}
        </Box>
      </Menu>
    </div>
  )
}

export default InstructorMenu

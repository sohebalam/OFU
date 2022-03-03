import { Container } from "@mui/material"
import Header from "./Header"
import Footer from "./Footer"
const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout

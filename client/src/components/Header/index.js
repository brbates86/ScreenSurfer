import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, Button, Image } from "@chakra-ui/react"
// import Auth from '../../utils/auth';
// import { CloseIcon, MenuIcon } from ".../Icons"

const MenuItems = (props) => {
  const { children, isLast, to = "/", ...rest } = props
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  )
}

const Header = (props) => {
  const [show, setShow] = React.useState(false)
  const toggleMenu = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={["whiteAlpha.900", "whiteAlpha.900", "whiteAlpha.900", "blue.500"]}
      color={["whiteAlpha.700", "whiteAlpha.500", "whiteAlpha.500", "whiteAlpha.900"]}
      {...props}
    >
      <Flex align="center">
      <Image src="/screensurferlogo.png" w={200} alt="logo-image"/>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
       
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/">Home</MenuItems>
          <MenuItems to="/search">Search</MenuItems>
          <MenuItems to="/profile">Profile</MenuItems>
          <MenuItems to="/login">Login</MenuItems>
          <MenuItems to="/signup" isLast>
            <Button
              size="sm"
              rounded="sm"
              color={["red.900", "red.950", "red.400", "whiteAlpha.900"]}
              bg={["whiteAlpha.500", "whiteAlpha.900", "whiteAlpha.900", "green.400"]}
              _hover={{
                bg: [
                  "blue.300",
                  "primary.500",
                  "primary.600",
                  "primary.600",
                ],
              }}
            >
              Create Account
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
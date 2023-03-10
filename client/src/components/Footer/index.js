import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaFilm, FaRegPlayCircle, FaGithub } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function SmallWithSocial() {
  return (
    <Box
      bg={useColorModeValue("blue.500", "gray.900")}
      color={useColorModeValue("whiteAlpha.900", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"4xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={5}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2023 ScreenSurfer All Rights Reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Movie Game"} href={"https://framed.wtf/"}>
            <FaRegPlayCircle />
          </SocialButton>
          <SocialButton
            label={"GitHub"}
            href={"https://github.com/brbates86/MyMovieTracker"}
          >
            <FaGithub />
          </SocialButton>
          <SocialButton label={"Letterboxd"} href={"https://letterboxd.com/"}>
            <FaFilm />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

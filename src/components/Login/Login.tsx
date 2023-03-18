import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  Center,
  Heading,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton() {
  return (
    <Center p={8}>
      <Button w={"full"} maxW={"md"} leftIcon={<FcGoogle />}>
        <Center>
          <Text>continue with google</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default function Login() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.100"}
      flexDir={"column"}
    >
      <Heading
        color={"green.500"}
        w={"100vw"}
        textAlign={"center"}
        bgColor={"#fff"}
        p={5}
        position={"absolute"}
        top={0}
      >
        greenbelt
      </Heading>
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Box bgColor={"#fff"} shadow={"lg"} rounded={"md"} p={5}>
          <GoogleButton />
          <Text
            fontSize={"xs"}
            fontStyle={"italic"}
            textAlign={"center"}
            color={"gray.500"}
          >
            only already authorized users can login
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
}

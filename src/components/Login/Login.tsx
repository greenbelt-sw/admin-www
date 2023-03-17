import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton() {
  return (
    <Center p={8}>
      <Button
        w={"full"}
        maxW={"md"}
        variant={"outline"}
        leftIcon={<FcGoogle />}
      >
        <Center>
          <Text>continue with google</Text>
        </Center>
      </Button>
    </Center>
  );
}

export default function Login() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box bgColor={"#fff"} p={5} rounded={"lg"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            sign in
          </Heading>
          <GoogleButton />
        </Box>
      </Stack>
    </Flex>
  );
}

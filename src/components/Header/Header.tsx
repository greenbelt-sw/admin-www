import { Box, Flex, Text, Button, Stack, Link } from "@chakra-ui/react";

interface HeaderProps {
  dark?: boolean;
}

export default function Header({ dark }: HeaderProps) {
  return (
    <Box
      backgroundColor={dark ? "rgb(26,131,75, .8)" : "rgba(255,255,255, .8)"}
      backdropFilter={"blur(5px)"}
      w={"100vw"}
      position={"fixed"}
      zIndex={1000}
    >
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={"start"}>
          <Text
            as={"h1"}
            color={dark ? "gray.100" : "green.500"}
            fontFamily={"Poppins"}
            fontWeight={"700"}
            fontSize={"2xl"}
            display={"flex"}
            alignItems={"center"}
          >
            <a href={"/greenbelt-client"}>
              greenbelt
              <Text display={"inline-flex"} color={"gray.400"}>
                .admin
              </Text>
            </a>
          </Text>
          <Stack
            direction={"row"}
            alignItems={"center"}
            ml={10}
            spacing={5}
            color={dark ? "gray.100" : "green.800"}
            display={{ base: "none", md: "inline-flex" }}
          >
            <Link href={"#about-us"}>returns</Link>
            <Link href={"#learn-more"}>users</Link>
          </Stack>
        </Flex>
        <Stack justify={"flex-end"} direction={"row"} spacing={6}>
          {dark ? undefined : (
            <Button
              as={"a"}
              rounded={"full"}
              fontSize={"sm"}
              fontWeight={600}
              color={dark ? "gray.800" : "white"}
              bg={dark ? "gray.100" : "green.500"}
              href={"#contact"}
              _hover={{
                bg: "green.400",
              }}
            >
              logout
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

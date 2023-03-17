import {
  Box,
  chakra,
  Container,
  Flex,
  Link,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";

const year = new Date().getFullYear();

const Logo = (props: any) => {
  return (
    <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
      <Text as={"h1"} fontWeight={"700"}>
        <a href={"/greenbelt-client"}>greenbelt</a>
      </Text>
    </Flex>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={"blackAlpha.100"}
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
        bg: "blackAlpha.200",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const handleFooterClick = (e: any) => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <Box bg={"gray.50"} color={"gray.700"}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <Link href={"/greenbelt-client"} onClick={handleFooterClick}>
            home
          </Link>
          <Link href={"#about-us"}>about us</Link>
          <Link href={"#learn-more"} onClick={handleFooterClick}>
            learn more
          </Link>
          <Link href={"#contact"} onClick={handleFooterClick}>
            contact
          </Link>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"} borderColor={"gray.200"}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © {year === 2023 ? 2023 : `2023-${year}`} greenbelt. all rights
            reserved
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Email"} href={"#contact"}>
              <EmailIcon />
            </SocialButton>
            <SocialButton label={"Phone"} href={"#contact"}>
              <PhoneIcon />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

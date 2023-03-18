import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  Stack,
} from "@chakra-ui/react";
import {
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useLocation } from "react-router-dom";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "dashboard", icon: FiCompass },
  { name: "returns", icon: FiTrendingUp },
  { name: "users", icon: FiUser },
  { name: "settings", icon: FiSettings },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={"gray.100"}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "flex" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 10, md: 60 }}>{children}</Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: "min-content" }}
      pos="fixed"
      h="full"
      {...rest}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <Box>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold" color={"green.500"}>
            greenbelt
          </Text>
          <CloseButton
            display={{ base: "flex", md: "none" }}
            onClick={onClose}
          />
        </Flex>
        <Stack>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          ))}
        </Stack>
      </Box>
      <Box mb={5}>
        <NavItem key={"logout"} icon={FiLogOut}>
          logout
        </NavItem>
      </Box>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  const location = useLocation();
  const currentPage = location.pathname.slice(1);
  const isCurrentPage = currentPage === children;
  return (
    <Button
      w={"min-content"}
      borderLeftRadius={0}
      borderRightRadius={"full"}
      as={"a"}
      href={"/" + children}
      bgColor={isCurrentPage ? "green.200" : "gray.100"}
      _hover={{
        bgColor: isCurrentPage ? "green.300" : "gray.200",
        pl: 5,
      }}
      transition={"all .1s ease"}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Button>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={"white"}
      borderBottomWidth="1px"
      borderBottomColor={"gray.200"}
      justifyContent="space-between"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" fontWeight="bold">
        greenbelt
      </Text>

      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
        opacity={0}
      />
    </Flex>
  );
};

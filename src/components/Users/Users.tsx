import {
  Button,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  Input,
  Select,
  useDisclosure,
  FormControl,
  FormLabel,
  ModalFooter,
  Tooltip,
} from "@chakra-ui/react";
import { FiPlus, FiTrash } from "react-icons/fi";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

interface User {
  name: string;
  email: string;
  role: "administrator" | "editor" | "viewer";
}

const users: User[] = [
  {
    name: "Alice Adams",
    email: "alice@example.com",
    role: "administrator",
  },
  {
    name: "Bob Brown",
    email: "bob@example.com",
    role: "editor",
  },
  {
    name: "Charlie Clark",
    email: "charlie@example.com",
    role: "viewer",
  },
  {
    name: "David Davis",
    email: "david@example.com",
    role: "administrator",
  },
  {
    name: "Emily Evans",
    email: "emily@example.com",
    role: "editor",
  },
  {
    name: "Frank Fisher",
    email: "frank@example.com",
    role: "viewer",
  },
  {
    name: "Grace Green",
    email: "grace@example.com",
    role: "administrator",
  },
  {
    name: "Henry Hill",
    email: "henry@example.com",
    role: "editor",
  },
  {
    name: "Isabel Ingram",
    email: "isabel@example.com",
    role: "viewer",
  },
  {
    name: "Jack Jackson",
    email: "jack@example.com",
    role: "administrator",
  },
  {
    name: "Kate King",
    email: "kate@example.com",
    role: "editor",
  },
  {
    name: "Liam Lee",
    email: "liam@example.com",
    role: "viewer",
  },
  {
    name: "Mia Mitchell",
    email: "mia@example.com",
    role: "administrator",
  },
  {
    name: "Nate Nelson",
    email: "nate@example.com",
    role: "editor",
  },
  {
    name: "Olivia Owens",
    email: "olivia@example.com",
    role: "viewer",
  },
  {
    name: "Peter Parker",
    email: "peter@example.com",
    role: "administrator",
  },
  {
    name: "Quinn Quinn",
    email: "quinn@example.com",
    role: "editor",
  },
  {
    name: "Ryan Roberts",
    email: "ryan@example.com",
    role: "viewer",
  },
  {
    name: "Sarah Scott",
    email: "sarah@example.com",
    role: "administrator",
  },
  {
    name: "Tom Thompson",
    email: "tom@example.com",
    role: "editor",
  },
];

const roleOptions = ["administrator", "editor", "viewer"];

function AddUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userData = {
    name: "Dwight Schrute",
    email: "dwight.schrute@dundermifflin.com",
    role: "assistant",
  };

  return (
    <>
      <Flex w={"full"} justifyContent={"right"}>
        <Button size={"sm"} onClick={onOpen} leftIcon={<FiPlus />} mb={1}>
          Add User
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder={userData.name} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input placeholder={userData.email} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select placeholder={`   `}>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function RemoveUser({ userData }: { userData: User }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex w={"full"} justifyContent={"right"}>
        <Tooltip label="Remove User" placement="bottom">
          <Button size={"sm"} onClick={onOpen} mb={1}>
            <FiTrash />
          </Button>
        </Tooltip>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to remove <b>{userData.name}</b>?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3}>
              Remove
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Users() {
  return (
    <Flex minH={"100vh"} bg={"gray.100"} pb={10} pr={10}>
      <Box w={"full"}>
        <BreadcrumbHandler />
        <AddUser />
        <TableContainer
          bgColor={"#fff"}
          rounded={"md"}
          shadow={"md"}
          h={"min-content"}
          w={"full"}
        >
          <Table variant="simple">
            <TableCaption>{`${users.length} total users`}</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th isNumeric>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(({ name, email, role }) => {
                return (
                  <Tr>
                    <Td>{name}</Td>
                    <Td>
                      <InputGroup size="sm">
                        <Input
                          placeholder="Email"
                          defaultValue={email}
                          disabled={role === "administrator"}
                          variant="filled"
                        />
                      </InputGroup>
                    </Td>
                    <Td>
                      <Select
                        defaultValue={role}
                        size="sm"
                        disabled={role === "administrator"}
                        variant="filled"
                      >
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td isNumeric>
                      <RemoveUser userData={{ name, email, role }} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

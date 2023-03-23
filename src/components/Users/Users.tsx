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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";
import axios from "axios";

const roleOptions = ["administrator", "editor", "viewer"];

function AddUser() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

  const isDisabled = role == null || name == null || email == null;

  const handleNameChange = (e: any) => {
    let value = e.target.value;
    if (value === "") {
      setName(null);
    } else setName(value);
  };
  const handleEmailChange = (e: any) => {
    let value = e.target.value;
    if (
      value === "" ||
      !value.includes("@") ||
      !value.includes(".") ||
      value.length < 5
    ) {
      setEmail(null);
    } else setEmail(value);
  };
  const handleRoleChange = (e: any) => {
    let value = e.target.value;
    if (value === "") {
      setRole(null);
    } else setRole(value);
  };

  const handleAddClick = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:3000/api/v1/users", {
        role,
        name,
        email,
      })
      .then((res) => {
        setIsLoading(false);
        toast({
          title: "User added.",
          description: "User successfully added!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast({
          title: "Error adding user.",
          description: "There was an error adding the user.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        onClose();
      });
  };

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
              <Input placeholder={userData.name} onChange={handleNameChange} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder={userData.email}
                onChange={handleEmailChange}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select placeholder={`   `} onChange={handleRoleChange}>
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleAddClick}
              isLoading={isLoading}
              isDisabled={isDisabled}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function RemoveUser(userData: any, setUsersVersion: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveClick = () => {
    setIsLoading(true);
    axios
      .delete("http://localhost:3000/api/v1/users", {
        data: {
          id: userData.userData._id.$oid,
        },
      })
      .then((res) => {
        toast({
          title: "User removed.",
          description: "User successfully removed!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
        setIsLoading(false);
        onClose();
      })
      .catch((err) => {
        toast({
          title: "Error removing user.",
          description: "There was an error removing the user.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
      });
  };

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
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleRemoveClick}
              isLoading={isLoading}
            >
              Remove
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function UserRow(userData: any) {
  let { key, name, email, role, _id } = userData.userRow;

  const toast = useToast();

  const uploadChanges = (isRole: boolean, e: any) => {
    let data = isRole
      ? {
          id: _id.$oid,
          email: email,
          role: e.target.value,
        }
      : {
          id: _id.$oid,
          email: e.target.value,
          role: role,
        };
    axios
      .put("http://localhost:3000/api/v1/users", data)
      .then((res) => {
        toast({
          title: "User updated.",
          description: "User successfully updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          title: "Error updating user.",
          description: "There was an error updating the user.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <Tr key={key}>
      <Td>{name}</Td>
      <Td>
        <InputGroup size="sm">
          <Input
            placeholder="Email"
            defaultValue={email}
            disabled={role === "administrator"}
            variant="filled"
            onBlur={(e) => {
              uploadChanges(false, e);
            }}
          />
        </InputGroup>
      </Td>
      <Td>
        <Select
          defaultValue={role}
          size="sm"
          disabled={role === "administrator"}
          variant="filled"
          onChange={(e) => {
            uploadChanges(true, e);
          }}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </Select>
      </Td>
      <Td isNumeric>
        <RemoveUser userData={{ _id, name, email, role }} />
      </Td>
    </Tr>
  );
}

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<[]>([]);
  const toast = useToast();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error fetching users.",
          description: "There was an error fetching the users.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  }, [toast]);

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
            {isLoading ? (
              <Tbody>
                <Tr>
                  <Td colSpan={4} textAlign={"center"}>
                    <Spinner />
                  </Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {users.map(({ _id, name, email, role }, key) => {
                  return (
                    <UserRow
                      key={key}
                      userRow={{ name, email, role, key, _id }}
                    />
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}

import { AttachmentIcon } from "@chakra-ui/icons";
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  SimpleGrid,
  GridItem,
  FormControl,
  Input,
  FormLabel,
  ModalFooter,
  Flex,
  Tooltip,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

function AddCompany() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const formRef = useRef({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    shopify_key: "",
    shopify_secret: "",
  });

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/v1/companies", {
        company: formRef.current,
      })
      .then((res) => {
        window.location.reload();
        toast({
          title: "Company added.",
          description: "We've added the company for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
        onClose();
      })
      .catch((err) => {
        toast({
          title: "An error occurred.",
          description: "Unable to add company.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setIsLoading(false);
      });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof formRef.current
  ) => {
    formRef.current[field] = e.target.value;
  };

  const companyData = {
    company: {
      name: "Dunder Mifflin",
    },
    contactEmail: "info@dundermifflin.com",
    contactPhone: "555-123-4567",
    address: {
      street: "1725 Slough Avenue",
      city: "Scranton",
      state: "PA",
      zip: "18505",
    },
    shopifyApiKey: "********************",
    secretKey: "********************",
  };

  return (
    <>
      <Flex w={"full"} justifyContent={"right"}>
        <Button size={"sm"} onClick={onOpen} leftIcon={<FiPlus />} mb={1}>
          Add Company
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Company</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder={companyData.company.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder={companyData.contactEmail}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    placeholder={companyData.contactPhone}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Street</FormLabel>
                  <Input
                    placeholder={companyData.address.street}
                    onChange={(e) => handleChange(e, "street")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>City</FormLabel>
                  <Input
                    placeholder={companyData.address.city}
                    onChange={(e) => handleChange(e, "city")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>State</FormLabel>
                  <Input
                    placeholder={companyData.address.state}
                    onChange={(e) => handleChange(e, "state")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>ZIP</FormLabel>
                  <Input
                    placeholder={companyData.address.zip}
                    onChange={(e) => handleChange(e, "zip")}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Shopify API Key</FormLabel>
                  <Input
                    placeholder={companyData.shopifyApiKey}
                    onChange={(e) => handleChange(e, "shopify_key")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Secret Key</FormLabel>
                  <Input
                    placeholder={companyData.secretKey}
                    onChange={(e) => handleChange(e, "shopify_secret")}
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              isLoading={isLoading}
              onClick={handleSubmit}
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

function RemoveCompany({ company }: { company: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const handleRemove = () => {
    axios
      .delete(`http://localhost:8080/api/v1/companies/${company._id.$oid}`)
      .then((res) => {
        window.location.reload();
        toast({
          title: "Company removed.",
          description: "We've removed the company for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        onClose();
      })
      .catch((err) => {
        toast({
          title: "An error occurred.",
          description: "Unable to remove company.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
      <Tooltip label="Remove Company" placement="bottom">
        <Button
          size={"sm"}
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
        >
          <FiTrash />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to remove <b>{company.name}</b>?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleRemove}>
              Remove
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Companies() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const toast = useToast();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/companies")
      .then((response) => {
        setCompanies(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: "Unable to load companies.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  }, [toast]);

  function handleRowClick(id: any): void {
    const searchParams = new URLSearchParams();
    searchParams.set("company", id.$oid);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    const event = new Event("popstate");
    window.dispatchEvent(event);
  }

  return (
    <Box w={"full"}>
      <BreadcrumbHandler />
      <AddCompany />
      <TableContainer
        bgColor={"#fff"}
        rounded={"md"}
        shadow={"md"}
        h={"min-content"}
        w={"full"}
      >
        <Table variant="simple">
          <TableCaption>{`${companies.length} total companies`}</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          {isLoading ? (
            <Tbody>
              <Tr>
                <Td colSpan={2} textAlign={"center"}>
                  <Spinner />
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <Tbody>
              {companies.map(({ _id, name }, key) => {
                return (
                  <Tr
                    key={key}
                    _hover={{
                      backgroundColor: "gray.100",
                      cursor: "pointer",
                    }}
                    transition={"background-color 0.1s ease"}
                    onClick={() => handleRowClick(_id)}
                  >
                    <Td>{name}</Td>
                    <Td isNumeric>
                      <Tooltip label="Visit Site" placement="bottom">
                        <Button
                          mr={1}
                          size={"sm"}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        >
                          <AttachmentIcon />
                        </Button>
                      </Tooltip>
                      <RemoveCompany company={{ _id, name }} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}

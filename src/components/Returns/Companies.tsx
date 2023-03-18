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
} from "@chakra-ui/react";
import { FiPlus, FiTrash } from "react-icons/fi";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

const companies = [
  {
    id: 1038571,
    name: "Apple Inc.",
  },
  {
    id: 2038572,
    name: "Amazon.com Inc.",
  },
  {
    id: 3038573,
    name: "Alphabet Inc.",
  },
  {
    id: 4038574,
    name: "Facebook Inc.",
  },
  {
    id: 5038575,
    name: "Microsoft Corporation",
  },
  {
    id: 6038576,
    name: "Tesla Inc.",
  },
  {
    id: 7038577,
    name: "Netflix Inc.",
  },
  {
    id: 8038578,
    name: "JPMorgan Chase & Co.",
  },
  {
    id: 9038579,
    name: "Johnson & Johnson",
  },
  {
    id: 10038580,
    name: "Procter & Gamble Co.",
  },
  {
    id: 11038581,
    name: "The Goldman Sachs Group Inc.",
  },
  {
    id: 12038582,
    name: "Verizon Communications Inc.",
  },
  {
    id: 13038583,
    name: "The Coca-Cola Company",
  },
  {
    id: 14038584,
    name: "Walmart Inc.",
  },
  {
    id: 15038585,
    name: "Boeing Co.",
  },
  {
    id: 16038586,
    name: "Walt Disney Co.",
  },
  {
    id: 17038587,
    name: "Johnson Controls International plc",
  },
  {
    id: 18038588,
    name: "Exxon Mobil Corporation",
  },
  {
    id: 19038589,
    name: "The Home Depot Inc.",
  },
  {
    id: 20038590,
    name: "General Electric Co.",
  },
];

function AddCompany() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                  <Input placeholder={companyData.company.name} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder={companyData.contactEmail} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input placeholder={companyData.contactPhone} />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Street</FormLabel>
                  <Input placeholder={companyData.address.street} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>City</FormLabel>
                  <Input placeholder={companyData.address.city} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>State</FormLabel>
                  <Input placeholder={companyData.address.state} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>ZIP</FormLabel>
                  <Input placeholder={companyData.address.zip} />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Shopify API Key</FormLabel>
                  <Input
                    type="password"
                    placeholder={companyData.shopifyApiKey}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Secret Key</FormLabel>
                  <Input type="password" placeholder={companyData.secretKey} />
                </FormControl>
              </GridItem>
            </SimpleGrid>
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

function RemoveCompany({ company }: { company: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

export default function Companies() {
  function handleRowClick(id: number): void {
    const searchParams = new URLSearchParams();
    searchParams.set("company", id.toString());
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
              <Th>ID</Th>
              <Th>Name</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies.map(({ id, name }) => {
              return (
                <Tr
                  _hover={{
                    backgroundColor: "gray.100",
                    cursor: "pointer",
                  }}
                  transition={"background-color 0.1s ease"}
                  onClick={() => handleRowClick(id)}
                >
                  <Td>{id}</Td>
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
                    <RemoveCompany company={{ id, name }} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Box,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  FormControl,
  Input,
  ModalFooter,
  useDisclosure,
  SimpleGrid,
  GridItem,
  Select,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

const statusOptions = [
  { value: "received", label: "Received" },
  { value: "processing", label: "Processing" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "damaged", label: "Damaged" },
  { value: "complete", label: "Complete" },
  { value: "in progress", label: "In Progress" },
];

interface Return {
  id: number;
  orderId: number;
  orderDate: string;
  itemName: string;
  itemSku: string;
  quantity: number;
  returnedQuantity: number;
  returnReason: string;
  charity: string;
  status: string;
}

const returns: Return[] = [
  {
    id: 1,
    orderId: 1234,
    orderDate: "2022-03-15T12:34:56Z",
    itemName: "Nike Air Max 90",
    itemSku: "NKAM90-BLK",
    quantity: 2,
    returnedQuantity: 1,
    returnReason: "Damaged",
    charity: "Goodwill Industries International",
    status: "In Progress",
  },
  {
    id: 2,
    orderId: 5678,
    orderDate: "2022-03-10T09:12:34Z",
    itemName: "Adidas Ultraboost 21",
    itemSku: "ADUB21-WHT",
    quantity: 1,
    returnedQuantity: 1,
    returnReason: "Wrong size",
    charity: "The Salvation Army",
    status: "Complete",
  },
  {
    id: 3,
    orderId: 9101,
    orderDate: "2022-03-05T15:45:12Z",
    itemName: "Apple iPad Pro 12.9-inch",
    itemSku: "APDPRO129-GRY",
    quantity: 1,
    returnedQuantity: 1,
    returnReason: "Defective",
    charity: "Boys & Girls Clubs of America",
    status: "In Progress",
  },
  {
    id: 4,
    orderId: 2468,
    orderDate: "2022-03-02T08:30:00Z",
    itemName: "Samsung Galaxy S21",
    itemSku: "SGS21-BLK",
    quantity: 1,
    returnedQuantity: 0,
    returnReason: "",
    charity: "Feeding America",
    status: "Received",
  },
  {
    id: 5,
    orderId: 1357,
    orderDate: "2022-02-28T14:25:48Z",
    itemName: "Canon EOS R5",
    itemSku: "CNEOSR5-BDY",
    quantity: 1,
    returnedQuantity: 0,
    returnReason: "",
    charity: "St. Jude Children's Research Hospital",
    status: "Received",
  },
  {
    id: 6,
    orderId: 9753,
    orderDate: "2022-02-25T11:11:11Z",
    itemName: "Bose QuietComfort 35 II",
    itemSku: "BQC35II-BLK",
    quantity: 2,
    returnedQuantity: 2,
    returnReason: "Changed my mind",
    charity: "American Red Cross",
    status: "Complete",
  },
  {
    id: 7,
    orderId: 7531,
    orderDate: "2022-02-20T17:30:00Z",
    itemName: "Sony PlayStation 5",
    itemSku: "SONPS5-CON",
    quantity: 1,
    returnedQuantity: 1,
    returnReason: "Defective",
    charity: "United Way Worldwide",
    status: "In Progress",
  },
  {
    id: 8,
    orderId: 8642,
    orderDate: "2022-02-15T09:00:00Z",
    itemName: "LG OLED CX Series 65-inch TV",
    itemSku: "LGOLED65CX",
    quantity: 1,
    returnedQuantity: 1,
    returnReason: "Wrong item",
    charity: "United Way Worldwide",
    status: "In Progress",
  },
];

type ReturnsTableProps = {
  returns: Return[];
  companyData: any;
};

function ReturnsTable({ returns, companyData }: ReturnsTableProps) {
  function handleRowClick(id: number): void {
    const searchParams = new URLSearchParams();
    searchParams.append("company", companyData._id.$oid.toString());
    searchParams.append("return", id.toString());
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    const event = new Event("popstate");
    window.dispatchEvent(event);
  }
  return (
    <TableContainer
      bgColor={"#fff"}
      rounded={"md"}
      shadow={"md"}
      h={"min-content"}
      w={"full"}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID.Order ID</Th>
            <Th>Item</Th>
            <Th>Return Reason</Th>
            <Th isNumeric>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {returns.map((returnObj) => (
            <Tr
              _hover={{
                backgroundColor: "gray.100",
                cursor: "pointer",
              }}
              transition={"background-color 0.1s ease"}
              onClick={() => handleRowClick(returnObj.id)}
              key={returnObj.id}
            >
              <Td>{returnObj.id + "." + returnObj.orderId}</Td>
              <Td>{returnObj.itemName}</Td>
              <Td>{returnObj.returnReason}</Td>
              <Td isNumeric>
                <Select
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  defaultValue={returnObj.status.toLowerCase()}
                  size={"sm"}
                  variant={"filled"}
                >
                  {statusOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function EditCompanyDetails(companyData: any) {
  companyData = companyData.companyData;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formRef = useRef({
    id: companyData._id.$oid,
    name: companyData.name,
    email: companyData.email,
    phone: companyData.phone,
    street: companyData.street,
    city: companyData.city,
    state: companyData.state,
    zip: companyData.zip,
    shopify_key: companyData.shopify_key,
    shopify_secret: companyData.shopify_secret,
  });

  const toast = useToast();

  const handleSubmit = async () => {
    axios
      .put("http://localhost:3000/api/v1/companies", {
        ...formRef.current,
      })
      .then((res) => {
        toast({
          title: "Company updated.",
          description: "We've updated your company.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        window.location.reload();
        onClose();
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: "We were unable to update your company.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof formRef.current
  ) => {
    formRef.current[field] = e.target.value;
  };

  return (
    <>
      <Button onClick={onOpen} size={"sm"}>
        edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editting {companyData.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
              <GridItem>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    defaultValue={companyData.name}
                    onChange={(e) => handleChange(e, "name")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    defaultValue={companyData.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    defaultValue={companyData.phone}
                    onChange={(e) => handleChange(e, "phone")}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Street</FormLabel>
                  <Input
                    defaultValue={companyData.street}
                    onChange={(e) => handleChange(e, "street")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>City</FormLabel>
                  <Input
                    defaultValue={companyData.city}
                    onChange={(e) => handleChange(e, "city")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>State</FormLabel>
                  <Input
                    defaultValue={companyData.state}
                    onChange={(e) => handleChange(e, "state")}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>ZIP</FormLabel>
                  <Input
                    defaultValue={companyData.zip}
                    onChange={(e) => handleChange(e, "zip")}
                  />
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <FormLabel>Shopify API Key</FormLabel>
                  <Input
                    placeholder={"*******************"}
                    onChange={(e) => handleChange(e, "shopify_key")}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Secret Key</FormLabel>
                  <Input
                    placeholder={"*******************"}
                    onChange={(e) => handleChange(e, "shopify_secret")}
                  />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function CompanyInformation(companyData: any) {
  companyData = companyData.companyData;
  return (
    <TableContainer
      bgColor={"#fff"}
      rounded={"md"}
      shadow={"md"}
      h={"min-content"}
      w={"full"}
    >
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th isNumeric>Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{companyData._id.$oid}</Td>
            <Td>{companyData.name}</Td>
            <Td>{companyData.email}</Td>
            <Td isNumeric>{companyData.phone}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Street</Th>
            <Th>City</Th>
            <Th>State</Th>
            <Th isNumeric>ZIP</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{companyData.street}</Td>
            <Td>{companyData.city}</Td>
            <Td>{companyData.state}</Td>
            <Td isNumeric>{companyData.zip}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function CompanyDetails() {
  const [companyData, setCompanyData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const companyId = urlSearchParams.get("company");

  const toast = useToast();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/companies/" + companyId)
      .then((res) => {
        setCompanyData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Error loading company data",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  }, [toast, companyId]);

  return (
    <Box w={"full"}>
      <BreadcrumbHandler />
      {isLoading ? (
        <Skeleton>Test</Skeleton>
      ) : (
        <>
          <Heading
            size={"md"}
            py={1}
            w={"full"}
            display={"flex"}
            justifyContent={"space-between"}
          >
            {`Details`} <EditCompanyDetails companyData={companyData} />
          </Heading>
          <CompanyInformation companyData={companyData} />
          <Heading size={"md"} py={5}>
            {`Returns [${returns.length}]`}
          </Heading>
          <ReturnsTable returns={returns} companyData={companyData} />
        </>
      )}
    </Box>
  );
}

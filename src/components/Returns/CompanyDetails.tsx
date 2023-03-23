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
  { value: "completed", label: "Completed" },
  { value: "in progress", label: "In Progress" },
  { value: "pending", label: "Pending" },
];

type ReturnsTableProps = {
  returns: any[];
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
            <Th>Order ID.SKU</Th>
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
              onClick={() => handleRowClick(returnObj._id.$oid)}
              key={returnObj._id.$oid}
            >
              <Td>{returnObj.order_id + "." + returnObj.item_sku}</Td>
              <Td>{returnObj.item_name}</Td>
              <Td>{returnObj.return_reason}</Td>
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
            {`Returns [${companyData.returns.length}]`}
          </Heading>
          <ReturnsTable
            returns={companyData.returns}
            companyData={companyData}
          />
        </>
      )}
    </Box>
  );
}

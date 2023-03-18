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
  HStack,
  useRadio,
  useRadioGroup,
  useToast,
} from "@chakra-ui/react";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

interface Charity {
  id: number;
  name: string;
}

interface CompanyData {
  company: {
    id: number;
    name: string;
  };
  charities: Charity[];
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

const companyData: CompanyData = {
  company: {
    id: 1,
    name: "Greenbelt",
  },
  charities: [
    {
      id: 1,
      name: "Local Charity A",
    },
    {
      id: 2,
      name: "Local Charity B",
    },
    {
      id: 3,
      name: "Local Charity C",
    },
  ],
  contactEmail: "returns@greenbelt.com",
  contactPhone: "(555) 555-5555",
  address: {
    street: "123 Main St",
    city: "Providence",
    state: "RI",
    zip: "12345",
  },
};

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

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="md"
        _checked={{
          bg: "green.400",
          color: "white",
        }}
        px={3}
        py={1}
        fontSize={"sm"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function StatusGroup({ returnObj }: { returnObj: Return }) {
  const options = ["In Progress", "Complete", "Received"];

  const toast = useToast();

  const handleRadioClick = (value: string) => {
    toast({
      title: `Return ${returnObj.id}.${returnObj.orderId} status updated to "${value}"`,
      description: `SKU#${returnObj.itemSku}: ${returnObj.quantity}x${returnObj.itemName}`,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: returnObj.status,
    onChange: handleRadioClick,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard
            key={value}
            {...radio}
            onClick={() => handleRadioClick(value)}
          >
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

function ReturnsTable({ returns }: { returns: Return[] }) {
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
            <Tr key={returnObj.id}>
              <Td>{returnObj.id + "." + returnObj.orderId}</Td>
              <Td>{returnObj.itemName}</Td>
              <Td>{returnObj.returnReason}</Td>
              <Td isNumeric>
                <StatusGroup returnObj={returnObj} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

function EditCompanyDetails() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size={"sm"}>
        edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editting {companyData.company.name}</ModalHeader>
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
                  <Input placeholder={"*******************"} />
                </FormControl>

                <FormControl>
                  <FormLabel>Secret Key</FormLabel>
                  <Input placeholder={"*******************"} />
                </FormControl>
              </GridItem>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function CompanyInformation({ companyData }: { companyData: CompanyData }) {
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
            <Td>{companyData.company.id}</Td>
            <Td>{companyData.company.name}</Td>
            <Td>{companyData.contactEmail}</Td>
            <Td isNumeric>{companyData.contactPhone}</Td>
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
            <Td>{companyData.address.street}</Td>
            <Td>{companyData.address.city}</Td>
            <Td>{companyData.address.state}</Td>
            <Td isNumeric>{companyData.address.zip}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default function CompanyDetails() {
  return (
    <Box w={"full"}>
      <BreadcrumbHandler />
      <Heading
        size={"md"}
        py={1}
        w={"full"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        {`${companyData.company.name} Details`} <EditCompanyDetails />
      </Heading>
      <CompanyInformation companyData={companyData} />
      <Heading size={"md"} py={5}>
        {`${companyData.company.name} Returns [${companyData.charities.length}]`}
      </Heading>
      <ReturnsTable returns={returns} />
    </Box>
  );
}

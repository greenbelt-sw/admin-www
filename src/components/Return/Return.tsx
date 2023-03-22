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
  Input,
  Select,
} from "@chakra-ui/react";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

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

const r: Return = {
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
};

const statusOptions = [
  { value: "received", label: "Received" },
  { value: "processing", label: "Processing" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "completed", label: "Completed" },
];

export default function ReturnDetails() {
  const {
    id,
    orderId,
    orderDate,
    itemName,
    itemSku,
    quantity,
    returnedQuantity,
    returnReason,
    charity,
    status,
  } = r;
  return (
    <Box w={"full"}>
      <BreadcrumbHandler />
      <Heading
        size={"md"}
        py={1}
        w={"full"}
        display={"flex"}
        justifyContent={"space-between"}
        my={5}
      >
        {`Order Details`}
      </Heading>
      <TableContainer
        bgColor={"#fff"}
        rounded={"md"}
        shadow={"md"}
        h={"min-content"}
        w={"full"}
      >
        <Table variant="simple">
          <Thead>
            <Th>ID</Th>
            <Th>Order ID</Th>
            <Th>Order Date</Th>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{id}</Td>
              <Td>{orderId}</Td>
              <Td>{orderDate}</Td>
            </Tr>
          </Tbody>
          <Thead>
            <Th>SKU</Th>
            <Th>Quantity</Th>
            <Th>Item</Th>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{itemSku}</Td>
              <Td>{quantity}</Td>
              <Td>{itemName}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <Heading
        size={"md"}
        py={1}
        w={"full"}
        display={"flex"}
        justifyContent={"space-between"}
        my={5}
      >
        {`Return Details`}
      </Heading>
      <TableContainer
        bgColor={"#fff"}
        rounded={"md"}
        shadow={"md"}
        h={"min-content"}
        w={"full"}
      >
        <Table variant="simple">
          <Thead>
            <Th>Return Quantity</Th>
            <Th>Return Reason</Th>
            <Th>Charity</Th>
            <Th>Status</Th>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{returnedQuantity}</Td>
              <Td>{returnReason}</Td>
              <Td>
                <Input variant={"filled"} size={"sm"} defaultValue={charity} />
              </Td>
              <Td>
                <Select defaultValue={status} variant={"filled"} size={"sm"}>
                  {statusOptions.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </Select>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

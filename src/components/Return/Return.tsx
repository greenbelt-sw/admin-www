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
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

function LoadingSkele() {
  return <Skeleton>skele</Skeleton>;
}

function Return(r: any) {
  r = r.r;

  const toast = useToast();

  const handleSelectChange = (e: any) => {
    if (e.target.value === r.status) return;
    axios
      .put(
        `http://localhost:8080/api/v1/companies/${r.company_id}/returns/${r._id.$oid}`,
        {
          status: e.target.value.toLowerCase(),
        }
      )
      .then((res: any) => {
        toast({
          title: "Return status updated.",
          description: `Return status updated to ${e.target.value.toLowerCase()}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err: any) => {
        toast({
          title: "Error updating return status.",
          description: `Error updating return status to ${e.target.value.toLowerCase()}.`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  const handleCharityChange = (e: any) => {
    if (e.target.value === r.charity) return;
    axios
      .put(
        `http://localhost:8080/api/v1/companies/${r.company_id}/returns/${r._id.$oid}`,
        {
          charity: e.target.value,
        }
      )
      .then((res: any) => {
        toast({
          title: "Return charity updated.",
          description: `Return charity updated to ${e.target.value}.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err: any) => {
        toast({
          title: "Error updating return charity.",
          description: `Error updating return charity to ${e.target.value}.`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      });
  };

  return (
    <>
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
              <Td>{r._id.$oid}</Td>
              <Td>{r.order_id}</Td>
              <Td>{r.order_date}</Td>
            </Tr>
          </Tbody>
          <Thead>
            <Th>SKU</Th>
            <Th>Quantity</Th>
            <Th>Item</Th>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{r.item_sku}</Td>
              <Td>{r.quantity}</Td>
              <Td>{r.item_name}</Td>
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
              <Td>{r.returned_quantity}</Td>
              <Td>{r.return_reason === "" ? "-" : r.return_reason}</Td>
              <Td>
                <Input
                  variant={"filled"}
                  size={"sm"}
                  defaultValue={r.charity}
                  onBlur={handleCharityChange}
                  w={"max-content"}
                />
              </Td>
              <Td>
                <Select
                  w={"max-content"}
                  defaultValue={r.status}
                  variant={"filled"}
                  size={"sm"}
                  onChange={handleSelectChange}
                >
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
    </>
  );
}

export default function ReturnDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyQuery = searchParams.get("company") || null;
  const returnQuery = searchParams.get("return") || null;

  const [ret, setRet] = useState(null);
  useEffect(() => {
    if (returnQuery) {
      axios
        .get(
          `http://localhost:8080/api/v1/companies/${companyQuery}/returns/${returnQuery}`
        )
        .then((res: any) => {
          setRet(res.data);
        });
    }
  }, [returnQuery, companyQuery]);

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
      {ret ? <Return r={ret} /> : <LoadingSkele />}
    </Box>
  );
}

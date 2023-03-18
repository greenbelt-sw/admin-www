import { Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ReturnDetails from "../Return/Return";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";

export default function Returns() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyQuery = searchParams.get("company") || null;
  const returnQuery = searchParams.get("return") || null;

  return (
    <Flex minH={"100vh"} bg={"gray.100"} pb={10} pr={10}>
      {companyQuery ? (
        returnQuery ? (
          <ReturnDetails />
        ) : (
          <CompanyDetails />
        )
      ) : (
        <Companies />
      )}
    </Flex>
  );
}

import { Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";

export default function Returns() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("company") || null;

  return (
    <Flex minH={"100vh"} bg={"gray.100"} pb={10} pr={10}>
      {query ? <CompanyDetails /> : <Companies />}
    </Flex>
  );
}

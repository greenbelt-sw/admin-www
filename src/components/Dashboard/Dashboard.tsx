import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/companies")
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

  return (
    <Flex minH={"100vh"} bg={"gray.100"} pb={10} pr={10}>
      <Box w={"full"}>
        <BreadcrumbHandler />
        <Card>
          <CardBody>
            <Stack direction={"column"} spacing={5} overflowX="auto">
              <Button as={"a"} href="/returns">
                All Returns
              </Button>
              {isLoading ? (
                <Button isLoading />
              ) : (
                <>
                  {companies.map(({ _id, name }, key) => {
                    let a: any = _id;
                    return (
                      <Button
                        key={key}
                        as={"a"}
                        href={"/returns?company=" + a.$oid}
                      >
                        {name}
                      </Button>
                    );
                  })}
                </>
              )}
            </Stack>
          </CardBody>
        </Card>

        <Card mt={5}>
          <CardBody>
            <Stack direction={"row"} spacing={5} overflowX="auto">
              <Button as={"a"} href={"/users"}>
                Manage Users
              </Button>
              <Button as={"a"} href={"/settings"}>
                Settings
              </Button>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
}

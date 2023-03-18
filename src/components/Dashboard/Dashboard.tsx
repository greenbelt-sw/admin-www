import { Box, Button, Card, CardBody, Flex, Stack } from "@chakra-ui/react";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

const companies = [
  {
    id: 1,
    name: "Acme Corporation",
  },
  {
    id: 2,
    name: "Globex Industries",
  },
  {
    id: 3,
    name: "Stark Industries",
  },
];

export default function Dashboard() {
  return (
    <Flex minH={"100vh"} bg={"gray.100"} pb={10} pr={10}>
      <Box w={"full"}>
        <BreadcrumbHandler />
        <Card>
          <CardBody>
            <Stack direction={"row"} spacing={5} overflowX="auto">
              <Button as={"a"} href="/returns">
                All Returns
              </Button>
              {companies.map(({ name, id }) => {
                return (
                  <Button as={"a"} href={"/returns?company=" + id}>
                    {name}
                  </Button>
                );
              })}
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

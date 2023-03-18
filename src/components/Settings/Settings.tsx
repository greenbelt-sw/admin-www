import { Box, Button, Card, CardBody, Flex, Stack } from "@chakra-ui/react";
import BreadcrumbHandler from "../BreadcrumbHandler/BreadcrumbHandler";

export default function Settings() {
  return (
    <Flex minH={"100vh"} bg={"gray.100"} pb={10} pr={10}>
      <Box w={"full"}>
        <BreadcrumbHandler />
        <Card>
          <CardBody>
            <Stack direction={"row"} spacing={5} overflowX="auto">
              <Button>Settings</Button>
            </Stack>
          </CardBody>
        </Card>
      </Box>
    </Flex>
  );
}

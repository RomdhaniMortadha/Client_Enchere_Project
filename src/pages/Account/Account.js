import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import Setting from "./setting";
import Items from "./items";
const Account = () => {
  return (
    <Box m={{ base: "3rem 1rem", md: "3rem 6rem" }}>
      <Heading as="h4" size="md" m="1rem 1rem">
        My Account
      </Heading>
      <Tabs isFitted variant="enclosed" isLazy>
        <TabList>
          <Tab>Settings</Tab>
          <Tab>My items</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Setting align="center" />
          </TabPanel>
          <TabPanel>
            <Items align="center" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default Account;

import { useEffect, useState } from "react";
import { Table, Thead, Th, Tr, Tbody, Box } from "@chakra-ui/react";
import AvisCard from "../../components/UI/AvisCard";
import { GetAllAvis } from "../../services/avisService";
const ListAvis = () => {
  const [ListAvis, setListAvis] = useState([{}]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    listAvisHandler();
  }, []);
  const listAvisHandler = async () => {
    setisLoading(true);
    const result = await GetAllAvis();
    setListAvis(result.data);
    setisLoading(false);
  };
  return (
    <Box p="1rem" m={{ base: "1rem", md: "6rem" }}>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>E-mail</Th>
            <Th>Message</Th>
            <Th>Time</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading
            ? null
            : ListAvis.length > 0
            ? ListAvis.map((avis) => <AvisCard avis={avis} />)
            : "nothing to show  "}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ListAvis;

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { DeleteIcon, SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

const List = ({ list, delte }) => {
  const [text, setText] = useState({ search: "" });
  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) setIsFiltred(true);
    else setIsFiltred(false);

    setText({ search: value });
  };
  const regex = new RegExp(text.search, "i");

  const [isfiltred, setIsFiltred] = useState(false);

  return (
    <Table variant="striped" colorScheme="teal">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            variant="flushed"
            type="text"
            placeholder="search User with E-mail_Adress,User_Id"
            onChange={(e) => FilterChangeHandler(e.target.value)}
          />
        </InputGroup>
      </Thead>
      <Thead>
        <Tr>
          <Th>User_Id</Th>
          <Th>First_Name</Th>
          <Th>Last_Name</Th>
          <Th>E-mail_Adress</Th>
          <Th>Phone_Number</Th>
          <Th>Point</Th>
          <Th> modifier</Th>
        </Tr>
      </Thead>
      <Tbody>
        {isfiltred
          ? list
              .filter((user) => {
                if (regex.test(user.email) || regex.test(user._id)) {
                  return user;
                } else {
                  return null;
                }
              })
              .map(({ id, firstName, lastName, email, phone, point }) => (
                <Tr>
                  <Td>{id}</Td>
                  <Td>{firstName}</Td>
                  <Td>{lastName}</Td>
                  <Td>{email}</Td>
                  <Td>{phone}</Td>
                  <Td>{point}</Td>
                  <Td>
                    <IconButton
                      variant="outline"
                      //colorScheme="teal"
                      aria-label="delte user"
                      bg="transparent"
                      icon={<DeleteIcon />}
                      onClick={() => delte(id)}
                    />
                  </Td>
                </Tr>
              ))
          : list.map(({ id, firstName, lastName, email, phone, point }) => (
              <Tr>
                <Td>{id}</Td>
                <Td>{firstName}</Td>
                <Td>{lastName}</Td>
                <Td>{email}</Td>
                <Td>{phone}</Td>
                <Td>{point}</Td>
                <Td>
                  <IconButton
                    variant="outline"
                    //colorScheme="teal"
                    aria-label="Send email"
                    bg="transparent"
                    icon={<DeleteIcon />}
                    onClick={() => delte(id)}
                  />
                </Td>
              </Tr>
            ))}
      </Tbody>
    </Table>
  );
};
export default List;

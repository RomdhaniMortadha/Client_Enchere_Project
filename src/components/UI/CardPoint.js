import {
  Box,
  Heading,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  StackDivider,
  VStack,
  NumberInputField,
  HStack,
  Button,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import * as CarteAction from "../../store/actions/index";
//import {AllPack} from "../../services/PackService"
const CardPoint = ({ onAddItemsHandler }) => {
  const [packs, setPacks] = useState([
    {
      _id: "60956c4eeb0c431a43697075",
      price: 15,
      qtepoints: 120,
      __v: 0,
    },
    {
      _id: "6096a0a80e5dc01444fc12d1",
      price: 120,
      qtepoints: 100,
      __v: 0,
    },
    {
      _id: "6096a0bc0e5dc01444fc12d2",
      price: 220,
      qtepoints: 200,
      __v: 0,
    },
  ]);

  useEffect(() => {
    console.log("useEffect");
  }, []);

  /*const getAllPack = async () => {
    const pack = await AllPack();
    setPacks(pack);
  };*/

  const addToCartHandler = (id, price, qtepoints, value) => {
    onAddItemsHandler({
      id: id,
      name: `pack of ${qtepoints} point`,
      packof: qtepoints,
      amount: value,
      price: price,
      totalpoint: qtepoints * value,
    });
  };

  const [value, setValue] = useState(0);
  const handleChange = (value) => setValue(value);

  return (
    <Box
      p={18}
      w="60%"
      mr="20%"
      ml="20%"
      h="100%"
      bgGradient="linear(#E53E3E 0%,  #A0AEC0 25%, #CBD5E0 50%)"
    >
      {packs.map(({ _id, price, qtepoints }) => {
        return (
          <Box
            key={`bos${_id}`}
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            //{...rest}
          >
            <VStack
              key={`vstack${_id}`}
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
            >
              <HStack spacing="40%" key={`Hstack${_id}`}>
                <Heading fontSize="xl" key={`pack${_id}`}>
                  Pack of:
                </Heading>
                <Heading fontSize="xl" key={`Point${_id}`}>
                  {qtepoints}Point
                </Heading>

                <NumberInput
                  key={`numberinput${_id}`}
                  mr="2rem"
                  min={0}
                  value={value}
                  onChange={handleChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </HStack>

              <HStack spacing="41%" key={`hs${_id}`}>
                <Heading fontSize="xl" key={`priceheading${_id}`}>
                  Price:
                </Heading>
                <Heading fontSize="xl" key={`price${_id}`}>
                  {price}dt
                </Heading>

                <Button
                  colorScheme="#975A16"
                  variant="outline"
                  isDisabled={value <= 0 ? true : false}
                  onClick={() => addToCartHandler(_id, price, qtepoints, value)}
                >
                  Add to Carte
                </Button>
              </HStack>
            </VStack>
          </Box>
        );
      })}
    </Box>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddItemsHandler: (item) => dispatch(CarteAction.onAddItems(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardPoint);

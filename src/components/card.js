import {
  Badge,
  Image,
  Box,
  HStack,
  Avatar,
  VStack,
  Text,
  Button,
  useDisclosure,
  IconButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  Input,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
} from "@chakra-ui/react";
import openSocket from "socket.io-client";
import decode from "jwt-decode";
import { Icon } from "@chakra-ui/react";
import NotFound from "../assets/images/NotFound.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { apiBaseUrl } from "../services/utils";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { onEnchereParticipation } from "../services/AnnonceService";
const Card = ({ item }) => {
  let history = useHistory();
  const [anounce, setanounce] = useState(item);
  const [participation_price, setparticipation_price] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    setanounce(anounce);
    anounce.likes && setLikes(anounce.likes.length);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleInputChange = (e) => {
    setparticipation_price(e.target.value);
  };
  const socket = openSocket("http://localhost:5000");
  socket.on("posts/" + anounce._id, (data) => {
    if (data.action === "update") {
      setanounce(data.enchere);
    }
  });
  const onSubmitPriceHandler = async () => {
    const { userId, point } = decode(localStorage.getItem("token"));
    const user = userId;
    const lastprice =
      anounce?.enchere_list[anounce.enchere_list.length - 1]?.price ||
      anounce.initial_price;
    if (localStorage.getItem("token")) {
      if (point > 10) {
        const price = participation_price;
        if (price > lastprice) {
          const result = await onEnchereParticipation(anounce._id, {
            user,
            price,
          });
          console.log(result);
          setparticipation_price("");
          setanounce(result);
        }
      } else {
        history.push("/carte");
      }
    } else {
      history.push("/signin");
    }
  };
  const handlechange = () => {
    if (isOpen) setLikes((prevstate) => prevstate - 1);
    else setLikes((prevstate) => prevstate + 1);

    onToggle();
  };
  return (
    <Box
      transform="revert"
      boxShadow="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="300px"
      mb="5px"
    >
      <HStack px="6" py="3">
        <Avatar
          size="sm"
          name=""
          src={anounce.user && apiBaseUrl + "" + anounce.user.image}
        />
        <VStack py="1" spacing="0">
          <Button
            as="a"
            href={anounce.user && "/profile?_id=" + anounce.user._id}
            variant={"link"}
            alignSelf="flex-start"
            fontSize="xs"
          >
            {anounce.user &&
              anounce.user.firstname + " " + anounce.user.lastname}
          </Button>
          <Box
            color="gray.500"
            fontWeight="semibold"
            fontSize="xs"
            d="flex"
            alignItems="center"
          >
            {new Date(anounce.createdAt).toDateString() +
              " " +
              new Date(anounce.createdAt).toLocaleTimeString()}
          </Box>
        </VStack>
      </HStack>
      <Image
        maxHeight="200px"
        minHeight="200px"
        bg="gray.500"
        width="100%"
        src={
          anounce.image ? "http://localhost:5000/" + anounce.image : NotFound
        }
        alt={anounce.subject}
      />

      <Badge borderRadius="full" px="2" colorScheme="teal" ml="4" mt="-7">
        {(new Date(anounce.createdAt) > new Date() - 1) &&
          "New"}
      </Badge>
      <Box px="6" pb="2">
        <HStack mt="1">
          <Box
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            width="90%"
          >
            {anounce.subject}
          </Box>
          <Badge
            as="h4"
            variant="outline"
            colorScheme={anounce.__t === "Draw" ? "green" : "cyan"}
          >
            {anounce.price ? "" : anounce.__t}
          </Badge>
        </HStack>
        <Text color="gray.600" fontSize="xs" isTruncated>
          {anounce.details}...
        </Text>
        <HStack mb="1" >
          <HStack width="180px">
            <Text  isTruncated>
              {anounce.price
                ? "Price : " + anounce.price
                : anounce.initial_price
                ? "Actual price : " +
                  (anounce?.enchere_list[anounce.enchere_list.length - 1]
                    ?.price || anounce.initial_price)
                : "Participation : " + anounce.participation_price}
            </Text>
        <Text color="gray.600" fontSize="xs" >
          /Tnd
        </Text>
          </HStack>
          {anounce.__t === "Enchere" && (
            <Popover align="end">
              {anounce.isVlable ? (
                <PopoverTrigger>
                  <Button size="xs">Participate</Button>
                </PopoverTrigger>
              ) : (
                <Badge as="h4" variant="outline" colorScheme={"red"}>
                  Sold
                </Badge>
              )}

              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader>Participate :</PopoverHeader>
                  <PopoverCloseButton />
                  <PopoverBody> 
                  {"Expiry date: " + new Date(anounce.end_Date).toLocaleDateString()+" "+ new Date(anounce.end_Date).toLocaleTimeString()}
                  <br/>
                    {"Initial Price: " + anounce.initial_price}
                    <br />
                    {"Actual Price: " +
                      (anounce?.enchere_list[anounce.enchere_list.length - 1]
                        ?.price || anounce.initial_price)} 
                  </PopoverBody>
                  <PopoverFooter>
                    {localStorage.getItem("token") && (decode(localStorage.getItem("token")).userId ===
                    anounce.user._id )? (
                      "You can't participate ,it's Yours !"
                    ) : (
                      <HStack>
                        <Input
                          type="number"
                          value={participation_price}
                          onChange={handleInputChange}
                          placeholder="Your price"
                        />
                        <Button
                          colorScheme="blue"
                          onClick={onSubmitPriceHandler}
                        >
                          Submit
                        </Button>
                      </HStack>
                    )}
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
          )}
        </HStack>

        <hr />
        <Box d="flex" mt="1" alignItems="center">
          <Box
            alignItems="center"
            d="flex"
            as="span"
            ml="2"
            color="gray.600"
            fontSize="md"
          >
            {likes}
            <IconButton
              onClick={() => handlechange()}
              icon={
                isOpen ? <Icon as={FcLike} /> : <Icon as={FcLikePlaceholder} />
              }
              variant="link "
              aria-label={"Toggle Navigation"}
            />
          </Box>

          <Button
            ml="42%"
            color="gray.700"
            as="a"
            fontSize="sm"
            variant={"link"}
            isTruncated
            onClick={()=>history.push('/announce/?id='+anounce._id)}
          >
            Learn more...
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;

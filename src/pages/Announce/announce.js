import {
  Box,
  HStack,
  Grid,
  Image,
  GridItem,
  Button,
  VStack,
  Avatar,
  Badge,
  Text,
  Heading,
  Divider,
  Input,
} from "@chakra-ui/react";
import decode from "jwt-decode";
import { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { getAnnounce, deleteAnnounce } from "../../services/AnnonceService";
import { getCity } from "../../services/CityServices";
import { getUser } from "../../services/userServices";
import { apiBaseUrl } from "../../services/utils";
import ImageNotFound from "../../assets/images/NotFound.jpg";
import { ImLocation2, ImPhone, ImHeart } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { onEnchereParticipation } from "../../services/AnnonceService";
import { useHistory } from "react-router";
import Bip from "../../assets/sounds/bip.mp3";

const Announce = (props) => {
  const [city, setcity] = useState("");
  const [Winner, setWinner] = useState({
    _id: "",
    firstname: "",
    image: "",
    lastname: "",
    phone: "",
  });
  const [announce, setannounce] = useState({
    city: "",
    createdAt: "",
    details: "",
    image: "",
    isVlable: false,
    likes: [],
    phone: "",
    subcategorie: "",
    subject: "",
    updatedAt: "",
    user: "",
    __t: "",
    _id: new URLSearchParams(props.location.search).get("id"),
  });
  const [participation_price, setparticipation_price] = useState("");
  let history = useHistory();

  useEffect(() => {
    const id = new URLSearchParams(props.location.search).get("id");
    onGetAnnounceHandler(id);
  }, []);
  useEffect(() => {
    HandleWinner();
  }, [announce]);

  const onGetCityHandler = async (id) => {
    const result = await getCity(id);
    setcity(result.nom);
  };

  const onGetAnnounceHandler = async (id) => {
    const result = await getAnnounce(id);
    await onGetCityHandler(result.announce.city);
    setannounce(result.announce);
  };
  const handleInputChange = (e) => {
    setparticipation_price(e.target.value);
  };
  const socket = openSocket(apiBaseUrl);
  socket.on("posts/" + announce._id, async (data) => {
    if (data.action === "update") {
      if (announce.__t === "Enchere") {
        playSound();
        setannounce(data.enchere);
      }
    }
  });
  const playSound = () => {
    var audio = new Audio(Bip);
    audio.play();
  };
  const HandleWinner = async () => {
    if (announce.__t === "Enchere") {
      const length = announce.enchere_list.length - 1;
      const id = announce.enchere_list[length]?.user || null;
      id && setWinner(await getUser(id));
    }
  };
  const deletePostHandler = async () => {
    if (window.confirm("Are you sure to delete this post ?")) {
      await deleteAnnounce(announce._id);
      history.push("/");
    }
  };
  const onSubmitPriceHandler = async () => {
    const { userId, point } = decode(localStorage.getItem("token"));
    const user = userId;
    const lastprice =
      announce?.enchere_list[announce.enchere_list.length - 1]?.price ||
      announce.initial_price;
    if (localStorage.getItem("token")) {
      if (point > 10) {
        const price = participation_price;
        if (price > lastprice) {
          const result = await onEnchereParticipation(announce._id, {
            user,
            price,
          });
          console.log(result);
          setparticipation_price("");
          setannounce(result);
        }
      } else {
        history.push("/carte");
      }
    } else {
      history.push("/signin");
    }
  };
  return (
    <Box mx={{ base: "1rem", md: "6rem" }} my="3rem">
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
        gap={6}
      >
        <GridItem colSpan={2} display="flex" justifyContent="center">
          <Image
            src={announce.image ? apiBaseUrl + announce.image : ImageNotFound}
            alt={announce.subject}
          />
        </GridItem>
        <GridItem colSpan={3} mt="2rem">
          <Box display="flex" justifyContent="space-between">
            <Heading size="md" mb="1rem">
              {announce.subject}
            </Heading>
            <Badge
              fontSize="lg"
              h="100%"
              variant="outline"
              colorScheme={announce.__t === "Draw" ? "green" : "cyan"}
            >
              {announce.price ? "" : announce.__t}
            </Badge>
          </Box>

          <h2>{announce.details}</h2>
          <br />

          <Divider my="1rem" />
          <Box display="flex" justifyContent="space-between">
            <Heading fontSize="xl" mb="1rem">
              {announce.price
                ? "Price : " + announce.price
                : announce.initial_price
                ? "Actual price : " +
                  (announce?.enchere_list[announce.enchere_list.length - 1]
                    ?.price || announce.initial_price)
                : "Participation : " + announce.participation_price}
            </Heading>
            {localStorage.getItem("token") &&
              decode(localStorage.getItem("token")).userId ===
                announce.user._id && (
                <Button onClick={() => deletePostHandler()}>
                  <RiDeleteBin6Line /> Delete post
                </Button>
              )}
          </Box>
          <Box display="flex" justifyContent="space-between">
            {announce.isVlable ? (
              announce.__t === "Enchere" && (
                <Box>
                  {"Expiry date: " +
                    new Date(announce.end_Date).toLocaleDateString() +
                    " - " +
                    new Date(announce.end_Date).getHours() +
                    ":00"}
                  <br />
                  {"Initial Price: " + announce.initial_price}
                  <br />

                  {localStorage.getItem("token") &&
                  decode(localStorage.getItem("token")).userId ===
                    announce.user._id ? (
                    <Box color="tomato">
                      You can't participate ,it's Yours !
                    </Box>
                  ) : (
                    <HStack mt="1rem">
                      <Input
                        type="number"
                        value={participation_price}
                        onChange={handleInputChange}
                        placeholder="Put your price here"
                      />
                      <Button colorScheme="blue" onClick={onSubmitPriceHandler}>
                        Submit
                      </Button>
                    </HStack>
                  )}
                </Box>
              )
            ) : (
              <HStack display="flex" justifyContent="space-between">
                <Badge as="h1" variant="outline" colorScheme={"red"}>
                  Sold
                </Badge>
              </HStack>
            )}
          </Box>

          <Divider my="1rem" />
          <HStack mb="1rem">
            <ImLocation2 size="1.5em" />
            <Heading size="md" pl="2rem">
              {city}
            </Heading>
          </HStack>

          <HStack mb="1rem">
            <ImPhone size="1.5em" />
            <Heading size="md" pl="2rem">
              {announce.phone}
            </Heading>
          </HStack>

          <HStack mb="1rem">
            <ImHeart size="1.5em" />
            <Heading size="md" pl="2.3rem">
              {announce.likes.length}
            </Heading>
          </HStack>
          <Divider my="1rem" />

          <Box display="flex" justifyContent="space-between" flexDirection={{base:"column",md:"row"}}>
            <HStack px="6" py="3">
              <h1> Owner</h1>
              <Avatar
                size="lg"
                name=""
                src={announce.user && apiBaseUrl + "" + announce.user.image}
              />
              <VStack py="1" spacing="0">
                <Button
                  as="a"
                  href={announce.user && "/profile?_id=" + announce.user._id}
                  variant={"link"}
                  alignSelf="flex-start"
                  fontSize="xs"
                >
                  {announce.user &&
                    announce.user.firstname + " " + announce.user.lastname}
                </Button>
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  fontSize="xs"
                  d="flex"
                  alignItems="center"
                >
                  {new Date(announce.createdAt).toDateString() +
                    " " +
                    new Date(announce.createdAt).toLocaleTimeString()}
                </Box>
              </VStack>
            </HStack>
            {announce.__t === "Enchere" && announce.enchere_list.length > 0 ? (
              <HStack px="6" py="3">
                {announce.isVlable ? (
                  <h1>Last Partcipation:</h1>
                ) : (
                  <h1>Sold To</h1>
                )}
                <Avatar
                  size="lg"
                  name=""
                  src={Winner && apiBaseUrl + "" + Winner.image}
                />
                <VStack py="1" spacing="0">
                  <Button
                    as="a"
                    href={"/profile?_id=" + Winner._id}
                    variant={"link"}
                    alignSelf="flex-start"
                    fontSize="xs"
                  >
                    {Winner.firstname + " " + Winner.lastname}
                  </Button>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    fontSize="xs"
                    d="flex"
                    alignItems="center"
                  >
                    {"Phone : " + Winner.phone}
                  </Box>
                </VStack>
              </HStack>
            ) : null}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Announce;

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Heading,
  Tfoot,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  Table,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SmallAddIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { connect } from "react-redux";
import Badge from "@material-ui/core/Badge";
import AddShoppingCartOutlinedIcon from "@material-ui/icons/AddShoppingCartOutlined";
import decode from "jwt-decode";
import { apiBaseUrl } from "../../services/utils";
import { useHistory } from "react-router";
import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as CarteAction from "../../store/actions/index";
import Menu from "../UI/Menu";

const Navbar = ({ item, totalptice, moreItemsHandler, removeItemsHandler, selectedCateg,filterHandler }) => {
  const { isOpen, onToggle } = useDisclosure();
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

const redirecttoPay=()=>{
  history.push('/pay')
  handleClose()
}

  const NumberShop = item.reduce((curNumber, item) => {
    return Number(curNumber) + Number(item.amount);
  }, 0);

  const NumberItemShop = +Number(NumberShop);
  const hasItems = item.length > 0;

  const moreItemHandler = (id, price, qtepoints, value) => {
    moreItemsHandler({
      id: id,
      name: `pack of ${qtepoints} point`,
      amount: value,
      price: price,
    });
  };
  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <LinkBox>
          <LinkOverlay
            href="/"
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Enchere
          </LinkOverlay>
          </LinkBox>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={5}
        >
          {localStorage.getItem("token") ? (
            <>
              <IconButton
                display="inline-flex"
                onClick={handleClickOpen}
                icon={
                  <Badge badgeContent={NumberItemShop} color="secondary">
                    <AddShoppingCartOutlinedIcon />
                  </Badge>
                }
                variant={"ghost"}
                aria-label={"Toggle Navigation"}
              />
              <Avatar
                as="button"
                onClick={() => history.push("/account")}
                display="inline-flex"
                size="sm"
                name=""
                src={
                  localStorage.getItem("token") &&
                  apiBaseUrl + decode(localStorage.getItem("token")).image
                }
              />
              <Button
                display="inline-flex"
                fontWeight={400}
                variant={"link"}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.replace("/signin");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                display={localStorage.getItem("token") ? "none" : "inline-flex"}
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"/signin"}
              >
                Sign In
              </Button>


              <Button
                display={{ base: "none", md: "inline-flex" }}
                w="100%"
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                variant={"link"}
                href={"/signup"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Enchere Tunise vente Achat en ligne
          </DialogTitle>
          <DialogContent>
           
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>PACK </Th>
                    <Th>Price</Th>
                    <Th isNumeric>Amount</Th>
                    <Th>Total Price by Pack</Th>
                    <Th> </Th>
                  </Tr>
                </Thead>
                {item.map(({ name, price, amount, id }) => {
                  return (
                    <Tbody>
                      <Tr>
                        <Td>{name}</Td>
                        <Td>{price}dt</Td>
                        <Td>x{amount}</Td>
                        <Td> {amount * price}</Td>
                        <Td>
                          <Flex>
                            <IconButton
                              onClick={() => removeItemsHandler(id)}
                              variant="outline"
                              colorScheme="red.500"
                              aria-label="add more"
                              icon={<MinusIcon />}
                            />
                            <IconButton
                              onClick={() =>
                                moreItemHandler(id, price, name, 1)
                              }
                              variant="outline"
                              colorScheme="red.500"
                              aria-label="add more"
                              icon={<SmallAddIcon />}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    </Tbody>
                  );
                })}
                <Tfoot>
                  <Tr>
                    <Th> </Th>
                    <Th> Price </Th>
                    <Th> Totale:</Th>
                    <Th>{totalptice}</Th>
                  </Tr>
                </Tfoot>
              </Table>
            
            <Heading>total price :{totalptice}</Heading>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

            {hasItems && (
              <Button onClick={redirecttoPay} color="primary">
                Order
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link             
                p={2}
                href={navItem.href ?? null}
                fontSize={"sm"}
                fontWeight={500}
                _hover={{
                  textDecoration: "none",
                  color: "gray.800",
                }}  
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  let history=useHistory()

  return (
    <Link
     onClick={() => history.push(href)}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  let history=useHistory()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as='button'
        onClick={() => history.push(href)}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Add Announce",
    href: "/addannonce",

  },
  {
    label: "About us",
    href: "/",
  },
  {
    label: "Contact us",
    href: "/contactus",
  },
  {
    label: "Buy Points",
    href: "/carte",
  },
  {
    label:"Serach",
    href:<Menu/>
  }
];

const mapStateToProps = (state) => {
  return {
    item: state.carte.items,
    totalptice: state.carte.totalAmount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    moreItemsHandler: (item) => dispatch(CarteAction.onAddItems(item)),
    removeItemsHandler: (id) => dispatch(CarteAction.onRemoveItems(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
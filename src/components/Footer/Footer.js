import { Box, Stack, ButtonGroup, IconButton, Text } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="12"
    px={{ base: "4", md: "8" }}
  >
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <Text fontSize="lg">Enchere</Text>
        <ButtonGroup variant="ghost" color="gray.600">
          <IconButton
            as="a"
            href="#"
            aria-label="LinkedIn"
            icon={<FaLinkedin fontSize="20px" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="GitHub"
            icon={<FaGithub fontSize="20px" />}
          />
          <IconButton
            as="a"
            href="#"
            aria-label="Twitter"
            icon={<FaTwitter fontSize="20px" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
        &copy; {new Date().getFullYear()} Envelope, Inc. All rights reserved.
      </Text>
    </Stack>
  </Box>
);
export default Footer;

import React from "react";
import { Portal ,Box} from "@chakra-ui/react"
const pageNotFound=()=>{

return (
    <Box bg="red.400" color="white">
    I'm here,
    <Portal>This text is portaled at the end of document.body!</Portal>
  </Box>
    
)
}
export default pageNotFound
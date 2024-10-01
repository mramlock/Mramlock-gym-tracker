import { Box, Flex, Text, Container, Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { IoMoon } from "react-icons/io5";  // Importing the moon icon
import { LuSun } from "react-icons/lu";  // Importing the sun icon
import CreateUserModal from './CreateUserModel';


const Navbar = ({ setUsers }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"900px"}>
      <Box px={4} my={4} borderRadius={5} bg={"red.700"}>
        <Flex h="16" alignItems={"center"} justifyContent={"space-between"}>
          {/* Left side */}
          <Flex alignItems={"center"} justifyContent={"center"} gap={3} display={{ base: "none", sm: "flex" }}>
            <Text fontSize={"25px"} fontWeight={500}> MRAMLOCKS GYM TRACKER💪</Text>
          </Flex>

          {/* Right side */}
          <Flex gap={3} alignItems={"center"}>
            <Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>
              Challenge Yourself! 🔥
            </Text>

            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
            </Button>
            <CreateUserModal setUsers={setUsers}/>

          </Flex>
        </Flex>
      </Box>
    </Container>
  );
};

export default Navbar;
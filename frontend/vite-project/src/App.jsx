import { Button, Container, Stack, Text } from "@chakra-ui/react"
import React from "react"
import Navbar from "./components/Navbar"
import UserGrid from "./components/UserGrid"
import { useState } from "react";

export const BASE_URL = import.meta.env.MODE === "development" ? "http://127.0.0.1:5000/api" : "/api";
function App() {
  const [users, setUsers] = useState([])
  return (
    <Stack minH={"100vh"}>
    <Navbar setUsers={setUsers}/>

    <Container maxW={"1200px"} my={4}>
      <Text
      	fontSize={{ base: "3xl", md: "50" }}
        fontWeight={"bold"}
        letterSpacing={"2px"}
        textTransform={"uppercase"}
        textAlign={"center"}
        mb={8}
        >
          <Text
          as={"span"}
          bgGradient={"linear(to-r, red.500, purple.600)"} bgClip={"text"}
          >
            Workouts🏋️
          </Text>
      </Text>
      <UserGrid users={users} setUsers ={setUsers} />
      </Container>
      </Stack>
  )
}

export default App

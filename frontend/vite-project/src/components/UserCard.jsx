import { Avatar, Box, Card, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import EditModal from './EditModal'
import { BASE_URL } from '../App'


function UserCard({user, setUsers}) {
    const toast = useToast()
  const handleDeleteUser = async() =>{
    try {
        const res = await fetch(BASE_URL + "/workouts/" + user.id, {
            method: "DELETE",
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error(data.error)
        }
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id))
        toast({
            status: "success",
            title: "Success",
            description: "Workout deleted successfully.",
            duration: 2000,
            position: "top-center",
        })
    } catch (error) {
        toast({
            title: "An error occurred",
            description: error.message,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-center",
        })
        
    }
  }
  return (
    <Card>
        <CardHeader>
            <Flex gap={4}>
                <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                
                <Box>
                    <Heading size={'md'}>{user.name}</Heading>
                    <Text mt={4}>{user.desc}</Text>
                </Box>

                </Flex>
                <Flex>
                    <EditModal
                    user={user}
                    setUsers={setUsers}
                     />
                    <IconButton
                    variant='ghost'
                    colorScheme='red'
                    size={"sm"}
                    aria-label='See menu'
                    icon={<BiTrash size={20}/>}
                    onClick={handleDeleteUser}
                    />
                </Flex>
            </Flex>

        </CardHeader>
    </Card>
  )
}

export default UserCard
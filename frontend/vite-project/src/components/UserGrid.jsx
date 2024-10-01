import { Grid, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { USERS } from './sample/dummy';
import UserCard from './UserCard';
import { BASE_URL } from '../App';

const UserGrid = ({users, setUsers}) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=> {
    const getUsers = async () => {
      try {
        const res = await fetch(BASE_URL+"/workouts")
        const data = await res.json()
        if (!res.ok){
          throw new Error(data.error)
        }
        setUsers(data)
      } catch (error) {
        console.error(error)
      }finally{
        setIsLoading(false)
      }
    }
    getUsers()
  }, [setUsers])
  const [filter, setFilter] = useState(''); // State to hold the selected filter

  // Function to handle filter changes
  const handleFilterChange = (bodyPart) => {
    setFilter(bodyPart); // Set the filter to the selected bodyPart
  };

  // Filter users based on the selected bodyPart
  const filteredUsers = filter ? users.filter(user => user.bodyPart === filter) : users;

  return (
    <>
      {/* Filter buttons */}
      <Flex gap={4} mb={4}>
        <Button onClick={() => handleFilterChange('')} colorScheme={filter === '' ? 'blue' : 'gray'}>
          All
        </Button>
        <Button onClick={() => handleFilterChange('back')} colorScheme={filter === 'back' ? 'blue' : 'gray'}>
          Back
        </Button>
        <Button onClick={() => handleFilterChange('legs')} colorScheme={filter === 'legs' ? 'blue' : 'gray'}>
          Legs
        </Button>
        <Button onClick={() => handleFilterChange('chest')} colorScheme={filter === 'chest' ? 'blue' : 'gray'}>
          Chest
        </Button>
      </Flex>

      {/* User cards */}
      <Grid 
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={4}
      >
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} setUsers={setUsers}/>
        ))}
      </Grid>

      {isLoading && (
        				<Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
              </Flex>
      )}
      			{!isLoading && users.length === 0 && (
				<Flex justifyContent={"center"}>
					<Text fontSize={"xl"}>
						<Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
							Lets Begin!💪
						</Text>
						No Workouts Added.
					</Text>
				</Flex>
			)}
    </>
  );
  
}

export default UserGrid
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import {BiAddToQueue} from "react-icons/bi"
import React, { useState } from 'react'
import { BASE_URL } from '../App';

function CreateUserModel({setUsers}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const[isLoading, setIsLoading] = useState(false)
  const[inputs, setInputs] = useState({
    name: "",
    desc: "",
    bodyPart:""

  })
  const toast = useToast()
  const handleCreateUser = async(e) =>{
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch(BASE_URL + "/workouts", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
        
      })

      const data = await res.json()
      if (!res.ok){
        throw new Error(data.error)
      }

			toast({
				status: "success",
				title: "Good Job! 🎉",
				description: "Workout created successfully.",
				duration: 2000,
				position: "top-center",
			});
      onClose()
      setUsers((prevUsers) => [...prevUsers, data])
      setInputs({
        name: "",
        desc: "",
        bodyPart: "",
      })//clear inputs
    } catch (error) {
      toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
    }finally{
      setIsLoading(false)

    }
  }
  return (
    <>
    <Button onClick={onOpen}>
      <BiAddToQueue size={20}/>

    </Button>
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    >
      <ModalOverlay/>
      <form onSubmit={handleCreateUser}>
      <ModalContent>
        <ModalHeader> New Workout 🏋️</ModalHeader>
        <ModalCloseButton/>
        <ModalBody pb={6}>
          <Flex alignItems={"center"} gap={4}>
            <FormControl>
              <FormLabel>Workout Name</FormLabel>
              <Input placeholder='Bench Press'
              value={inputs.name}
              onChange={(e) => setInputs({...inputs, name: e.target.value})}
              />
            </FormControl>
          </Flex>
          <FormControl mt={4}>
            <FormLabel>Best Set and Reps/Notes</FormLabel>
            <Textarea resize={"none"} overflowY={"hidden"} placeholder='225 pounds for 6 reps'
                          value={inputs.desc}
                          onChange={(e) => setInputs({...inputs, desc: e.target.value})}/>
          </FormControl>
          <RadioGroup mt={4}>
            <Flex gap={5}>
              <Radio value='chest'
              onChange={(e) => setInputs({...inputs, bodyPart: e.target.value})}>Chest</Radio>
              <Radio value='back'onChange={(e) => setInputs({...inputs, bodyPart: e.target.value})}>Back</Radio>
              <Radio value='legs'onChange={(e) => setInputs({...inputs, bodyPart: e.target.value})}>Legs</Radio>
            </Flex>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' mr={3} type='submit' isLoading={isLoading}>
            Add
          </Button>
          <Button onClick={onClose} colorScheme='red'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
      </form>
    </Modal>
    </>
  )
}

export default CreateUserModel
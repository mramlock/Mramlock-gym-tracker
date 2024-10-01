 import {
 	Button,
 	Flex,
 	FormControl,
 	FormLabel,
 	IconButton,
 	Input,
 	Modal,
 	ModalBody,
 	ModalCloseButton,
 	ModalContent,
 	ModalFooter,
 	ModalHeader,
 	ModalOverlay,
 	Radio,
 	RadioGroup,
 	Textarea,
 	useDisclosure,
	  useToast,
 } from "@chakra-ui/react";
import React, { useState } from "react";
 import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

 function EditModal({setUsers, user}) { 	
const { isOpen, onOpen, onClose } = useDisclosure();
 const [isLoading, setIsLoading] = useState(false)
 const [inputs, setInputs] = useState({
	desc: user.desc
})
const toast = useToast()
const handleEditUser = async(e) =>{
	e.preventDefault()
	setIsLoading(true)
	try {
		const res = await fetch(BASE_URL + "/workouts/" + user.id, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(inputs)
		})
		const data = await res.json()
		console.log(data); 
		if(!res.ok){
			throw new Error(data.error)
		}
		setUsers((prevUsers) =>
			prevUsers.map((u) => 
			  u.id === user.id ? data : u // Ensure data structure is merged correctly
			)
		  );

		toast({
			status: "success",
			title: "Good Job! 🎉",
			description: "Workout updated successfully.",
			duration: 2000,
			position: "top-center",
		});
		onClose()
	} catch (error) {
		toast({
			status: "error",
			title: "An error occurred.",
			description: error.message,
			duration: 4000,
			position: "top-center",
		});
	} finally{
		setIsLoading(false)
	}

}

 	return (
 		<>
			<IconButton
 				onClick={onOpen}
				variant='ghost'
 				colorScheme='blue'
 				aria-label='See menu'
				size={"sm"}
 				icon={<BiEditAlt size={20} />}
 			/>

<Modal
    isOpen={isOpen}
    onClose={onClose}
    >
      <ModalOverlay/>
	  <form onSubmit={handleEditUser}>
      <ModalContent>
        <ModalHeader> Edit Workout 🏋️</ModalHeader>
        <ModalCloseButton/>
        <ModalBody pb={6}>
  
          <FormControl mt={4}>
            <FormLabel>Best Set and Reps/Notes</FormLabel>
            <Textarea resize={"none"} overflowY={"hidden"} placeholder='225 pounds for 6 reps'
			value ={inputs.desc}
			onChange={(e) => setInputs((prev)=> ({...prev, desc: e.target.value}))}/>
          </FormControl>
  
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='green' mr={3}
		  type='submit'
		  isLoading={isLoading}
		  >
            Update
          </Button>
          <Button onClick={onClose} colorScheme='red'>Cancel</Button>
        </ModalFooter>
      </ModalContent>
	  </form>
    </Modal>
    </>
  )
}


 export default EditModal;
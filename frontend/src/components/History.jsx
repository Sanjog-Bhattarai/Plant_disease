import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./History.css";

const History = () => {
  const [history, setHistory] = useState([]);
  const [deletingId, setDeletingId] = useState(null); // To keep track of which item to delete
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/history`);
      setHistory(response.data);
    } catch (error) {
      console.error("Failed to fetch history data:", error);
      toast({
        title: "Error",
        description: "Failed to load history data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDeleteClick = (id) => {
    setDeletingId(id);
    onOpen(); // Open the confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      // Call API to delete the record
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/history/${deletingId}`);
      
      // Remove item from history state
      setHistory((prevHistory) => prevHistory.filter((item) => item.id !== deletingId));
      toast({
        title: "Deleted",
        description: "The record has been deleted.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      
      onClose(); // Close the confirmation dialog
    } catch (error) {
      console.error("Failed to delete history record:", error);
      toast({
        title: "Error",
        description: "Failed to delete the record.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container1">
      <Button
        onClick={handleBack}
        position="absolute"
        top="10px"
        left="10px"
        variant="outline"
        color="white"
        borderColor="white"
        _hover={{
          color: "black",
          borderColor: "black",
        }}
      >
        Back
      </Button>
      <Box className="history-container">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Disease</Th>
              <Th>Accuracy</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {history.map((item) => (
              <Tr key={item.id}>
                <Td>
                  <Image
                    src={item.imageUrl}
                    alt={`Image of ${item.disease}`}
                    boxSize="100px"
                    objectFit="cover"
                  />
                </Td>
                <Td>{item.disease}</Td>
                <Td>{item.solution}</Td>
                <Td>{item.date}</Td>
                <Td>{item.time}</Td>
                <Td>
                  <Button
                    onClick={() => handleDeleteClick(item.id)}
                    colorScheme="red"
                    variant="ghost"
                    size="sm"
                  >
                    <AiFillDelete />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this record permanently?</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default History;






// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Image,
//   Table,
//   Tbody,
//   Td,
//   Th,
//   Thead,
//   Tr,
//   useToast,
// } from "@chakra-ui/react";
// import { AiFillDelete } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./History.css"

// const History = () => {
//   const [history, setHistory] = useState([]);
//   const toast = useToast();
//   const navigate = useNavigate();

//   // Use useCallback to memoize fetchHistory function
//   const fetchHistory = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/history`);
//       setHistory(response.data);
//     } catch (error) {
//       console.error("Failed to fetch history data:", error);
//       toast({
//         title: "Error",
//         description: "Failed to load history data.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   }, [toast]);

//   // Fetch history data on component mount
//   useEffect(() => {
//     fetchHistory();
//   }, [fetchHistory]);

//   const handleDelete = (id) => {
//     // Remove item from history state
//     setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
//     toast({
//       title: "Deleted",
//       description: "The record has been deleted.",
//       status: "info",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div className="container1">
//       <Button
//         onClick={handleBack}
//         position="absolute"
//         top="10px"
//         left="10px"
//         variant="outline"
//         color="white"
//         borderColor="white"
//         _hover={{
//           color: "black",
//           borderColor: "black",
//         }}
//       >
//         Back
//       </Button>
//       <Box className="history-container">
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>Image</Th>
//               <Th>Disease</Th>
//               <Th>Solution</Th>
//               <Th>Date</Th>
//               <Th>Time</Th>
//               <Th>Delete</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {history.map((item) => (
//               <Tr key={item.id}>
//                 <Td>
//                   <Image
//                     src={item.imageUrl}
//                     alt={`Image of ${item.disease}`}
//                     boxSize="100px"
//                     objectFit="cover"
//                   />
//                 </Td>
//                 <Td>{item.disease}</Td>
//                 <Td>{item.solution}</Td>
//                 <Td>{item.date}</Td>
//                 <Td>{item.time}</Td>
//                 <Td>
//                   <Button
//                     onClick={() => handleDelete(item.id)}
//                     colorScheme="red"
//                     variant="ghost"
//                     size="sm"
//                   >
//                     <AiFillDelete />
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Box>
//     </div>
//   );
// };

// export default History;

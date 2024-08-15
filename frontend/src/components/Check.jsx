import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import CustomDropzone from "../utils/CustomDropzone";
import { useNavigate } from "react-router-dom";
import "./Check.css"; // Import the CSS file

const Check = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate(); // For navigating back

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl); // Clean up the object URL
  }, [selectedFile]);

  const sendFile = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsLoading(true);

    try {
      const res = await axios.post(process.env.REACT_APP_API_URL, formData);

      if (res.status === 200) {
        const confidence = parseFloat(res.data.confidence) * 100;
        const adjustedData = {
          ...res.data,
          class: confidence < 92 ? "Could not read image" : res.data.class,
          confidence:
            confidence < 92 ? "Too low accuracy" : confidence.toFixed(2),
        };
        setData(adjustedData);
      }
    } catch (error) {
      console.error("Upload error:", error.response || error.message);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to upload image.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (files) => {
    setSelectedFile(files[0]);
  };

  const clearData = () => {
    setData(null);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <Box className="container1">
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
            borderColor: "black"
          }}
        >
          Back
        </Button>
        <Heading className="heading" mb={5}>
          Potato Disease Classification
        </Heading>
        <div className="container2">
          <Box>
            <CustomDropzone onDrop={handleDrop} />
          </Box>

          {preview && (
            <div className="preview-image">
              <Image src={preview} alt="Selected file" className="uploaded-image" />
              {!isLoading && !data && selectedFile && (
                <Button className="upload-button" onClick={sendFile}>
                  Upload
                </Button>
              )}
            </div>
          )}

          {isLoading && (
            <Spinner className="spinner" size="lg" color="blue.500" />
          )}

          {data && (
            <Box className="result-box">
              <Text fontWeight="bold">Label:</Text>
              <Text>{data.class}</Text>
              <Text fontWeight="bold">Accuracy:</Text>
              <Text>{data.confidence}</Text>
              <Button className="clear-button" onClick={clearData}>
                Clear
              </Button>
            </Box>
          )}
        </div>
      </Box>
    </>
  );
};

export default Check;





// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Heading,
//   Image,
//   Spinner,
//   Text,
//   useToast,
// } from "@chakra-ui/react";
// import axios from "axios";
// import CustomDropzone from "../utils/CustomDropzone";
// import "./Check.css"; // Import the CSS file
// // import image from '../assets/bg.png';

// const Check = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const toast = useToast();

//   useEffect(() => {
//     if (!selectedFile) {
//       setPreview(null);
//       return;
//     }
//     const objectUrl = URL.createObjectURL(selectedFile);
//     setPreview(objectUrl);
//     return () => URL.revokeObjectURL(objectUrl); // Clean up the object URL
//   }, [selectedFile]);

//   const sendFile = async () => {
//     if (!selectedFile) return;

//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     setIsLoading(true);

//     try {
//       const res = await axios.post(process.env.REACT_APP_API_URL, formData);

//       if (res.status === 200) {
//         const confidence = parseFloat(res.data.confidence) * 100;
//         const adjustedData = {
//           ...res.data,
//           class: confidence < 92 ? "Could not read image" : res.data.class,
//           confidence:
//             confidence < 92 ? "Too low accuracy" : confidence.toFixed(2),
//         };
//         setData(adjustedData);
//       }
//     } catch (error) {
//       console.error("Upload error:", error.response || error.message);
//       toast({
//         title: "Error",
//         description: error.response?.data?.message || "Failed to upload image.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDrop = (files) => {
//     setSelectedFile(files[0]);
//   };

//   const clearData = () => {
//     setData(null);
//     setSelectedFile(null);
//     setPreview(null);
//   };

//   return (
//     <>
//       <div className="container1">
//       <Heading className="heading" mb={5}>
//           Potato Disease Classification
//         </Heading>
//         <div className="container2">
//         <Box>
//           <CustomDropzone onDrop={handleDrop} />
//         </Box>

//         {preview && (
//           <div className="preview-image">
//             <Image src={preview} alt="Selected file" />
//             {!isLoading && !data && selectedFile && (
//               <Button className="upload-button" onClick={sendFile}>
//                 Upload
//               </Button>
//             )}
//           </div>
//         )}

//         {isLoading && (
//           <Spinner className="spinner" size="lg" color="blue.500" />
//         )}

//         {data && (
//           <Box className="result-box">
//             <Text fontWeight="bold">Label:</Text>
//             <Text>{data.class}</Text>
//             <Text fontWeight="bold">Accuracy:</Text>
//             <Text>{data.confidence}</Text>
//             <Button className="clear-button" onClick={clearData}>
//               Clear
//             </Button>
//           </Box>
//         )}
//         </div>
        
//       </div>
//     </>
//   );
// };

// export default Check;










// import React, { useState, useEffect } from 'react';
// import { Box, Button, Container, Heading, Image, Spinner, Text, useToast } from '@chakra-ui/react';
// import axios from 'axios';
// import CustomDropzone from '../utils/CustomDropzone';
// // import cblogo from './cblogo.PNG';
// import image from '../assets/bg.png';
// import './Check.css';

// const Check = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const toast = useToast();

//     useEffect(() => {
//         if (!selectedFile) {
//             setPreview(null);
//             return;
//         }
//         const objectUrl = URL.createObjectURL(selectedFile);
//         setPreview(objectUrl);
//         return () => URL.revokeObjectURL(objectUrl); // Clean up the object URL
//     }, [selectedFile]);

//     const sendFile = async () => {
//         if (!selectedFile) return;

//         const formData = new FormData();
//         formData.append("file", selectedFile);
//         setIsLoading(true);

//         try {
//             const res = await axios.post(process.env.REACT_APP_API_URL, formData);

//             if (res.status === 200) {
//                 const confidence = parseFloat(res.data.confidence) * 100;
//                 const adjustedData = {
//                     ...res.data,
//                     class: confidence < 92 ? "Could not read image" : res.data.class,
//                     confidence: confidence < 92 ? "Too low accuracy" : confidence.toFixed(2)
//                 };
//                 setData(adjustedData);
//             }
//         } catch (error) {
//             console.error("Upload error:", error.response || error.message);
//             toast({
//                 title: "Error",
//                 description: error.response?.data?.message || "Failed to upload image.",
//                 status: "error",
//                 duration: 5000,
//                 isClosable: true,
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // const sendFile = async () => {
//     //     if (!selectedFile) return;

//     //     const formData = new FormData();
//     //     formData.append("file", selectedFile);
//     //     setIsLoading(true);

//     //     try {
//     //         console.log("Sending request to:", process.env.REACT_APP_API_URL); // Log the URL being used
//     //         const res = await axios.post(process.env.REACT_APP_API_URL, formData);

//     //         if (res.status === 200) {
//     //             const confidence = parseFloat(res.data.confidence) * 100;
//     //             const adjustedData = {
//     //                 ...res.data,
//     //                 class: confidence < 92 ? "Could not read image" : res.data.class,
//     //                 confidence: confidence < 92 ? "Too low accuracy" : confidence.toFixed(2)
//     //             };
//     //             setData(adjustedData);
//     //         }
//     //     } catch (error) {
//     //         console.error("Upload error:", error.response || error.message); // Log the detailed error
//     //         toast({
//     //             title: "Error",
//     //             description: error.response?.data?.message || "Failed to upload image.",
//     //             status: "error",
//     //             duration: 5000,
//     //             isClosable: true,
//     //         });
//     //     } finally {
//     //         setIsLoading(false);
//     //     }
//     // };

//     const handleDrop = (files) => {
//         setSelectedFile(files[0]);
//     };

//     const clearData = () => {
//         setData(null);
//         setSelectedFile(null);
//         setPreview(null);
//     };

//     return (
//         <Container
//             maxW="container.xl"
//             p={0}
//             bgImage={`url(${image})`}
//             bgSize="cover"
//             bgPos="center"
//             minH="100vh"
//             position="relative"
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             overflow="hidden"
//         >
//             <Heading mb={5}>Potato Disease Classification</Heading>

//             <Box
//                 display="flex"
//                 flexDirection={{ base: 'column', md: 'row' }} // Stack vertically on small screens and horizontally on larger screens
//                 alignItems="flex-start"
//                 justifyContent="center"
//                 width="full"
//                 maxWidth="1200px"
//                 p={4}
//                 bg="white"
//                 borderRadius="md"
//                 boxShadow="lg"
//                 position="relative"
//                 overflow="hidden"
//                 spacing={4}
//             >
//                 <Box
//                     flexShrink={0} // Ensure the drop zone does not grow too large
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     justifyContent="center"
//                     p={4}
//                     width={{ base: '100%', md: '30%' }} // Small width for drop zone
//                     maxWidth="300px"
//                 >
//                     <CustomDropzone onDrop={handleDrop} />
//                 </Box>

//                 <Box
//                     flexShrink={0}
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     justifyContent="center"
//                     p={4}
//                     width={{ base: '100%', md: '30%' }} // Small width for image
//                     maxWidth="300px"
//                     mt={{ base: 4, md: 0 }} // Margin top for small screens
//                 >
//                     {preview && (
//                         <Box
//                             p={2}
//                             borderWidth={1}
//                             borderColor="gray.300"
//                             borderRadius="md"
//                             display="flex"
//                             flexDirection="column"
//                             alignItems="center"
//                             justifyContent="center"
//                             width="100%"
//                             height="auto"
//                         >
//                             <Image src={preview} alt="Selected file" boxSize="100%" objectFit="cover" />
//                             {!isLoading && !data && selectedFile && (
//                                 <Button mt={4} colorScheme="blue" onClick={sendFile}>
//                                     Upload
//                                 </Button>
//                             )}
//                         </Box>
//                     )}
//                 </Box>

//                 <Box
//                     flexShrink={0}
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                     justifyContent="center"
//                     p={4}
//                     width={{ base: '100%', md: '40%' }} // Width for result area
//                     mt={{ base: 4, md: 0 }} // Margin top for small screens
//                 >
//                     {isLoading && <Spinner size="sm" color="blue.500" />}
//                     {data && (
//                         <Box mt={5} p={5} borderWidth={1} borderColor="gray.300" borderRadius="md">
//                             <Text fontWeight="bold">Label:</Text>
//                             <Text>{data.class}</Text>
//                             <Text fontWeight="bold">Accuracy:</Text>
//                             <Text>{data.confidence}</Text>
//                         </Box>
//                     )}
//                     {data && (
//                         <Button mt={5} colorScheme="blue" onClick={clearData}>
//                             Clear
//                         </Button>
//                     )}
//                 </Box>
//             </Box>
//         </Container>
//     );
// };

// export default Check;

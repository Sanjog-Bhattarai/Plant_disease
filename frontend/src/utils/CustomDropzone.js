import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Text, Icon, useToast } from '@chakra-ui/react';
import { MdCloudUpload } from 'react-icons/md';
import './CustomDropZone.css'; // Import the CSS file

const CustomDropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop,
    multiple: false,
  });
  const toast = useToast();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        toast({
          title: "No files selected",
          description: "Please select an image file.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      onDrop(acceptedFiles);
    },
    [onDrop, toast]
  );

  return (
    <Box
      {...getRootProps()}
      className={`dropzone-container ${isDragActive ? 'dropzone-active' : 'dropzone-inactive'}`}
    >
      <input
        {...getInputProps()}
      />
      <Box textAlign="center">
        <Icon as={MdCloudUpload} className="dropzone-icon" />
        <Text className="dropzone-text">
          {isDragActive ? "Drop the image here..." : "Drag & drop an image here, or click to select one"}
        </Text>
      </Box>
    </Box>
  );
};

export default CustomDropzone;



















// import React, { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { Box, Text, Icon, useToast } from '@chakra-ui/react';
// import { MdCloudUpload } from 'react-icons/md';

// const CustomDropzone = ({ onDrop }) => {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: 'image/*',
//     onDrop,
//     multiple: false,
//   });
//   const toast = useToast();

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       if (acceptedFiles.length === 0) {
//         toast({
//           title: "No files selected",
//           description: "Please select an image file.",
//           status: "warning",
//           duration: 5000,
//           isClosable: true,
//         });
//         return;
//       }
//       onDrop(acceptedFiles);
//     },
//     [onDrop, toast]
//   );

//   return (
//     <Box
//       {...getRootProps()}
//       p={4}
//       borderWidth={2}
//       borderColor={isDragActive ? 'blue.300' : 'gray.300'}
//       borderStyle="dashed"
//       borderRadius="md"
//       width={{ base: '90%', sm: '75%', md: '60%' }}
//       height={{ base: '200px', sm: '250px', md: '300px' }}
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//       mx="auto"
//       my={4}
//       _hover={{ borderColor: 'blue.500' }}
//       transition="border-color 0.2s"
//       position="relative"
//     >
//       <input
//         {...getInputProps()}
//         style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
//       />
//       <Box textAlign="center">
//         <Icon as={MdCloudUpload} boxSize={10} color="gray.400" />
//         <Text mt={2} fontSize={{ base: 'md', md: 'lg' }}>
//           {isDragActive ? "Drop the image here..." : "Drag & drop an image here, or click to select one"}
//         </Text>
//       </Box>
//     </Box>
//   );
// };

// export default CustomDropzone;

import React, { useState } from "react";
import { Box, Text, Input, Button, useToast } from "@chakra-ui/react";

function SecondPage() {
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === "video/quicktime") {
      setFile(uploadedFile);
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid MOV file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const convertFile = () => {
    if (file) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name.replace(/\..+$/, ".mp4");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Conversion Successful",
        description: "Your MOV file has been converted to MP4.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p="4">
      <Text fontSize="xl">Welcome to the Convert Page!</Text>
      <Input type="file" accept=".mov" onChange={handleFileChange} mt="4" />
      <Button onClick={convertFile} mt="4" colorScheme="blue">
        Convert to MP4
      </Button>
    </Box>
  );
}

export default SecondPage;

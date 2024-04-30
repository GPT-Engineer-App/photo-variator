import React, { useState } from "react";
import { Box, Button, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, Text, useToast, Input, Center } from "@chakra-ui/react";
import { FaUpload, FaRandom } from "react-icons/fa";

const Index = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const toast = useToast();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid image file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const randomizeEffects = () => {
    setRotation(Math.floor(Math.random() * 360));
    setBrightness(50 + Math.random() * 100);
  };

  return (
    <Center p={8} flexDirection="column">
      <VStack spacing={4}>
        <Input type="file" accept="image/*" onChange={handleImageChange} icon={<FaUpload />} />
        <Button leftIcon={<FaRandom />} colorScheme="teal" onClick={randomizeEffects}>
          Randomize Effects
        </Button>
        {imageSrc && (
          <Box>
            <Image
              src={imageSrc}
              alt="Uploaded"
              style={{
                filter: `brightness(${brightness}%)`,
                transform: `rotate(${rotation}deg)`,
              }}
            />
            <Slider aria-label="slider-ex-1" defaultValue={rotation} min={0} max={360} onChange={setRotation}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>Rotate</Text>
            <Slider aria-label="slider-ex-2" defaultValue={brightness} min={50} max={150} onChange={setBrightness}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text>Brightness</Text>
          </Box>
        )}
      </VStack>
    </Center>
  );
};

export default Index;

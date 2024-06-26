import React, { useState } from "react";
import { Box, Button, Image, Slider, SliderTrack, SliderFilledTrack, SliderThumb, VStack, Text, useToast, Input, Center } from "@chakra-ui/react";
import { FaUpload, FaRandom, FaDownload } from "react-icons/fa";

const Index = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const [brightness, setBrightness] = useState(100);
  const [variationsCount, setVariationsCount] = useState(1);
  const toast = useToast();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type === "video/mp4" || file.type === "video/quicktime")) {
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

  const randomizeEffects = (count) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        setBrightness(50 + Math.random() * 100);
        const link = document.createElement("a");
        link.href = imageSrc;
        link.download = `downloaded-image-${i + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, i * 100);
    }
  };

  return (
    <Center p={8} flexDirection="column">
      <VStack spacing={4}>
        <Input type="file" accept="image/*,video/mp4,video/quicktime" onChange={handleImageChange} icon={<FaUpload />} />
        <Input type="number" placeholder="Number of variations (1-50)" min={1} max={50} value={variationsCount} onChange={(e) => setVariationsCount(Math.min(50, Math.max(1, parseInt(e.target.value))))} />
        <Button leftIcon={<FaRandom />} colorScheme="teal" onClick={() => randomizeEffects(variationsCount)}>
          Generate Variations
        </Button>
        {imageSrc && imageSrc.includes("data:video/") && (
          <Button
            leftIcon={<FaDownload />}
            colorScheme="purple"
            onClick={() => {
              const link = document.createElement("a");
              link.href = imageSrc;
              link.download = "converted-video.gif";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              toast({
                title: "Conversion Successful",
                description: "Your video has been converted to GIF.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}
          >
            Convert to GIF
          </Button>
        )}
        {imageSrc && (
          <Button
            leftIcon={<FaDownload />}
            colorScheme="blue"
            onClick={() => {
              const link = document.createElement("a");
              link.href = imageSrc;
              link.download = "downloaded-image.png";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download Image
          </Button>
        )}
        {imageSrc && (
          <Box>
            {imageSrc.includes("data:image/") ? (
              <Image
                src={imageSrc}
                alt="Uploaded"
                style={{
                  filter: `brightness(${brightness}%)`,
                }}
              />
            ) : (
              <video controls style={{ maxWidth: "100%", filter: `brightness(${brightness}%)` }}>
                <source src={imageSrc} type={imageSrc.includes("data:video/mp4") ? "video/mp4" : "video/quicktime"} />
                Your browser does not support the video tag.
              </video>
            )}

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

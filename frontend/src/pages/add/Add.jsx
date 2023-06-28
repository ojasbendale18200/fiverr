import React, { useReducer, useState } from "react";

import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  IconButton,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import upload from "../../utils/upload";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      `https://fair-blue-cod-cape.cyclic.app/api/gigs`,
      state,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );

  };

  return (

    <Flex justify="center" w={"100%"} mb={"80px"}>
      <Box w="80%" py={10} px={4}>
        <Heading as="h1" mb={6} color="gray.500" fontWeight={300}>
          Add New Gig
        </Heading>
        <Flex direction={{ base: "column", lg: "row" }} gap={20}>
          <Box flex={1}>
            <FormControl mb={4}>
              <FormLabel htmlFor="title" color="gray.500">
                Title
              </FormLabel>
              <Input
                type="text"
                id="title"
                placeholder="e.g. I will do something I'm really good at"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="cat" color="gray.500">
                Category
              </FormLabel>
              <Select id="cat" onChange={handleChange}>
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
                <option value="video & animation">Video & Animation</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="coverImage" color="gray.500">
                Cover Image
              </FormLabel>
              <Input
                type="file"
                id="coverImage"
                onChange={(e) => setSingleFile(e.target.files[0])}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="uploadImages" color="gray.500">
                Upload Images
              </FormLabel>
              <Input
                type="file"
                id="uploadImages"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
            </FormControl>
            <Button
              onClick={handleUpload}
              colorScheme="teal"
              margin={"auto"}
              display={"block"}
            >
              {uploading ? "uploading" : "Upload"}
            </Button>
            <FormControl mb={4}>
              <FormLabel htmlFor="desc" color="gray.500">
                Description
              </FormLabel>
              <Textarea
                id="desc"
                placeholder="Brief descriptions to introduce your service to customers"
                rows={6}
                onChange={handleChange}
              />
            </FormControl>
          </Box>
          <Box flex={1}>
            <FormControl mb={4}>
              <FormLabel htmlFor="shortTitle" color="gray.500">
                Service Title
              </FormLabel>
              <Input
                type="text"
                id="shortTitle"
                placeholder="e.g. One-page web design"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="shortDesc" color="gray.500">
                Short Description
              </FormLabel>
              <Textarea
                id="shortDesc"
                placeholder="Short description of your service"
                rows={4}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="deliveryTime" color="gray.500">
                Delivery Time (e.g. 3 days)
              </FormLabel>
              <Input type="number" id="deliveryTime" onChange={handleChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="revisionNumber" color="gray.500">
                Revision Number
              </FormLabel>
              <Input
                type="number"
                id="revisionNumber"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="feature" color="gray.500">
                Add Features
              </FormLabel>
              <form onSubmit={handleFeature}>
                <Flex>
                  <Input
                    type="text"
                    id="feature"
                    placeholder="e.g. page design"
                  />
                  <Button type="submit" ml={2} colorScheme="teal">
                    Add
                  </Button>
                </Flex>
              </form>
            </FormControl>
            <Stack spacing={2} direction="row" mb={4}>
              {state?.features?.map((f) => (
                <Box key={f}>
                  <Button
                    size="sm"
                    color="teal"
                    variant="outline"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <Text pl={"6px"}>X</Text>
                  </Button>
                </Box>
              ))}
            </Stack>
            <FormControl mb={4}>
              <FormLabel htmlFor="price" color="gray.500">
                Price
              </FormLabel>
              <Input type="number" id="price" onChange={handleChange} />
            </FormControl>
          </Box>
        </Flex>
        <Button
          colorScheme="teal"
          onClick={handleSubmit}
          my={4}
          px={"80px"}
          display={"block"}
          margin={"auto"}
        >
          Create
        </Button>
      </Box>
    </Flex>
  );
};

export default Add;

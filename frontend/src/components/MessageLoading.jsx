import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function MessageLoading() {
  return (
    <>
      <Stack margin={"auto"}>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    </>
  );
}

export default MessageLoading;

"use client"

import { Box, Heading, Text, Button } from "@chakra-ui/react"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        Oops!
      </-Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Something went wrong
      </Text>
      <Text color={"gray.500"} mb={6}>
        {error.message}
      </Text>

      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </Box>
  )
}

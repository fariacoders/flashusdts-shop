"use client"

import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import Image from "next/image"

export default function Home() {
  const bgColor = useColorModeValue("gray.50", "gray.900")
  const textColor = useColorModeValue("gray.800", "gray.50")
  const buttonBg = useColorModeValue("blue.500", "blue.300")
  const buttonColor = useColorModeValue("white", "gray.800")

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={bgColor}
      fontFamily="sans-serif"
    >
      <VStack spacing={8} textAlign="center" p={8} maxW="3xl">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={150}
          height={30}
          priority
        />
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          letterSpacing="tight"
          color={textColor}
        >
          Build Modern, Scalable Web Apps
        </Heading>
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.400")}>
          Get started with a powerful boilerplate featuring Next.js, Chakra UI,
          and TypeScript. Everything you need to build a modern, fast, and
          reliable web application.
        </Text>
        <HStack spacing={4}>
          <Button
            as={Link}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            isExternal
            bg={buttonBg}
            color={buttonColor}
            _hover={{ bg: useColorModeValue("blue.600", "blue.400") }}
            size="lg"
          >
            Deploy Now
          </Button>
          <Button
            as={Link}
            href="https://nextjs.org/docs"
            isExternal
            variant="outline"
            size="lg"
          >
            Documentation
          </Button>
        </HStack>
      </VStack>
    </Flex>
  )
}

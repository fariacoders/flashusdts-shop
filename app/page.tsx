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
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { features } from "@/const";
import "@/components/ui/bento-grid.css";

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
      <BentoGrid className="w-full max-w-4xl">
        {features.map((feature) => (
          <BentoCard
            key={feature.title}
            className={feature.className}
            background={
              <Image
                src={feature.background}
                alt={feature.title}
                layout="fill"
                objectFit="cover"
              />
            }
          >
            <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
              <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                {feature.title}
              </h3>
              <p className="max-w-lg text-neutral-400">{feature.description}</p>
            </div>
          </BentoCard>
        ))}
      </BentoGrid>
    </Flex>
  );
}

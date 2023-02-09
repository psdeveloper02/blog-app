import Image from "next/image"
import styles from "@/styles/Home.module.css"
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Divider,
  Button,
  Text,
  SimpleGrid,
} from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IBlog } from "@/models"
import { BiShare } from "react-icons/bi"
import { AiOutlineEye } from "react-icons/ai"

export default function Home() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const getBlogs = async () => {
      const response = await (await fetch("/api/blog")).json()
      setBlogs(response)
    }
    getBlogs()
  }, [])

  return (
    <>
      <main className={styles.main}>
        <Heading className={styles.heading}>Blogs</Heading>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        >
          {renderBlogs()}
        </SimpleGrid>
      </main>
    </>
  )

  function renderBlogs() {
    return (
      <>
        {...blogs.map((blog: IBlog, index: number) => (
          <Card key={index}>
            <CardBody>
              <Image
                src={
                  "https://source.unsplash.com/random/1920x1080/?wallpaper,landscape" +
                  index
                }
                alt="Green double couch with wooden legs"
                width={1920}
                height={1080}
                style={{
                  borderRadius: "lg",
                }}
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">{blog.title}</Heading>
                <Text>{blog.body}</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Link href={`/blog/${blog.id}`}>
                <Button flex="1" variant="ghost" leftIcon={<AiOutlineEye />}>
                  View
                </Button>
              </Link>
              <Button flex="1" variant="ghost" leftIcon={<BiShare />}>
                Share
              </Button>
            </CardFooter>
          </Card>
        ))}
      </>
    )
  }
}

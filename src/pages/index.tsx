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
import { Inter } from "@next/font/google"

const inter = Inter({ subsets: ["latin"] })

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
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.heading}>
          <Heading mb={5}>Blogs</Heading>
          <Divider />
        </div>
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
                <Text>
                  This sofa is perfect for modern tropical spaces, baroque
                  inspired spaces, earthy toned spaces and for people who love a
                  chic design with a sprinkle of vintage design.
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link href={`/blog/${blog.id}`}>
                <Button variant="solid" colorScheme="blue">
                  View
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </>
    )
  }
}

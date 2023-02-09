import styles from "../../styles/Home.module.css"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Text, Heading, Image, Stack, Button } from "@chakra-ui/react"
import { AiOutlineHome } from "react-icons/ai"
import Link from "next/link"
export default function Blog() {
  const router = useRouter()
  const [blog, setBlog] = useState({
    userId: 0,
    id: 0,
    title: "",
    body: "",
  })

  useEffect(() => {
    const getBlogDetails = async () => {
      const response = await (
        await fetch(`../api/blog/${router.query.blog}`)
      ).json()
      setBlog(response)
    }
    if (router.query.blog) {
      getBlogDetails()
    }
  }, [router.query.blog])

  return (
    <>
      <main className={`${styles.main} ${styles.blogpage}`}>
        <div className={styles.homebutton}>
          <Link href="/">
            <Button flex="1" variant="ghost" leftIcon={<AiOutlineHome />}>
              Home
            </Button>
          </Link>
        </div>
        <Stack spacing={6}>
          <Heading size="md">{blog.title}</Heading>
          <Image
            borderRadius="20px"
            src="https://source.unsplash.com/random/1920x1080/?wallpaper,landscape"
            alt="Blog"
            height={350}
            width={"-webkit-fill-available"}
          />
          <Text>{blog.body}</Text>
        </Stack>
      </main>
    </>
  )
}

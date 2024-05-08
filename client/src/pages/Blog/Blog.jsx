import { useState, useEffect, Suspense } from 'react'
import './Blog.css'
import Post from '@components/Post'
import Loading from '@components/Loading'
import EmptyState from '@components/EmptyState'

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  /*hhtps*/
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://ghostdomain.xyz')
      const data = await response.json()
      setPosts(data)
      setIsLoading(false)
    }

    fetchPosts()
  }, [])

  if (isLoading) return <Loading />
  if (!posts.length) return <EmptyState />
  /*loading?*/
  return (
    <div className="blog">
      <Suspense fallback={<Loading />}>
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </Suspense>
    </div>
  )
}

export default Blog;

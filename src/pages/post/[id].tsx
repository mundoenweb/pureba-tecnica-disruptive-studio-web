import { useStateContext } from '@/states/state'
import styles from '../../styles/Post.module.css'
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { posts } = useStateContext()

  const { id } = router.query
  const post = posts.find((post) => post.id === id)

  const date = new Date(post?.updatedAt as string).toLocaleString()

  const buildUrlYouTube = (url?: string) => {
    if (!url) return
    if (url.includes('embed')) return url
    const idVideo = new URLSearchParams(url.split('?')[1]).get('v')
    return `https://www.youtube.com/embed/${idVideo!}`
  }

  return (
    <main className="mw-grid">
      {!post && <h1>Post no encontrado</h1>}
      {post && (
        <>
          <h1>{post.name}</h1>
          <span>{date}</span>
          {post.user && (
            <>
              <span>
                usuario: {post.user.username}, créditos: {post.user.credits}
              </span>
            </>
          )}
          <p>{post.text}</p>
          {post.image && <img src={post.image} alt={post.name} />}
          {post.video && (
            <iframe
              className={styles.iframe}
              src={buildUrlYouTube(post?.video)}
              title={post.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </>
      )}
    </main>
  )
}

export default Post

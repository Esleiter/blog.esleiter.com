import Link from 'next/link'
import '../styles/cards.css'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { Footer } from 'components/Footer'

function PostCard(post: Post) {
  return (
    
      <div className="ag-courses_item">
        <Link href={post.url} className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
          <div className="ag-courses-item_title">
            <h2>{post.title} <i className='bx bxs-chevrons-right'></i> </h2>
          </div>
          <div className="ag-courses-item_date-box">
            {post.summary} <br /> <br />
            <span className="ag-courses-item_date">
            {format(parseISO(post.date), 'dd-MM-yyyy')}
            </span>
          </div>
        </Link>
      </div>
  )
}

export default function Home() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div>
      <div className="ag-format-container">
    <div className="ag-courses_box">
        {posts.slice(0, 9).map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
      </div>
    </div>
    <Footer />
    </div>
  )
}

import Link from 'next/link'
import { allPosts, Post  } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer/hooks'
import { compareDesc, format, parseISO } from 'date-fns'
import { Footer } from 'components/Footer'

import myFace from 'public/images/myFace.jpeg'
import "styles/prism-vsc-dark-plus.css";

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  return { title: post.title }
}

function PostCard(post: Post) {
  const Content = getMDXComponent(post.body.code)

  return (
        <li>
          <Link href={post.url}>
          <i className='bx bx-link'></i> {post.title} - {format(parseISO(post.date), 'dd-MM-yyyy')}
        </Link>
        </li>
  )
}

function OtherPost() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <div className='other-post'>
        {posts.slice(0, 5).map((post, idx) => (
          <PostCard key={idx} {...post} />
        ))}
    </div>
  )
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)

  const Content = getMDXComponent(post.body.code)

  const renderNavRight = () => (
    <div className='nav-right'>
      <li>
        <a>
          <i className='bx bx-planet'></i> Otros artículos:
        </a>
      </li>
      <OtherPost />
      <br /> <br />
      <li className='li-home'>
        <Link href='/'>
          <i className='bx bx-home'></i> Ver en la página principal
        </Link>
      </li>
    </div>
  )

  const renderNavLeft = () => (
    <div className='nav-left' id='nav-left'>
      <input id="cerrar-modal" name="modal" type="radio" /> 
      <label htmlFor="cerrar-modal"> X </label>
      <ul>
        <li>
          <a>
            <i className='bx bx-planet'></i> En este artículo: <br />
          </a>
        </li>
        <div className='li-menu'>
          {post.headings.map((h) => {
            return (
              <li key={h.slug} className='li-menu'>
                <a data-level={h.level} href={`#${h.slug}`}>
                  {h.text}
                </a>
              </li>
            )
          })}
        </div>
      </ul>
    </div>
  )

  return (
    <div>
      <input id="mostrar-modal" name="modal" type="radio" /> 
      <label htmlFor="mostrar-modal"> <br /><i className='bx bx-menu'></i> </label>
      {renderNavLeft()}
      <ul>
      <li className='li-top'>
          <a href='#' data-level='two'>
            <br /><i className='bx bxs-chevron-up-circle'></i>
          </a>
        </li>
      </ul>
      <main>
        <article>
          <p className='date-lecture-time'>
            {post.dateText} &nbsp;&nbsp; // &nbsp;&nbsp; {post.readingTime}
          </p>
          <div className='paragraph'>
            <Content />
          </div>
          <hr />
        </article>

        <article className='author'>
          <div className='img-author'>
            <img className='my-face' src={myFace.src} alt='Face of Esleiter' />
          </div>
          <div className='info-author'>
            <h3>Esleiter 🚀</h3>
            <p className='resume-author'>
              Web Developer 👨‍💻 - Systems Engineer 💻 - Medium Technician in Machine Tools 🏭
            </p>
          </div>
        </article>
        {renderNavRight()}
      </main>
      <Footer />
    </div>
  )
}

export default PostLayout
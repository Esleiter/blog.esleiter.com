import Link from 'next/link'

function Logo() {
  return (
    <Link href="/">
      <div id="circle"></div>
      <h1>The Blog of Esleiter</h1>
    </Link>
  )
}

export function Header() {
  return (
    <header>
      <Logo />
    </header>
  )
}

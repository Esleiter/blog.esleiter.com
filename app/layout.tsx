import 'styles/globals.css'
import 'styles/nav.css'
import circle from 'public/images/circle.ico'

import { Header } from '../components/Header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
      <meta charSet="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="robots"  content="index, follow"/>
      <meta name="description" content="Desde hace mucho tiempo he querido compartir mis experiencias, pensamientos y opiniones con el mundo. Finalmente, he dado el primer paso y creado este espacio para hacerlo." />
      <meta name="author" content="Esleiter"/>
      <title>The Blog of Esleiter</title>
      <link rel="shortcut icon" type="image/x-icon" href={circle.src} />
      <link href="https://cdn.jsdelivr.net/npm/boxicons@2.0.7/css/boxicons.min.css" rel="stylesheet"/>
      </head>
      <body>
        <Header />
        <div className="">{children}</div>
      </body>
    </html>
  )
}

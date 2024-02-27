export const metadata = {
  title: 'fridge-reminder',
  description: 'fridge-reminder website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="white_bg">
            
            <h1><a href="/">Fridge reminder</a></h1>

            <div className="other_pages">
              <h2 className="page_link"><a href="/dashboard">Dashboard</a></h2>
              <h2 className="page_link"><a href="/account">Account</a></h2>
            </div>

          </div>

          <div className="fade_down"></div>
        </header>

        <main>
          {children}
        </main>
        
        <footer>
          <div className="fade_up"></div>

          <div className="white_bg">
            <h1>FOOTER</h1>
          </div>
        </footer>
      </body>
    </html>
  )
}
import './globals.css'

export const metadata = {
  title: 'GoalieAI - AI-Powered Goalie Analysis',
  description: 'Upload your hockey clips and get instant AI analysis on your goalie performance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
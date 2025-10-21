import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Simple App Next.js'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className='w-full max-w-7xl mt-4 m-auto'>
                    {children}
                </div>
            </body>
        </html>
    )
}
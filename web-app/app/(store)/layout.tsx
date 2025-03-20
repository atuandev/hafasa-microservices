import { Suspense } from 'react'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Banner } from '@/components/common/banner'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <Banner />
      <Suspense fallback={<Header.Skeleton />}>
        <Header />
      </Suspense>
      <main className="relative mx-auto max-w-7xl px-4 md:px-8 pt-8 mb-4">
        {children}
      </main>
      <Footer />
    </>
  )
}

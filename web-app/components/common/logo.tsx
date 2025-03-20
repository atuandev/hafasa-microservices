import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <div className='w-[200px]'>
      <Link href="/" aria-label="Home" title="Home">
        <Image
          src="/images/fahasa-logo.webp"
          alt="Logo"
          className="w-full h-10"
          width={300}
          height={100} />
      </Link>
    </div>
  )
}

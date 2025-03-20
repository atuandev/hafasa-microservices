import Image from 'next/image'

export function Banner() {
  return (
    <div className="w-full bg-[#d53927]">
      <Image src="/images/Smallbanner.webp" alt="banner" width={1264} height={61} priority className='mx-auto' />
    </div>
  )
}
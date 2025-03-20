'use client'

import { useEffect, useState } from 'react'
import { CldImage, CldUploadWidget } from 'next-cloudinary'
import { UploadIcon, XCircleIcon } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import { CloudinaryResult } from '@/types/cloudinary'
import { TypographySmall } from '@/components/typography'
import { UseFormReturn } from 'react-hook-form'
import { BookFormValues } from '@/schemas/book'
import { RequiredField } from '@/components/form/required-field'
import { Book } from '@/types/book'

type FormUploadBookProps = {
  form: UseFormReturn<BookFormValues>
  book?: Book
}

export function FormUploadBook({ form, book }: FormUploadBookProps) {
  const [thumbnail, setThumbnail] = useState<string>(book?.thumbnail || '')
  const [bookImages, setBookImages] = useState<Array<{ url: string }>>(book?.bookImages || [])

  const MAX_BOOK_IMAGES = 6
  const UPLOAD_PRESET = 'hafasa-k7ntolrb'

  useEffect(() => {
    // Update form values when thumbnail or bookImages change
    form.setValue('bookImages', bookImages, { shouldValidate: true })
    form.setValue('thumbnail', thumbnail, { shouldValidate: true })
  }, [bookImages, thumbnail, form])

  const removeThumbnail = () => setThumbnail('')

  const removeBookImage = (index: number) => {
    setBookImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
      {/* Thumbnail Upload Section */}
      <div className='md:col-span-4 bg-zinc-50 p-6 rounded-lg border flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='thumbnail'
          render={() => (
            <FormItem>
              <FormLabel>
                Ảnh bìa <RequiredField />
              </FormLabel>
              <FormControl>
                <div>
                  {thumbnail ? (
                    <div className='relative'>
                      <CldImage
                        width='400'
                        height='400'
                        src={thumbnail}
                        alt='Book thumbnail'
                        title='Thumbnail'
                        className='mx-auto w-[220px] h-[320px] object-cover'
                      />
                      <button
                        type='button'
                        onClick={removeThumbnail}
                        className='absolute -top-4 -right-4 h-6 w-6 text-zinc-700 hover:text-red-500 transition-colors'
                        aria-label='Remove thumbnail'
                      >
                        <XCircleIcon />
                      </button>
                    </div>
                  ) : (
                    <CldUploadWidget
                      uploadPreset={UPLOAD_PRESET}
                      onSuccess={(results, { close }) => {
                        const { secure_url } = results.info as unknown as CloudinaryResult
                        setThumbnail(secure_url)
                        setBookImages(prevImages => [...prevImages, { url: secure_url }])
                        close()
                      }}
                    >
                      {({ open }) => (
                        <button
                          type='button'
                          className='w-full border-2 border-dashed rounded-lg p-4 py-8 text-center cursor-pointer h-full flex flex-col items-center justify-center gap-4 hover:bg-zinc-100 transition-colors'
                          onClick={() => open()}
                        >
                          <UploadIcon className='mx-auto h-12 w-12 text-zinc-400' />
                          <TypographySmall>Upload Thumbnail</TypographySmall>
                        </button>
                      )}
                    </CldUploadWidget>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Book Images Upload Section */}
      <div className='md:col-span-8 bg-zinc-50 p-6 rounded-lg border flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='bookImages'
          render={() => (
            <FormItem>
              <FormLabel>
                Danh sách ảnh <RequiredField />
              </FormLabel>
              <FormControl>
                <div className='space-y-4 w-full'>
                  {bookImages.length > 0 && (
                    <div className='flex gap-4'>
                      {bookImages.map((image, index) => (
                        <div key={index} className='relative max-h-[20rem]'>
                          <CldImage
                            width='400'
                            height='400'
                            src={image.url}
                            alt={`Book Image ${index + 1}`}
                            title={`Book Image ${index + 1}`}
                            className='mx-auto w-[120px] h-[160px] object-cover'
                          />
                          <button
                            type='button'
                            onClick={() => removeBookImage(index)}
                            className='absolute -top-4 -right-4 h-6 w-6 text-zinc-700 hover:text-red-500 transition-colors'
                            aria-label={`Remove image ${index + 1}`}
                          >
                            <XCircleIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {bookImages.length < MAX_BOOK_IMAGES && (
                    <CldUploadWidget
                      uploadPreset={UPLOAD_PRESET}
                      options={{
                        multiple: true,
                        maxFiles: MAX_BOOK_IMAGES - bookImages.length,
                      }}
                      onSuccess={(results, { close }) => {
                        const { secure_url } = results.info as unknown as CloudinaryResult
                        setBookImages(prevImages => [...prevImages, { url: secure_url }])
                        close()
                      }}
                    >
                      {({ open }) => (
                        <button
                          type='button'
                          onClick={() => open()}
                          className='w-full border-2 border-dashed rounded-lg p-4 py-8 text-center cursor-pointer h-full flex flex-col items-center justify-center gap-4 hover:bg-zinc-100 transition-colors'
                        >
                          <UploadIcon className='mx-auto h-12 w-12 text-zinc-400' />
                          <TypographySmall>
                            {bookImages.length === 0
                              ? 'Tải ảnh lên'
                              : `Thêm ảnh (còn lại ${MAX_BOOK_IMAGES - bookImages.length} ảnh)`}
                          </TypographySmall>
                        </button>
                      )}
                    </CldUploadWidget>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

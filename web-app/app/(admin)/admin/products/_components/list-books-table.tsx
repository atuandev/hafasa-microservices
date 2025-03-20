'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { toast } from 'sonner'

import { deleteBookById } from '@/actions/books/books'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BookStatus, PageBooks } from '@/types/book'
import { formatVND } from '@/utils/format'
import { Edit, Trash2 } from 'lucide-react'

interface ListBooksTableProps {
  books: PageBooks
}

export function ListBooksTable({ books }: ListBooksTableProps) {
  const router = useRouter()
  const handleDelete = (bookId: string) => {
    startTransition(async () => {
      const { code, message } = await deleteBookById(bookId)
      if (code !== 1000) {
        toast.error(message)
        return
      }

      toast.success('Xóa sách thành công')
      router.refresh()
    })
  }

  return (
    <div className='space-y-4'>
      <div className='rounded-md border p-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Hình ảnh</TableHead>
              <TableHead>Tên sách</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead className='text-right'>Giá</TableHead>
              <TableHead className='text-right'>Số lượng</TableHead>
              <TableHead className='text-center'>Trạng thái</TableHead>
              <TableHead className='text-right'>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.items.length > 0 ? (
              books.items.map(book => (
                <TableRow key={book.id}>
                  <TableCell>
                    <Image
                      src={book.thumbnail || '/placeholder.svg'}
                      alt={`Cover of ${book.title}`}
                      width={60}
                      height={80}
                      className='rounded-sm object-cover'
                    />
                  </TableCell>
                  <TableCell className='font-medium'>{book.title}</TableCell>
                  <TableCell className='font-medium'>{book.author}</TableCell>
                  <TableCell className='text-right text-primary'>{formatVND(book.price)}</TableCell>
                  <TableCell className='text-right'>{book.stock}</TableCell>
                  <TableCell className='text-center cursor-default select-none'>
                    {book.status === BookStatus.ACTIVE && (
                      <Badge className='bg-emerald-500 text-white hover:bg-emerald-600'> Hoạt động</Badge>
                    )}
                    {book.status === BookStatus.DRAFT && (
                      <Badge className='bg-amber-500 text-white hover:bg-amber-600'>Bản nháp</Badge>
                    )}
                    {book.status === BookStatus.DISABLED && (
                      <Badge className='bg-red-500 text-white hover:bg-red-600'>Đã ẩn</Badge>
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Link href={`/admin/products/${book.id}`}>
                        <Button variant='gray' size='icon' aria-label={`Edit ${book.title}`}>
                          <Edit className='h-4 w-4' />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant='gray'
                            size='icon'
                            className='text-destructive hover:bg-destructive/10'
                            aria-label={`Delete ${book.title}`}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc chắn muốn xóa sách này?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Điều này sẽ xóa sách khỏi cơ sở dữ liệu một cách vĩnh viễn.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(book.id)}
                              className='text-destructive-foreground'
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className='h-24 text-center'>
                  Không tìm thấy sách nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <PaginationWithLinks
          page={books.pageNo}
          pageSize={books.pageSize}
          totalCount={books.totalElements}
          pageSizeSelectOptions={{ pageSizeOptions: [8, 12, 20] }}
        />
      </div>
    </div>
  )
}

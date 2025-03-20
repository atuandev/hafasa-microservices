import Image from 'next/image'
import { Book } from '@/types/book'
import { formatVND } from '@/utils/format'
import { FormQuantity } from '@/app/(store)/(books)/_components/form-quantity'
import { AddCartButton } from '@/app/(store)/(books)/_components/add-cart-button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { TypographyH3, TypographyH4, TypographyLarge, TypographyMuted, TypographySmall } from '@/components/typography'

type BookDetailProps = {
  book: Book
}

export function BookDetail({ book }: BookDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-4 min-h-[100vh]">
      <div className="bg-background rounded-md shadow-sm p-4 md:col-span-4 sticky top-4 h-fit space-y-4">
        <Image
          src={book.thumbnail}
          alt={book.title}
          className="h-[400px] object-cover rounded-t-lg mb-2"
          width={500}
          height={500}
        />
        <AddCartButton book={book} />
      </div>
      <div className="md:col-span-6 space-y-4">
        <div className="bg-background rounded-md shadow-sm p-4 md:col-span-6 space-y-2">
          <TypographyH4 className="mb-4">{book.title}</TypographyH4>
          <div className="grid grid-cols-12">
            <p className="col-span-7">
              Nhà xuất bản: <span className="font-semibold">{book.publisher.name}</span>
            </p>
            <p className="col-span-5">
              Tác giả: <span className="font-semibold">{book.author}</span>
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <TypographyMuted>
              Đã bán: <span className="font-medium text-foreground">{book.sold}</span>
            </TypographyMuted>
            <TypographyMuted>
              Kho: <span className="font-medium text-foreground">{book.stock}</span>
            </TypographyMuted>
          </div>
          <div className="flex gap-4 items-center">
            <TypographyH3 className="text-rose-500">{formatVND(book.discountPrice)}</TypographyH3>
            {book.discountPrice !== book.price && (
              <>
                <TypographyMuted className="line-through">
                  {formatVND(book.price)}
                </TypographyMuted>
                <div className="px-2 bg-rose-500 shadow-sm rounded-sm">
                  <TypographySmall className="text-rose-50">
                    -{book.discount.percent}%
                  </TypographySmall>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-background rounded-md shadow-sm p-4 md:col-span-6 space-y-2">
          <TypographyLarge className="mb-2">Thông tin vận chuyển</TypographyLarge>
          <p>
            Giao hàng đến: <span className="font-medium">Phường Bến Nghé, Quận 1, Hồ Chí Minh</span>
          </p>

          <FormQuantity />
        </div>

        <div className="bg-background rounded-md shadow-sm p-4 md:col-span-6 space-y-2">
          <TypographyLarge className="mb-2">Thông tin chi tiết</TypographyLarge>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground w-[200px]">Thể loại</TableCell>
                <TableCell>{book.category.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground w-[200px]">Tác giả</TableCell>
                <TableCell>{book.author}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground w-[200px]">Nhà xuất bản</TableCell>
                <TableCell>{book.publisher.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground w-[200px]">Năm xuất bản</TableCell>
                <TableCell>{book.publishYear}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground w-[200px]">Trọng lượng (gr)</TableCell>
                <TableCell>{book.weight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground w-[200px]">Kích thước</TableCell>
                <TableCell>{book.size}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted-foreground w-[200px]">Số trang</TableCell>
                <TableCell>{book.pages}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-background rounded-md shadow-sm p-4 md:col-span-6 space-y-2">
          <TypographyLarge className="mb-2">Mô tả sản phẩm</TypographyLarge>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  )
}

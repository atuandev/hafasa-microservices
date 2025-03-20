'use client'

import { deleteAddressById } from '@/actions/users/address'
import { DeleteButton } from '@/components/common/delete-button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PageAddress } from '@/types/address'
import { PaginationWithLinks } from '@/components/ui/pagination-with-links'

type ListAddressesProps = {
  params: { [key: string]: string | string[] | undefined }
  addresses: PageAddress
}

export default function ListAddresses({ addresses, params }: ListAddressesProps) {
  const pageNo = params.page ? parseInt(params.page as string) : 1
  const pageSize = params.pageSize ? parseInt(params.pageSize as string) : 6

  const handleDeleteAddress = async (addressId: string) => {
    // show confirmation dialog
    if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?')) await deleteAddressById(addressId)
  }

  return (
    <>
      <Table>
        <TableHeader className='bg-sidebar'>
          <TableRow>
            <TableHead className='w-[5%] text-center'>#</TableHead>
            <TableHead className='w-[20%]'>Tên người nhận</TableHead>
            <TableHead className='w-[15%]'>Số điện thoại</TableHead>
            <TableHead className='text-right'>Địa chỉ</TableHead>
            <TableHead className='w-[20%] text-center'>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.items?.map((address, index) => (
            <TableRow key={address.id}>
              <TableCell className='w-[5%] text-center'>{index + 1}</TableCell>
              <TableCell className='w-[20%]'>{address.receiverName}</TableCell>
              <TableCell className='w-[15%]'>{address.receiverPhone}</TableCell>
              <TableCell className='text-right'>{address.address}</TableCell>
              <TableCell className='w-[20%] text-center'>
                <div className='w-full flex items-center justify-center'>
                  <DeleteButton onClick={() => handleDeleteAddress(address.id)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationWithLinks
        page={pageNo}
        pageSize={pageSize}
        totalCount={addresses.totalElements}
        pageSizeSelectOptions={{ pageSizeOptions: [6, 12, 20] }}
      />
    </>
  )
}

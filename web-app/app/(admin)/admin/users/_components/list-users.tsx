import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { TypographyH3 } from '@/components/typography'
import { Skeleton } from '@/components/ui/skeleton'
import { UsersTable } from './users-table'
import { UsersFilter } from './users-filter' // Ensure this file exists in the same directory or adjust the path
import { PageUsersResponse } from '@/types/user'

interface ListUsersProps {
  usersData: PageUsersResponse['data']
}

export default function ListUsers({ usersData }: ListUsersProps) {
  return (
    <div className='space-y-6'>
      {/* <div className='mb-6 flex items-center justify-between'>
        <TypographyH3 className='text-primary'>Danh sách người dùng</TypographyH3>
        
        <Link href='/admin/users/add'>
          <Button type='button'>Thêm người dùng</Button>
        </Link>
      </div> */}

      <UsersFilter />
      <UsersTable users={usersData} />
    </div>
  )
}

ListUsers.Skeleton = function ListUsersSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      <Skeleton className='h-16 w-full' />
    </div>
  )
}
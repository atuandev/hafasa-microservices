'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition, useEffect } from 'react'
import { toast } from 'sonner'

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
import { PageUsersResponse, RoleEnum, UserStatus } from '@/types/user'
import { Edit, Trash2, UserCog } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface UsersTableProps {
  users: PageUsersResponse['data']
}

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter()
  
  // Debug - log the users prop when component renders
  useEffect(() => {
    console.log('Users table received data:', users)
    console.log('Users items array:', users?.items)
  }, [users])
  
  const handleDelete = (userId: string) => {
    startTransition(async () => {
      toast.info('Chức năng xóa người dùng chưa được triển khai')
      router.refresh()
    })
  }

  // Check if users is defined and has the expected structure
  const hasUsers = users && Array.isArray(users.items) && users.items.length > 0

  return (
    <div className='space-y-4'>
      <div className='rounded-md border p-4'>
        {!users && <div className="p-4 text-amber-500">Loading users data...</div>}
        {users && !Array.isArray(users.items) && (
          <div className="p-4 text-red-500">
            Error: Expected users.items to be an array but got {typeof users.items}
          </div>
        )}
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[80px]'>Avatar</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Username</TableHead>
              <TableHead className='text-center'>Vai trò</TableHead>
              <TableHead className='text-center'>Trạng thái</TableHead>
              <TableHead className='w-[110px] text-center'>Ngày tạo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasUsers ? (
              users.items.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="size-10">
                      <AvatarImage src={user.avatar || '/images/default-avatar.svg'} alt={`Avatar of ${user.name}`} />
                    </Avatar>
                  </TableCell>
                  <TableCell className='font-medium'>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell className='text-center'>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {user.roles && user.roles.map(role => (
                        <Badge 
                          key={role.name} 
                          className={role.name === RoleEnum.ADMIN ? 
                            'bg-purple-500 text-white hover:bg-purple-600' : 
                            'bg-blue-500 text-white hover:bg-blue-600'
                          }
                        >
                          {role.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className='text-center cursor-default select-none'>
                    {user.status === UserStatus.ACTIVE && (
                      <Badge className='bg-emerald-500 text-white hover:bg-emerald-600'>Hoạt động</Badge>
                    )}
                    {user.status === UserStatus.DISABLED && (
                      <Badge className='bg-red-500 text-white hover:bg-red-600'>Đã khóa</Badge>
                    )}
                  </TableCell>
                  {/* <TableCell className='text-right'>
                    <div className='flex justify-end gap-2'>
                      <Link href={`/admin/users/${user.id}`}>
                        <Button variant='gray' size='icon' aria-label={`Edit ${user.name}`}>
                          <Edit className='h-4 w-4' />
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant='gray'
                            size='icon'
                            className='text-destructive hover:bg-destructive/10'
                            aria-label={`Delete ${user.name}`}
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bạn có chắc chắn muốn xóa người dùng này?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Điều này sẽ xóa người dùng khỏi cơ sở dữ liệu một cách vĩnh viễn.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(user.id)}
                              className='text-destructive-foreground'
                            >
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell> */}
                  <TableCell>{new Date(user.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className='h-24 text-center'>
                  Không tìm thấy người dùng nào.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {users && (
          <PaginationWithLinks
            page={users.pageNo}
            pageSize={users.pageSize}
            totalCount={users.totalElements}
            pageSizeSelectOptions={{ pageSizeOptions: [10, 20, 50] }}
          />
        )}
      </div>
    </div>
  )
}
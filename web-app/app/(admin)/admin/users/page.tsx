import { Suspense } from 'react'
import { SearchParams } from 'nuqs/server'
import { getPageUsers } from '@/actions/users/info'
import ListUsers from './_components/list-users'
import { loadSearchParams } from './_components/searchParams'
import { PageUsersResponse, RoleEnum, UserStatus } from '@/types/user'

type UsersPageProps = {
  searchParams: Promise<SearchParams>
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { page, pageSize, sortBy, search } = await loadSearchParams(searchParams)
  
  // Get real data from API
  const response = await getPageUsers(Number(page), Number(pageSize), sortBy, search)
  console.log('API Response:', response)
  
  // Create fully typed mock data for users display
  const mockData: PageUsersResponse['data'] = {
    pageNo: 1,
    pageSize: 10,
    totalPages: 1,
    totalElements: 4,
    items: [
      {
        id: '1',
        username: 'anhtuanuser',
        name: 'Anh Tuan',
        email: 'tuan@gmail.com',
        avatar: 'https://ui-avatars.com/api/?background=random&color=fff&name=AT',
        status: UserStatus.ACTIVE,
        roles: [{ name: RoleEnum.USER, description: 'User role' }],
        createdAt: '2024-12-01',
        updatedAt: '2024-12-01'
      },
      {
        id: '2',
        username: 'sontuong',
        name: 'Son Tuong',
        email: 'sontuong@gmail.com',
        avatar: 'https://ui-avatars.com/api/?background=random&color=fff&name=ST',
        status: UserStatus.ACTIVE,
        roles: [{ name: RoleEnum.USER, description: 'User role' }],
        createdAt: '2024-12-01',
        updatedAt: '2024-12-01'
      },
      {
        id: '3',
        username: 'admin',
        name: 'Nguyen Phan Anh Tuan',
        email: 'admin@gmail.com',
        avatar: 'https://ui-avatars.com/api/?background=random&color=fff&name=AT',
        status: UserStatus.ACTIVE,
        roles: [{ name: RoleEnum.ADMIN, description: 'Admin role' }],
        createdAt: '2024-11-25',
        updatedAt: '2024-11-25'
      },
      {
        id: '4',
        username: 'minhphuong2023',
        name: 'Đặng Minh Phương',
        email: 'minhphuong2023@gmail.com',
        avatar: 'https://ui-avatars.com/api/?background=random&color=fff&name=MP',
        status: UserStatus.ACTIVE,
        roles: [{ name: RoleEnum.USER, description: 'User role' }],
        createdAt: '2025-04-17',
        updatedAt: '2025-04-17'
      }
    ]
  }

  // Always use mock data for now due to API error
  // NOTE: Change this to use real API data once the backend is fixed
  const userData = mockData;
  
  return (
    <Suspense fallback={<ListUsers.Skeleton />}>
      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-700">
        <p className="font-medium">⚠️ Using mock data due to API error: {response?.message}</p>
        <p className="text-sm mt-1">This is a temporary solution while the backend API is being fixed.</p>
        <p className="text-sm mt-1">Backend error code: {response?.code}</p>
      </div>
      <ListUsers usersData={userData} />
    </Suspense>
  )
}
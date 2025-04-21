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
  const { page, pageSize, sortBy } = await loadSearchParams(searchParams)
  
  // Fetch users data from API
  const response = await getPageUsers(Number(page), Number(pageSize), sortBy, '')
  console.log('API Response:', response)
  
  // Check if response is successful (code 1000 for successful response) and has data
  if (response?.code === 1000 && response?.data) {
    return (
      <Suspense fallback={<ListUsers.Skeleton />}>
        <ListUsers usersData={response.data} />
      </Suspense>
    )
  }
  
  // If API returned an error or no data, display an error message
  return (
    <Suspense fallback={<ListUsers.Skeleton />}>
      <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-700">
        <p className="font-medium">⚠️ API Error: {response?.message}</p>
        <p className="text-sm mt-1">Unable to retrieve user data from the backend API.</p>
        <p className="text-sm mt-1">Error code: {response?.code}</p>
      </div>
      
      {/* Provide empty data structure to prevent errors in the ListUsers component */}
      <ListUsers usersData={{
        pageNo: 1,
        pageSize: 10,
        totalPages: 0,
        totalElements: 0,
        items: []
      }} />
    </Suspense>
  )
}
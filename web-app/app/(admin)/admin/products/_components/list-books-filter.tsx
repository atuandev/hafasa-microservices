import { BooksSortConditions } from './books-sort-conditions'
import { BooksSearchConditionsForm } from './books-search-conditions-form'

export function ListBookFilter() {
  return (
    <div className='space-y-4 w-full'>
      <BooksSortConditions />
      <BooksSearchConditionsForm />
    </div>
  )
}

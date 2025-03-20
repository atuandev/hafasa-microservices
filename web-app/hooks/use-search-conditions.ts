'use client'

import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
import { z } from 'zod'

export const searchFormSchema = z.object({
  field: z.string(),
  operator: z.string(),
  value: z.string(),
})

export type SearchFormValues = z.infer<typeof searchFormSchema>

export interface SearchCondition {
  field: string
  operator: string
  value: string
}

interface SearchConfig {
  entityKey?: string
}

/**
 * Custom hook for managing search conditions in URL query parameters
 * 
 * URL: books=title~:Hai,price<100000
 * 
 * @param {string} entityKey - Key used in URL query parameter (defaults to 'entity')
 * @returns {Object} Object containing search conditions and methods to manipulate them
 * 
 */
export const useSearchConditions = ({ entityKey = 'entity' }: SearchConfig = {}) => {
  const [conditions, setConditions] = useQueryState(
    entityKey,
    parseAsArrayOf(parseAsString).withDefault([]).withOptions({
      shallow: false,
      throttleMs: 100,
      history: 'push',
    })
  )

  const parseConditionString = (conditionString: string): SearchCondition | null => {
    const match = conditionString.match(/^([^~:><!]+)([~:><!])(.+)$/)
    if (!match) return null

    const [, field, operator, value] = match
    return { field, operator, value }
  }

  const serializeCondition = ({ field, operator, value }: SearchCondition): string => {
    return `${field}${operator}${value}`
  }

  const getValidConditions = (): SearchCondition[] => {
    return conditions.map(parseConditionString).filter((condition): condition is SearchCondition => condition !== null)
  }

  const addCondition = (newCondition: SearchCondition) => {
    const conditionStr = serializeCondition(newCondition)
    setConditions(prev => [...prev, conditionStr])
  }

  const removeCondition = (index: number) => {
    setConditions(prev => prev.filter((_, i) => i !== index))
  }

  const clearConditions = async () => {
    await setConditions([])
  }

  const updateSearchParams = (values?: SearchFormValues) => {
    if (!values?.field || !values?.operator || !values?.value) return
    addCondition(values)
  }

  const replaceConditions = (newConditions: SearchCondition[]) => {
    const serializedConditions = newConditions.map(serializeCondition)
    setConditions(serializedConditions)
  }

  return {
    conditions: getValidConditions(),
    addCondition,
    removeCondition,
    clearConditions,
    updateSearchParams,
    replaceConditions,
  }
}

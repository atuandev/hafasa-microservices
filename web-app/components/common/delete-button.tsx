'use client'

import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DeleteButtonProps {
  onClick: () => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button size="iconSmall" variant="gray" onClick={onClick}>
      <Trash className="text-gray-600" />
    </Button>
  )
}

export { DeleteButton }
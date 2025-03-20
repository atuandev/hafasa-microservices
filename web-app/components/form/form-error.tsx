import { CircleAlert } from 'lucide-react'

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className='flex items-center space-x-3 text-destructive text-sm bg-destructive/15 p-3 rounded-md'>
      <CircleAlert className='size-5' />
      <span>{message}</span>
    </div>
  );
}

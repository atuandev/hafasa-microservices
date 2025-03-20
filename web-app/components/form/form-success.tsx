import { CircleCheck } from 'lucide-react'

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className='flex items-center space-x-3 text-emerald-500 text-sm bg-emerald-500/15 p-3 rounded-md'>
      <CircleCheck className='size-5' />
      <span>{message}</span>
    </div>
  );
}

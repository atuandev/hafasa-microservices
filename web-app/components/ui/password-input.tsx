'use client'

import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

import { InputProps } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

    return (
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400"
             onClick={togglePasswordVisibility}>
          {showPassword ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </div>
      </div>
    )
  },
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }

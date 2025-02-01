"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuProps {
  children: React.ReactNode
  className?: string
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  className?: string
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
  align?: 'start' | 'end'
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

interface DropdownMenuLabelProps {
  children: React.ReactNode
  className?: string
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}>({
  isOpen: false,
  setIsOpen: () => {},
})

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={cn("relative inline-block text-left", className)}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, className }: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={cn(
        "inline-flex items-center justify-center",
        className
      )}
    >
      {children}
    </button>
  )
}

export function DropdownMenuContent({ 
  children, 
  className,
  align = 'end' 
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 min-w-[8rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
        align === 'end' ? 'right-0' : 'left-0',
        className
      )}
    >
      <div className="py-1">{children}</div>
    </div>
  )
}

export function DropdownMenuItem({ 
  children, 
  className,
  onClick,
  disabled = false
}: DropdownMenuItemProps) {
  const { setIsOpen } = React.useContext(DropdownMenuContext)

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick()
      setIsOpen(false)
    }
  }

  return (
    <button
      type="button"
      className={cn(
        "w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return (
    <div className={cn("h-px my-1 bg-gray-200", className)} />
  )
}

export function DropdownMenuLabel({ children, className }: DropdownMenuLabelProps) {
  return (
    <div className={cn("px-4 py-2 text-sm font-semibold text-gray-900", className)}>
      {children}
    </div>
  )
}

// Export simplified versions of the components
export {
  DropdownMenu as Root,
  DropdownMenuTrigger as Trigger,
  DropdownMenuContent as Content,
  DropdownMenuItem as Item,
  DropdownMenuSeparator as Separator,
  DropdownMenuLabel as Label,
}

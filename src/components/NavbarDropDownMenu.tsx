import React from 'react'

interface DropdownMenuProps {
  isOpen: boolean
  onSignOut: () => void
}

export default function NavBarDropDownMenu({
  isOpen,
  onSignOut
}: DropdownMenuProps) {
  if (!isOpen) {
    return null
  }
  return (
    isOpen && (
      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div
          className="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            role="menuitem"
            onClick={onSignOut}
          >
            Sign out
          </a>
        </div>
      </div>
    )
  )
}

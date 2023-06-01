interface SearchBarDropdownMenuProps {
  data: User[]
}

interface User {
  id: number
  name: string
  email: string
  address: string
}

export default function SearchBarDropdownMenu({
  data
}: SearchBarDropdownMenuProps) {
  return (
    <div className="absolute mt-1 bg-white border border-primary rounded-md shadow-lg w-100">
      {data.map((item) => (
        <div
          key={item.id}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <p className="text-gray-800">{item.name}</p>
          <p className="text-gray-600">{item.email}</p>
          <p className="text-gray-600">{item.address}</p>
        </div>
      ))}
    </div>
  )
}

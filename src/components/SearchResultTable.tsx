// interface SearchResultTableProps {
//   data: Array<{
//     id: number
//     name: string
//     email: string
//     address: string
//   }>
// }

// export default function SearchResultTable({ data }: SearchResultTableProps) {
//   if (!Array.isArray(data)) {
//     return null
//   }

//   if (data.length === 0) {
//     return <div>No results found.</div>
//   }

//   return (
//     <div className="search-result-table">
//       {data.map((item) => (
//         <div key={item.id} className="search-result-row">
//           <div className="search-result-label">Name:</div>
//           <div className="search-result-value">{item.name}</div>
//           <div className="search-result-label">Email:</div>
//           <div className="search-result-value">{item.email}</div>
//           <div className="search-result-label">Address:</div>
//           <div className="search-result-value">{item.address}</div>
//         </div>
//       ))}
//     </div>
//   )
// }

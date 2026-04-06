export default function DataTable({ headers, rows, keyExtractor }) {
  return (
    <div className="data-table-wrapper">
      <div className="data-table-scroll">
        <table className="data-table">
          <thead>
            <tr>
              {headers.map(h => (
                <th key={typeof h === 'string' ? h : h.label}>
                  {typeof h === 'string' ? h : h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={keyExtractor ? keyExtractor(row, rowIdx) : rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} style={cell?.style} className={cell?.className || ''}>
                    {cell?.value !== undefined ? cell.value : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

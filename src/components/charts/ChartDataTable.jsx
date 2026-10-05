/**
 * A chart's table view, for screen readers — every value the chart draws,
 * so nothing is reachable only by hovering (the dataviz rule that a table
 * view always exists). `rows` is `[{ id, cells: [...] }]`, the first cell
 * naming the row; `headers` names the columns.
 */
export default function ChartDataTable({ caption, headers = [], rows = [] }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead>
        <tr>
          {headers?.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row) => (
          <tr key={row?.id}>
            {row?.cells?.map((cell, index) => (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

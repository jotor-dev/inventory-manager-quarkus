function RawMaterialTable({ list }) {
  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Suggestions</h2>
      <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Total Value: {list.totalValue}</h3>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Quantity to produce</th>
            <th className="px-4 py-2 text-left">Subtotal Value</th>
          </tr>
        </thead>
        <tbody>
          {list.items.map((suggestion) => (
            <tr key={suggestion.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 font-mono text-sm">{suggestion.name}</td>
              <td className="px-4 py-2">{suggestion.quantityCanProduce}</td>
              <td className="px-4 py-2 text-green-700">{suggestion.subtotalValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RawMaterialTable
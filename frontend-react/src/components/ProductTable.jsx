function ProductTable({ list }) {
  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Products</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Code</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {list.map((product) => (
            <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 font-mono text-sm">{product.code}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2 text-green-700">R$ {product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable
export default function TokenInfo() {
  return (
    <section className="p-10 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Token Details</h2>
      <ul className="space-y-2">
        <li>🔹 Name: MyToken</li>
        <li>🔹 Symbol: MTK</li>
        <li>🔹 Supply: 1,000,000</li>
        <li>🔹 Price: 1 MTK = 0.01 ETH</li>
      </ul>
    </section>
  );
}

export default function Card({ description, data }) {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4 mr-4">
      {
        <div>
          {description}: {data}
        </div>
      }
    </div>
  );
}

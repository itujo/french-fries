import { sub } from "date-fns";
import { useState } from "react";
import type { SubQueryResponse } from "../../@types/response";
import { Api } from "../../services/api";

export async function getServerSideProps() {
  const labelTypes = await Api.get("/opt/labels")
    .then(({ data }) => data)
    .catch((err) => err.response.data);

  const movTypes = await Api.get("/opt/movtypes")
    .then(({ data }) => data)
    .catch((err) => err.response.data);

  return {
    props: {
      labelTypes,
      movTypes,
    }, // will be passed to the page component as props
  };
}

export default function querySubpackages({ labelTypes, movTypes }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [labelType, setLabelType] = useState<number | null>(labelTypes[0].code);
  const [movementType, setMovementType] = useState<number | null>(null);
  const [endTime, setEndTime] = useState(
    new Date().toISOString().split(".")[0]!
  );
  const [startTime, setStartTime] = useState(
    sub(new Date(endTime), {
      hours: 4,
    })
      .toISOString()
      .split(".")[0]
  );

  const [movData, setMovData] = useState<SubQueryResponse | null>(null);

  async function handleSubmit() {
    setIsSubmitting(true);
    const r = await Api.post("/subpackages/hourbyhour", {
      labelType,
      movementType,
      startTime,
      endTime,
    })
      .then(({ data }) => data)
      .catch((err) => err.response.data);

    setIsSubmitting(false);

    setMovData(r);
  }

  if (labelTypes && movTypes) {
    return (
      <>
        <div className="flex justify-center w-full">
          <div className="bg-white shadow-md rounded p-4 mb-4">
            <h1 className="text-center mt-2">consulta de subpacotes</h1>
            <div className=" flex flex-1 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="labels"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  etiqueta
                </label>
                <select
                  id="labels"
                  onChange={(e) => setLabelType(parseInt(e.target.value, 10))}
                  className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  {labelTypes.map((label) => (
                    <option key={label.id} value={label.code}>
                      {label.description}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="movType"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  status
                </label>
                <select
                  id="movType"
                  onChange={(e) =>
                    setMovementType(parseInt(e.target.value, 10))
                  }
                  className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  {movTypes.map((movType) => (
                    <option key={movType.id} value={movType.code}>
                      {movType.description}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="labels"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  hora inicial
                </label>
                <input
                  className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="datetime-local"
                  name="date"
                  id="date"
                  step={1}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="labels"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  hora final
                </label>
                <input
                  className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  type="datetime-local"
                  name="date"
                  id="date"
                  step={1}
                  onChange={(e) => setEndTime(e.target.value)}
                  value={endTime}
                />
              </div>
              <div className="mt-6">
                <button
                  className={`h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center`}
                  onClick={handleSubmit}
                >
                  <svg
                    role="status"
                    className={`inline w-4 h-4 text-white animate-spin ${
                      !isSubmitting ? "hidden" : ""
                    }`}
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  &nbsp;consultar
                </button>
              </div>
            </div>
          </div>
        </div>
        {movData && (
          <div className="flex justify-center w-full">
            contagem: {movData.movCount}
          </div>
        )}
      </>
    );
  }

  return <div>loading</div>;
}

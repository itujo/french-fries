import { Card as FlowCard } from "flowbite-react";
export default function Card({ description, data }) {
  return (
    <>
      {/* <div className="flex flex-col justify-center items-center mr-4 mb-4  p-4 w-1/6 h-32 bg-white rounded-lg border border-gray-200 shadow-md ">
        <div className="flex">
          <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 ">
            {description}
          </h5>
        </div>

        <div className="flex">
          <p className="font-normal text-center text-2xl text-gray-700 ">
            {data}
          </p>
        </div>
      </div> */}

      <FlowCard>
        <h5 className="text-3xl text-center w-full lg:text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {description}
        </h5>
        <p className="text-3xl lg:text-xl text-center font-normal text-gray-700 dark:text-gray-400">
          {data}
        </p>
      </FlowCard>
    </>
  );
}

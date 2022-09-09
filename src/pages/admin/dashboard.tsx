import useSWR from "swr";
import { Api } from "../../services/api";
import { getParcelsData } from "../../utils/getParcelsData";

export async function getStaticProps() {
  // `getStaticProps` is executed on the server side.
  const parcelsData = await getParcelsData();
  return {
    props: {
      fallback: {
        "/subpackages/getall": parcelsData,
      },
    },
  };
}

const fetcher = (url: string) => Api.post(url).then((res) => res.data);
export default function Dashboard() {
  const { data, error } = useSWR("/subpackages/getall", fetcher);

  console.log(data);

  if (!data) return <div>loading</div>;
  if (data) {
    const { PACKING, READY_TO_PICK, RECEIVING, SELLER_SHIPPED, SENT } = data;
    return (
      <div>
        <div>receiving: {RECEIVING}</div>
        <div>packing: {PACKING}</div>
        <div>ready_to_pick: {READY_TO_PICK}</div>
        <div>seller_shipped: {SELLER_SHIPPED}</div>
        <div>sent: {SENT}</div>
      </div>
    );
  }

  if (error) return <div>error</div>;
  return <div></div>;
  // return (
  //   <div className="flex justify-center w-full">
  //     <div className="bg-white shadow-md rounded p-4 mb-4">hello</div>
  //   </div>
  // );
}

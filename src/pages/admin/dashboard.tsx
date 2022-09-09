import useSWR, { SWRConfig } from "swr";
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

function Parcels() {
  const { data, error } = useSWR("/subpackages/getall", fetcher);

  if (!data) return <div>loading</div>;
  if (data) {
    const { PACKING, READY_TO_PICK, RECEIVING, SELLER_SHIPPED, SENT } = data;
    return (
      <div>
        <div>receiving: {RECEIVING}</div>
        <div>packing A: {PACKING.labelA}</div>
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

export default function Dashboard({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Parcels />
    </SWRConfig>
  );
}

import { format } from "date-fns";
import { useEffect, useState } from "react";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import type { GetWarehouses } from "../../../../@types/getOptions";
import type { ParcelTypes } from "../../../../@types/response";
import ParcelCards from "../../../../components/Parcel/ParcelCards/ParcelCards";
import { Api } from "../../../../services/api";
import { getParcelsData } from "../../../../utils/getParcelsData";

export async function getStaticPaths() {
  const warehouses: GetWarehouses[] = await Api.get("/opt/warehouses")
    .then(({ data }) => data)
    .catch((err) => err.response.data);

  const paths = warehouses.map((warehouse) => ({
    params: { id: warehouse.code },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { parcelsData, updatedDate } = await getParcelsData(params.id);
  return {
    revalidate: 10,
    props: {
      fallback: {
        [unstable_serialize(`/subpackages/getall/${params.id}`)]: parcelsData,
      },
      params,
      lastUpdated: updatedDate,
    },
  };
}

const fetcher = (url: string) => Api.get(url).then((res) => res.data);

function Parcels({ params, lastUpdated }) {
  const [lLastUpdated, setLastUpdated] = useState(lastUpdated);
  const { data, error } = useSWR<ParcelTypes | null>(
    `/subpackages/getall/${params.id}`,
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  useEffect(() => {
    setLastUpdated(new Date().toJSON());
  }, [data]);

  if (!data) return <div>loading</div>;
  if (data) {
    return (
      <>
        <div className="text-center text-lg">
          Última atualização:&nbsp;
          <p className="font-bold">
            {format(new Date(lLastUpdated), "HH:mm:ss dd-MM-yyyy ")}
          </p>
        </div>
        <ParcelCards data={data} />
      </>
    );
  }

  if (error) return <div>error</div>;
  return <></>;
}

export default function Dashboard({ fallback, params, lastUpdated }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Parcels params={params} lastUpdated={lastUpdated} />
    </SWRConfig>
  );
}

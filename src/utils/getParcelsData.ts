import { Api } from "../services/api";

async function getParcelsData(d) {
  const parcelsData = await Api.get(`/subpackages/getall/${d}`).then(
    ({ data }) => data
  );

  return parcelsData;
}

export { getParcelsData };

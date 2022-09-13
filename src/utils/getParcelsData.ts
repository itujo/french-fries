import { Api } from "../services/api";

async function getParcelsData(d) {
  const parcelsData = await Api.get(`/subpackages/getall/${d}`).then(
    ({ data }) => data
  );

  const updatedDate = new Date().toJSON();

  return { parcelsData, updatedDate };
}

export { getParcelsData };

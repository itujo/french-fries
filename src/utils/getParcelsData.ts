import { Api } from "../services/api";

async function getParcelsData(d) {
  let updatedDate;
  const parcelsData = await Api.get(`/subpackages/getall/${d}`).then(
    ({ data }) => {
      updatedDate = new Date().toJSON();

      return data;
    }
  );

  return { parcelsData, updatedDate };
}

export { getParcelsData };

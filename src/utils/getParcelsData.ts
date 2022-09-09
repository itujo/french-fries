import { Api } from "../services/api";

async function getParcelsData() {
  const parcelsData = await Api.post("/subpackages/getall").then(
    ({ data }) => data
  );

  console.log(parcelsData);

  return parcelsData;
}

export { getParcelsData };

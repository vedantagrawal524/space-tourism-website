let data = null;

const getData = async () => {
  if (data) return data;

  const response = await fetch("./assets/data/data.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  const jsonResponse = await response.json();
  data = {
    destinations: jsonResponse.destinations,
    crews: jsonResponse.crews,
    technologys: jsonResponse.technologys,
  };
  console.log(data.destinations);
  console.log(data.destinations.moon);

  return data;
};

export { getData };

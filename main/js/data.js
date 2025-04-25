const myData = {
  destinations: [],
  crew: [],
  technology: [],
};

const getData = async () => {
  const response = await fetch("../assets/data/data.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const jsonResponse = await response.json();

  myData.destinations = jsonResponse.destinations;
  myData.crew = jsonResponse.crew;
  myData.technology = jsonResponse.technology;
};

getData();

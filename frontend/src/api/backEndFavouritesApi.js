export const backendFavouritesApi = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/get/favourite`
    );
    const data = await response.json();
    console.log("Backend data", data);
    return data;
  } catch (error) {
    console.error("Error fetching backend data: ", error);
    return [];
  }
};

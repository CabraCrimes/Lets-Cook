export const backendFavouritesApi = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return [];
    }

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/get/favourite`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log("Back API", response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      return <p>No favorites found.</p>;
    }
    console.log("response",response);
    console.log("Backend data", data);
    return data;
  } catch (error) {
    console.error("Error fetching backend data: ", error);
    return [];
  }
};

// export const favouriteApi = async (favouriteLabels) => {
//     try {
//       if (favouriteLabels) {
//         const promise = favouriteLabels.map(async (label) => {
//             const response = await fetch(`${process.env.REACT_APP_BASE_URL}/recipes/favourite/${label}`);
//             const data = await response.json();
//             return data
//         })
//         const favouriteData = await Promise.all(promise)
//         console.log("EDAMAM data", favouriteData)
//         return favouriteData;
//       } else {
//         console.log("EDAMAM favourite is empty");
//         return []
//       };
//     } catch (error) {
//       console.error("Error fetching recipes: ", error);
//       return [];
//     }
//   };
  
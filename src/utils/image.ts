export const getImageUrl = (id: string) =>
  `${import.meta.env.VITE_API_BASE_URL}/images/get/${id}`;

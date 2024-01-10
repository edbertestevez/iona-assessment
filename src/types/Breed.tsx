// Note: Only defined required fields for this assessment
export type Breed = {
  id: string;
  name: string;
  image: {
    id: string;
    url: string;
  };
};

export type BreedImage = {
  id: string;
  url: string;
  height: number;
  width: number;
};

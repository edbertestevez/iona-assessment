import { LoaderFunctionArgs } from 'react-router-dom';

import api from '../../../api';
import { Breed } from '../../../types/Breed';

export type HomepageLoaderData = {
  breeds: Breed[];
  breedQuery?: string;
};

const HomepageLoader = async ({ request }: LoaderFunctionArgs) => {
  const breedQuery = new URL(request.url).searchParams.get('breed');

  const breeds = await api.getAllBreeds();
  return { breeds, breedQuery };
};

export default HomepageLoader;

import api from '../../../api';

const HomepageLoader = async () => {
  const breeds = await api.getAllBreeds();
  return breeds;
};

export default HomepageLoader;

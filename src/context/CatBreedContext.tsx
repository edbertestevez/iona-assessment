import React, {
  ReactNode,
  useCallback,
  useContext,
  createContext,
  useState,
  useMemo,
} from 'react';

import api from '../api';
import { BreedImage } from '../types/Breed';

interface CatBreedContextProps {
  breedId: string;
  setBreed: (id: string) => void;
  breedImages: BreedImage[];
  setBreedImages: React.Dispatch<React.SetStateAction<BreedImage[]>>;
  hasBreedImages: boolean;
  isEndReached: boolean;
  isLoading: boolean;
  isRequested: boolean;
  isError: boolean;
  getNextPage: () => void;
}

const CatBreedContext = createContext<CatBreedContextProps | undefined>(
  undefined,
);

/**
 * The 'pagination-count' and 'pagination-limit' can be found in the response
 * headers but since response images could be duplicated from previous response,
 * I reduced the response and check for unique images only
 */
const filterUniqueImages = (prevImages: BreedImage[], images: BreedImage[]) => {
  // Filter and append only unique images from the paginated response
  const uniqueImages: BreedImage[] = images.reduce(
    (acc: BreedImage[], currImage: BreedImage) => {
      const isExisting = acc.find((item) => item.id === currImage.id);

      if (!isExisting) {
        return acc.concat(currImage);
      }

      return acc;
    },
    prevImages,
  );

  return uniqueImages;
};

const CatBreedProvider = ({ children }: { children: ReactNode }) => {
  const [breedId, setBreedId] = useState<string>('');
  const [breedImages, setBreedImages] = useState<BreedImage[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const hasBreedImages = useMemo(() => breedImages.length > 0, [breedImages]);

  const fetchBreedImages = useCallback(
    async (currBreedId: string, currPage: number) => {
      try {
        setIsLoading(true);

        const imagesResponse = await api.getBreedImages({
          breedId: currBreedId,
          page: currPage,
        });

        if (imagesResponse.length === 0) {
          setIsEndReached(true);
        }

        const prevImages = currPage === 1 ? [] : [...breedImages];

        const uniqueImages = filterUniqueImages(prevImages, imagesResponse);

        // Set end reached if no updates in unique image count
        if (currPage > 1 && uniqueImages.length <= prevImages.length) {
          setIsEndReached(true);
        }

        setBreedImages(uniqueImages);
        setIsLoading(false);
        setIsError(false);
        setIsRequested(true);
      } catch (err: any) {
        setIsError(true);
      }
    },
    [breedImages],
  );

  const getNextPage = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchBreedImages(breedId, nextPage);
  }, [fetchBreedImages, page, breedId]);

  const setBreed = useCallback(
    (id: string) => {
      // Reset values on breed change
      setBreedId(id);
      setBreedImages([]);
      setPage(1);
      setIsEndReached(false);
      setIsRequested(false);

      if (id !== '' && id !== breedId) {
        fetchBreedImages(id, 1);
      }
    },
    [fetchBreedImages, breedId],
  );

  return (
    <CatBreedContext.Provider
      value={{
        breedId,
        setBreed,
        breedImages,
        setBreedImages,
        hasBreedImages,
        isEndReached,
        isLoading,
        isRequested,
        isError,
        getNextPage,
      }}
    >
      {children}
    </CatBreedContext.Provider>
  );
};

const useCatBreedContext = () => {
  const context = useContext(CatBreedContext);

  if (!context) {
    throw new Error('useCatBreed must be used within a CatBreedProvider');
  }

  return context;
};

export { CatBreedProvider, useCatBreedContext };

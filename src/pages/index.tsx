import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface DataProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface PageCleansingProps {
  data: {
    data: DataProps[];
    after: null | string;
  };
}

interface DataCleansingProps {
  data: { pages: PageCleansingProps[] };
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => Promise<DataCleansingProps>;
}

export default function Home(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetchImages = async ({ pageParam = 0 }) =>
    // eslint-disable-next-line no-return-await
    await api
      .get(`/api/images`, {
        params: {
          after: pageParam,
        },
      })
      .then(res => res);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  }: DataCleansingProps = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.data.after,
  });

  const formattedData = useMemo(() => {
    // eslint-disable-next-line no-shadow
    return data?.pages?.map(({ data }) => data.data).flat();
  }, [data]);

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      {isError ? (
        <Error />
      ) : (
        <Box maxW={1120} px={20} mx="auto" my={20}>
          <CardList cards={formattedData} />
          {hasNextPage && (
            <Button
              mt="2.5rem"
              onClick={() => fetchNextPage()}
              colorScheme="orange"
            >
              {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
            </Button>
          )}
        </Box>
      )}
    </>
  );
}

import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
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

interface ReturnDataProps {
  data: DataProps[];
  after: null | string;
}

interface PageCleansingProps {
  data: {
    data: DataProps[];
    after: null | string;
  };
}

interface DataCleansingProps {
  pages: PageCleansingProps[];
}

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetchImages = async ({ pageParam = 0 }) =>
    // eslint-disable-next-line no-return-await
    await api.get(`/api/images?cursor=${pageParam}`).then(res => res);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  }: { data: DataCleansingProps } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  const formattedData = useMemo(() => {
    if (data) {
      const { data: pageData, after } = data.pages[0].data;
      return {
        pageData,
        after,
      };
    }

    return null;
  }, [data]);

  function handleFetchNextPage() {
    const nextPageData = fetchNextPage();

    console.log(nextPageData);

    return nextPageData;
  }

  return (
    <>
      <Header />

      {isLoading && <Loading />}

      {isError ? (
        <Error />
      ) : (
        <Box maxW={1120} px={20} mx="auto" my={20}>
          <CardList cards={formattedData?.pageData} />
          {formattedData?.after && (
            <Button
              mt="2.5rem"
              onClick={() => handleFetchNextPage()}
              colorScheme="orange"
            >
              Carregar mais
            </Button>
          )}
        </Box>
      )}
    </>
  );
}

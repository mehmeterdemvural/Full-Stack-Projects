import React from 'react';
import { Grid, Button } from '@chakra-ui/react';
import { useInfiniteQuery } from 'react-query';

import { fetchProductList } from '../../api.js';
import Cards from '../../components/Card/index.js';


function Products() {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('products', fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 9;

      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    },
  });

  if (status === 'loading') return 'Loading...';

  if (status === 'error') return 'An error has occurred: ' + error.message;

  return (
    <div>
      <Grid templateColumns="repeat(3, 1fr)" gap={1}>
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <div>
         <Button
           onClick={() => fetchNextPage()}
           isLoading= {isFetchingNextPage}
           disabled={!hasNextPage || isFetchingNextPage}
         >
           {isFetchingNextPage
             ? 'Loading more...'
             : hasNextPage
             ? 'Load More'
             : 'Nothing more to load'}
         </Button>
       </div>
    </div>
  );
}

export default Products;

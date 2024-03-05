import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';

import { fetchProduct } from '../../api';
import { useBasket } from '../../contexts/BasketContext';

function ProductDetail() {
  const { product_id } = useParams();
  const { items, addToBasket } = useBasket();

  const { isLoading, isError, data } = useQuery(['product', product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading . . . </div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  
  const findBasketItem = items.find((item) => item._id === product_id);

  const images = data.photos.map((url) => ({ original: url }));

  return (
    <div>
      <Button
        colorScheme={findBasketItem ? 'pink' : 'green'}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? 'Remove From Basket' : 'Add To Basket'}
      </Button>
      <Text as={'h2'} fontSize="2xl" fontWeight={'extrabold'}>
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format('DD/MM/YYYY')}</Text>
      <p>{data.description}</p>
      <Box margin={10}>
        <ImageGallery items={images} showThumbnails={false} />
      </Box>
    </div>
  );
}

export default ProductDetail;

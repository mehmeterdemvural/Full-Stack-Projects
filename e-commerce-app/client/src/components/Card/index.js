import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Text,
  Stack,
  Heading,
  Divider,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useBasket } from '../../contexts/BasketContext.js';

function Cards({ item }) {
  const { addToBasket, items } = useBasket();

  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <div>
      <Card maxW="sm">
        <Link to={`/product/${item._id}`}>
          <CardBody>
            <Image
              src={item.photos[0]}
              alt="{item.title}"
              borderRadius="lg"
              loading="lazy"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{item.title}</Heading>
              <Text>{item.description}</Text>
              <Text color="blue.600" fontSize="2xl">
                {item.price} TL
              </Text>
            </Stack>
          </CardBody>
          <Divider />
        </Link>

        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="pink">
              Buy now
            </Button>
            <Button
              variant="solid"
              colorScheme={findBasketItem ? 'pink' : 'green'}
              onClick={() => addToBasket(item, findBasketItem)}
            >
              {findBasketItem ? 'Remove From Basket' : 'Add To Basket'}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Cards;

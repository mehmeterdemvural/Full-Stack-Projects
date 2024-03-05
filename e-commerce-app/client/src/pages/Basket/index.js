import React from 'react';
import {
  Alert,
  Image,
  Button,
  Box,
  Grid,
  Text,
  GridItem,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Tfoot,
  TableContainer,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useBasket } from '../../contexts/BasketContext';

function Basket() {
  const { items, removeFromBasket } = useBasket();
  const totalPrice = items.reduce((acc, obj) => acc + obj.price, 0);

  return (
    <div>
      {items.length < 1 ? (
        <Alert status="warning">You have not any items in your basket</Alert>
      ) : (
        <>
          <Grid
            m={5}
            templateColumns="repeat(5, 1fr)"
            gap={2}
            templateAreas={'header header'}
          >
            <GridItem colSpan={4}>
              <Grid templateColumns="repeat(4, 1fr)" gap={2}>
                {items.map((item) => (
                  <Box key={item._id} p={4} color="white">
                    <Text
                      fontWeight={'bold'}
                      pl="2"
                      area={'header'}
                      color="black"
                    >
                      {item.title} - {item.price}
                    </Text>
                    <Link to={`/product/${item._id}`}>
                      <br />
                      <Image
                        htmlWidth="100%"
                        src={item.photos[0]}
                        alt={item.title}
                        defaultValue={item.title}
                      />
                    </Link>
                    <Button
                      mt={2}
                      size={'sm'}
                      colorScheme={'pink'}
                      onClick={() => removeFromBasket(item._id)}
                    >
                      Remove From The Basket
                    </Button>
                  </Box>
                ))}
              </Grid>
            </GridItem>
            <GridItem colSpan={1}>
              <TableContainer mr={5}>
                <Text fontWeight={'bold'}>Basket</Text>
                <Table variant="striped" colorScheme="pink">
                  <Thead>
                    <Tr>
                      <Th>#</Th>
                      <Th>Products</Th>
                      <Th isNumeric>Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {items.map((item, i) => (
                      <Tr>
                        <Td>{i + 1}</Td>
                        <Td>{item.title}</Td>
                        <Td isNumeric> {item.price}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>To convert</Th>
                      <Th>into</Th>
                      <Th isNumeric>{totalPrice} TL</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </GridItem>
          </Grid>
        </>
      )}
    </div>
  );
}

export default Basket;

import {GET_PRODUCT_QUERY} from "../components/example/ProductItem/ProductItem";

export const mocks = [
  {
    request: {
      query: GET_PRODUCT_QUERY,
      variables: {
        name: 'Buck',
      },
    },
    result: {
      data: {
        product: {id: '1', name: 'Buck', breed: 'bulldog'},
      },
    },
  },
];

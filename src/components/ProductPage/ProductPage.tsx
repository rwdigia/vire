import React from 'react';
import {
  ProductsDocument,
  ProductsQuery,
  ProductsQueryVariables,
} from '../../generated/types';
import { useQuery } from 'urql';
import styles from './ProductPage.module.css';

type Props = {
  type: string;
  urlKey: string;
};

export default function ProductPage(props: Props) {
  const { urlKey } = props;
  const [{ data, fetching }] = useQuery<ProductsQuery, ProductsQueryVariables>({
    query: ProductsDocument,
    variables: {
      filters: { url_key: { eq: urlKey } },
    },
  });

  if (fetching || !data) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{JSON.stringify(data)}</div>
    </div>
  );
}

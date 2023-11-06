import React from 'react';
import {
  ProductsDocument,
  ProductsQuery,
  ProductsQueryVariables,
} from '../../generated/types';
import { useQuery } from 'urql';
import Image from 'next/image';
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
      <div className={styles.container}>
        {data.products?.items && data.products?.items.length > 0
          ? data.products?.items.map(
              (item, index) =>
                item && (
                  <div key={'product-index-' + index} className={styles.product}>
                    <div className={styles.images}>
                      {item?.media_gallery && item?.media_gallery.length > 0
                        ? item?.media_gallery.map(
                            (galleryItem, galleryItemIndex) =>
                              galleryItem && (
                                <Image
                                  key={'gallery-index-' + galleryItemIndex}
                                  src={galleryItem.url ?? ''}
                                  alt={galleryItem.label ?? 'Product image'}
                                  width={320}
                                  height={397}
                                  priority={index === 0}
                                />
                              ),
                          )
                        : null}
                    </div>
                    <div
                      className={styles.description}
                      dangerouslySetInnerHTML={{
                        __html: item?.description?.html ?? '',
                      }}
                    />
                  </div>
                ),
            )
          : null}
      </div>
    </div>
  );
}

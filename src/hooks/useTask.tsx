import {useEffect, useRef, useState} from 'react';
import {item} from '../types/contextTypes';

export const useTask = (item: item, total: number) => {
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(
    `${item.price === 0 ? '0' : item.price?.toFixed(2)}`,
  );

  const lastItem = useRef<any>(null);

  useEffect(() => {
    if (item.index === total) {
      lastItem.current!.focus();
    }
  }, [total]);

  const handlePrice = (value: string) => {
    if (value === '') {
      setPrice('0');
      return;
    }

    if (value.split('.').length > 2) return;

    if (value.startsWith('0') && value.charAt(1) !== '.') {
      value = value.slice(1);
    }

    if (value.includes('.')) {
      const [, decimal] = value.split('.');

      if (decimal.length > 2) return;
    }

    setPrice(value);
  };

  return {
    title,
    setTitle,
    lastItem,
    price,
    handlePrice,
  };
};

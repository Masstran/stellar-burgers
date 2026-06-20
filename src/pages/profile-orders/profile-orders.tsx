import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getProfileOrders,
  getProfileFeed
} from '../../services/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileFeed());
  }, []);
  const orders: TOrder[] = useSelector(getProfileOrders);

  return <ProfileOrdersUI orders={orders} />;
};

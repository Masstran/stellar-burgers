import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getConstructorItems
} from '../../services/constructorSlice';
import {
  clearOrderModalData,
  getIsOrderRequest,
  getOrderModalData,
  putOrderThunk
} from '../../services/orderSlice';
import { getUser } from '../../services/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getIsOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const dispatch = useDispatch();

  const user = useSelector(getUser);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!user) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const ids: string[] = Array.of(
      constructorItems.bun,
      ...constructorItems.ingredients,
      constructorItems.bun
    ).map((i) => i._id);
    dispatch(putOrderThunk(ids)).then(() => dispatch(clearConstructor()));
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

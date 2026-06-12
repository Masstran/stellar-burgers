import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredientsError,
  getIngredients,
  getIngredientsThunk,
  getIngredientsIsLoading
} from '../../slicers/ingredientsSlice';
import { useEffect } from 'react';
import {
  ACCESS_TOKEN,
  authChecked,
  checkUserAuthThunk
} from '../../slicers/userSlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredientsThunk());
    if (getCookie(ACCESS_TOKEN)) {
      dispatch(checkUserAuthThunk());
    } else {
      dispatch(authChecked());
    }
  }, []);

  const navigate = useNavigate();
  const onModalClose = () => {
    navigate(-1);
  };

  const location = useLocation();
  const background = location.state?.background;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={onModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={onModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='' onClose={onModalClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

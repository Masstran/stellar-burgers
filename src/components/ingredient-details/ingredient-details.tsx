import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../slicers/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const id = useParams().id;
  const ingredients = useSelector(getIngredients);
  const ingredientData = ingredients.find((i) => i._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

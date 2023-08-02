import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import matrixReducer from '../reducers/matrix';
import progressColumn from '../middleware/progressColumn';

export const store = configureStore({
  reducer: {
    matrix: matrixReducer,
  },
  middleware: [progressColumn]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

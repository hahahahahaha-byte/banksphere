import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import customerReducer from './features/customers/customerSlice';
import employeeReducer from './features/employees/employeeSlice';
import transactionReducer from './features/transactions/transactionSlice';
import loanReducer from './features/loans/loanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer,
    employees: employeeReducer,
    transactions: transactionReducer,
    loans: loanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
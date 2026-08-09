import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionService from '../../services/transactionService';

// Fetch all transactions
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await transactionService.getAllTransactions();
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch transactions by customer
export const fetchTransactionsByCustomer = createAsyncThunk(
  'transactions/fetchTransactionsByCustomer',
  async (customerId, { rejectWithValue }) => {
    try {
      const transactions = await transactionService.getTransactionsByCustomer(customerId);
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new transaction
export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const transaction = await transactionService.createTransaction(transactionData);
      return transaction;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update transaction status
export const updateTransactionStatus = createAsyncThunk(
  'transactions/updateTransactionStatus',
  async ({ id, status, processedBy }, { rejectWithValue }) => {
    try {
      await transactionService.updateTransactionStatus(id, status, processedBy);
      return { id, status, processedBy };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch pending transactions
export const fetchPendingTransactions = createAsyncThunk(
  'transactions/fetchPendingTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await transactionService.getPendingTransactions();
      return transactions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    pendingTransactions: [],
    customerTransactions: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
        state.pendingTransactions = action.payload.filter(t => t.status === 'pending');
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch transactions by customer
      .addCase(fetchTransactionsByCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactionsByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customerTransactions = action.payload;
      })
      .addCase(fetchTransactionsByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions.unshift(action.payload);
        if (action.payload.status === 'pending') {
          state.pendingTransactions.unshift(action.payload);
        }
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update transaction status
      .addCase(updateTransactionStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status } = action.payload;
        const index = state.transactions.findIndex(t => t.id === id);
        if (index !== -1) {
          state.transactions[index].status = status;
        }
        state.pendingTransactions = state.pendingTransactions.filter(t => t.id !== id);
      })
      .addCase(updateTransactionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch pending transactions
      .addCase(fetchPendingTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingTransactions = action.payload;
      })
      .addCase(fetchPendingTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = transactionSlice.actions;
export default transactionSlice.reducer;
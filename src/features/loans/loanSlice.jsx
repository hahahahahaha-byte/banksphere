import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loanService from '../../services/loanService';

// Fetch all loans
export const fetchLoans = createAsyncThunk(
  'loans/fetchLoans',
  async (_, { rejectWithValue }) => {
    try {
      const loans = await loanService.getAllLoans();
      return loans;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch loans by customer
export const fetchLoansByCustomer = createAsyncThunk(
  'loans/fetchLoansByCustomer',
  async (customerId, { rejectWithValue }) => {
    try {
      const loans = await loanService.getLoansByCustomer(customerId);
      return loans;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create loan request
export const createLoan = createAsyncThunk(
  'loans/createLoan',
  async (loanData, { rejectWithValue }) => {
    try {
      const loan = await loanService.createLoan(loanData);
      return loan;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Approve loan
export const approveLoan = createAsyncThunk(
  'loans/approveLoan',
  async ({ id, approvedBy, approvedById }, { rejectWithValue }) => {
    try {
      await loanService.approveLoan(id, approvedBy, approvedById);
      return { id, approvedBy, approvedById };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Reject loan
export const rejectLoan = createAsyncThunk(
  'loans/rejectLoan',
  async ({ id, reason }, { rejectWithValue }) => {
    try {
      await loanService.rejectLoan(id, reason);
      return { id, reason };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch pending loans
export const fetchPendingLoans = createAsyncThunk(
  'loans/fetchPendingLoans',
  async (_, { rejectWithValue }) => {
    try {
      const loans = await loanService.getPendingLoans();
      return loans;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const loanSlice = createSlice({
  name: 'loans',
  initialState: {
    loans: [],
    pendingLoans: [],
    customerLoans: [],
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
      // Fetch all loans
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.loans = action.payload;
        state.pendingLoans = action.payload.filter(l => l.status === 'pending');
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch loans by customer
      .addCase(fetchLoansByCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoansByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customerLoans = action.payload;
      })
      .addCase(fetchLoansByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create loan
      .addCase(createLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loans.unshift(action.payload);
        state.pendingLoans.unshift(action.payload);
      })
      .addCase(createLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Approve loan
      .addCase(approveLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveLoan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.loans.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.loans[index].status = 'approved';
          state.loans[index].approvedBy = action.payload.approvedBy;
        }
        state.pendingLoans = state.pendingLoans.filter(l => l.id !== action.payload.id);
      })
      .addCase(approveLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reject loan
      .addCase(rejectLoan.pending, (state) => {
        state.loading = true;
      })
      .addCase(rejectLoan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.loans.findIndex(l => l.id === action.payload.id);
        if (index !== -1) {
          state.loans[index].status = 'rejected';
          state.loans[index].rejectionReason = action.payload.reason;
        }
        state.pendingLoans = state.pendingLoans.filter(l => l.id !== action.payload.id);
      })
      .addCase(rejectLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch pending loans
      .addCase(fetchPendingLoans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingLoans = action.payload;
      })
      .addCase(fetchPendingLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = loanSlice.actions;
export default loanSlice.reducer;
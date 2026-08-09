import { db } from '../firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  query, 
  where,
  orderBy
} from 'firebase/firestore';

class LoanService {
  // Get all loans
  async getAllLoans() {
    try {
      const q = query(collection(db, 'loans'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const loans = [];
      querySnapshot.forEach((doc) => {
        loans.push({ id: doc.id, ...doc.data() });
      });
      return loans;
    } catch (error) {
      throw error;
    }
  }

  // Get loans by customer ID
  async getLoansByCustomer(customerId) {
    try {
      const q = query(
        collection(db, 'loans'), 
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const loans = [];
      querySnapshot.forEach((doc) => {
        loans.push({ id: doc.id, ...doc.data() });
      });
      return loans;
    } catch (error) {
      throw error;
    }
  }

  // Get loan by ID
  async getLoanById(loanId) {
    try {
      const docRef = doc(db, 'loans', loanId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      throw new Error('Loan not found');
    } catch (error) {
      throw error;
    }
  }

  // Create new loan request
  async createLoan(loanData) {
    try {
      const docRef = await addDoc(collection(db, 'loans'), {
        ...loanData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...loanData };
    } catch (error) {
      throw error;
    }
  }

  // Approve loan
  async approveLoan(loanId, approvedBy, approvedById) {
    try {
      const docRef = doc(db, 'loans', loanId);
      await updateDoc(docRef, {
        status: 'approved',
        approvedBy,
        approvedById,
        approvedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Reject loan
  async rejectLoan(loanId, rejectionReason) {
    try {
      const docRef = doc(db, 'loans', loanId);
      await updateDoc(docRef, {
        status: 'rejected',
        rejectionReason,
        rejectedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get pending loans
  async getPendingLoans() {
    try {
      const q = query(
        collection(db, 'loans'), 
        where('status', '==', 'pending'),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const loans = [];
      querySnapshot.forEach((doc) => {
        loans.push({ id: doc.id, ...doc.data() });
      });
      return loans;
    } catch (error) {
      throw error;
    }
  }

  // Get loans by status
  async getLoansByStatus(status) {
    try {
      const q = query(
        collection(db, 'loans'), 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const loans = [];
      querySnapshot.forEach((doc) => {
        loans.push({ id: doc.id, ...doc.data() });
      });
      return loans;
    } catch (error) {
      throw error;
    }
  }
}

export default new LoanService();
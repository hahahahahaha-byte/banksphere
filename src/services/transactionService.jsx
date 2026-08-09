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

class TransactionService {
  // Get all transactions
  async getAllTransactions() {
    try {
      const q = query(collection(db, 'transactions'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  // Get transactions by customer ID
  async getTransactionsByCustomer(customerId) {
    try {
      const q = query(
        collection(db, 'transactions'), 
        where('customerId', '==', customerId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  // Get transaction by ID
  async getTransactionById(transactionId) {
    try {
      const docRef = doc(db, 'transactions', transactionId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      throw new Error('Transaction not found');
    } catch (error) {
      throw error;
    }
  }

  // Create new transaction
  async createTransaction(transactionData) {
    try {
      const docRef = await addDoc(collection(db, 'transactions'), {
        ...transactionData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...transactionData };
    } catch (error) {
      throw error;
    }
  }

  // Update transaction status
  async updateTransactionStatus(transactionId, status, processedBy) {
    try {
      const docRef = doc(db, 'transactions', transactionId);
      await updateDoc(docRef, {
        status,
        processedBy,
        processedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get pending transactions
  async getPendingTransactions() {
    try {
      const q = query(
        collection(db, 'transactions'), 
        where('status', '==', 'pending'),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  // Get transactions by type
  async getTransactionsByType(type) {
    try {
      const q = query(
        collection(db, 'transactions'), 
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }
}

export default new TransactionService();
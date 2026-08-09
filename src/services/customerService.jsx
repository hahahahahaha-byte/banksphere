import { db } from '../firebase/config';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';

class CustomerService {
  // Get all customers
  async getAllCustomers() {
    try {
      const querySnapshot = await getDocs(collection(db, 'customers'));
      const customers = [];
      querySnapshot.forEach((doc) => {
        customers.push({ id: doc.id, ...doc.data() });
      });
      return customers;
    } catch (error) {
      throw error;
    }
  }

  // Get customer by ID
  async getCustomerById(customerId) {
    try {
      const docRef = doc(db, 'customers', customerId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      throw new Error('Customer not found');
    } catch (error) {
      throw error;
    }
  }

  // Create new customer
  async createCustomer(customerData) {
    try {
      const docRef = await addDoc(collection(db, 'customers'), {
        ...customerData,
        balance: customerData.initialBalance || 0,
        status: 'active',
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...customerData };
    } catch (error) {
      throw error;
    }
  }

  // Update customer
  async updateCustomer(customerId, updateData) {
    try {
      const docRef = doc(db, 'customers', customerId);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });
      return { id: customerId, ...updateData };
    } catch (error) {
      throw error;
    }
  }

  // Update customer balance
  async updateBalance(customerId, newBalance) {
    try {
      const docRef = doc(db, 'customers', customerId);
      await updateDoc(docRef, {
        balance: newBalance,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Delete customer
  async deleteCustomer(customerId) {
    try {
      await deleteDoc(doc(db, 'customers', customerId));
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get customer by email
  async getCustomerByEmail(email) {
    try {
      const q = query(collection(db, 'customers'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Get customer by userId (Firebase Auth UID)
  async getCustomerByUserId(userId) {
    try {
      const q = query(collection(db, 'customers'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default new CustomerService();
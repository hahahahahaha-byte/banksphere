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

class EmployeeService {
  // Get all employees
  async getAllEmployees() {
    try {
      const querySnapshot = await getDocs(collection(db, 'employees'));
      const employees = [];
      querySnapshot.forEach((doc) => {
        employees.push({ id: doc.id, ...doc.data() });
      });
      return employees;
    } catch (error) {
      throw error;
    }
  }

  // Get employee by ID
  async getEmployeeById(employeeId) {
    try {
      const docRef = doc(db, 'employees', employeeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      throw new Error('Employee not found');
    } catch (error) {
      throw error;
    }
  }

  // Create new employee
  async createEmployee(employeeData) {
    try {
      const docRef = await addDoc(collection(db, 'employees'), {
        ...employeeData,
        status: 'active',
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...employeeData };
    } catch (error) {
      throw error;
    }
  }

  // Update employee
  async updateEmployee(employeeId, updateData) {
    try {
      const docRef = doc(db, 'employees', employeeId);
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });
      return { id: employeeId, ...updateData };
    } catch (error) {
      throw error;
    }
  }

  // Delete employee
  async deleteEmployee(employeeId) {
    try {
      await deleteDoc(doc(db, 'employees', employeeId));
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Get employee by email
  async getEmployeeByEmail(email) {
    try {
      const q = query(collection(db, 'employees'), where('email', '==', email));
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

export default new EmployeeService();
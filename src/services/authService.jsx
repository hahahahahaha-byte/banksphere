import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

class AuthService {
  // Login user
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...userData
        };
      }
      throw new Error('User profile not found');
    } catch (error) {
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      throw error;
    }
  }

  // Create user with role
  async createUser(email, password, role, additionalData = {}) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        role,
        ...additionalData,
        createdAt: new Date().toISOString()
      });
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Get current user profile
  async getCurrentUser(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return { uid, ...userDoc.data() };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default new AuthService();
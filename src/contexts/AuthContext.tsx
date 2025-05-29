
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { initializeApp, deleteApp } from 'firebase/app';

export interface UserData {
  uid: string;
  email: string;
  tipo: 'admin' | 'cliente';
  name?: string;
  createdAt: Date;
  selectedClient?: string;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createUser: (email: string, password: string, tipo: 'admin' | 'cliente', name?: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  const createUser = async (email: string, password: string, tipo: 'admin' | 'cliente', name?: string) => {
    // Create a separate Firebase Auth instance to avoid logging out the current user
    const firebaseConfig = {
      apiKey: "AIzaSyC2U6gnrapNB4Trhrzxs6Y3L5dlPz5KP9M",
      authDomain: "create-site-original.firebaseapp.com",
      projectId: "create-site-original",
      storageBucket: "create-site-original.firebasestorage.app",
      messagingSenderId: "324185614412",
      appId: "1:324185614412:web:ba3f60c0ee85ba58226ce9",
      measurementId: "G-4YNKQ1JEKN"
    };
    
    const secondaryApp = initializeApp(firebaseConfig, 'secondary');
    const secondaryAuth = getAuth(secondaryApp);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
      const user = userCredential.user;
      
      const newUserData: UserData = {
        uid: user.uid,
        email: user.email!,
        tipo,
        name,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), newUserData);
      
      // Sign out from the secondary auth instance
      await signOut(secondaryAuth);
      
      // Delete the secondary app instance
      await deleteApp(secondaryApp);
      
    } catch (error) {
      // Clean up the secondary app even if there's an error
      try {
        await signOut(secondaryAuth);
        await deleteApp(secondaryApp);
      } catch (cleanupError) {
        console.error('Error cleaning up secondary app:', cleanupError);
      }
      throw error;
    }
  };

  const fetchUserData = async (user: User) => {
    try {
      console.log('Fetching user data for UID:', user.uid);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as UserData;
        console.log('User data loaded:', data);
        setUserData(data);
      } else {
        console.log('No user document found for UID:', user.uid);
        // Se não existe dados do usuário, pode ser o admin principal
        if (user.email === 'originaldigitaloficial@gmail.com' || user.uid === 'SgzR2AWU67NF1M7iHerNhrsgWbK2') {
          const adminData: UserData = {
            uid: user.uid,
            email: user.email!,
            tipo: 'admin',
            name: 'Administrador Principal',
            createdAt: new Date()
          };
          await setDoc(doc(db, 'users', user.uid), adminData);
          setUserData(adminData);
          console.log('Admin data created:', adminData);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Auth state changed. User:', user?.uid || 'null');
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    login,
    logout,
    createUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

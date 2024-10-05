import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useCallback } from "react";
const firebaseConfig = {
  apiKey: "AIzaSyAfAXybvA6UudURsN05uUdKJODKJ-bmsEk",
  authDomain: "crownshop-d0a80.firebaseapp.com",
  projectId: "crownshop-d0a80",
  storageBucket: "crownshop-d0a80.appspot.com",
  messagingSenderId: "48748251738",
  appId: "1:48748251738:web:a7d308f3eacd1eadc8e663",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth || !userAuth.uid) {
    console.error('Invalid userAuth object');
    return null;
  }

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log('userDocRef:', userDocRef);

  try {
    const userDocSnap = await getDoc(userDocRef);
    console.log('userDocSnap:', userDocSnap);
    console.log('userDocSnap exists:', userDocSnap.exists());

    if (!userDocSnap.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
        console.log('User document created successfully');
      } catch (error) {
        console.error("Error creating user document:", error.message);
      }
    }
    return userDocRef;
  } catch (error) {
    console.error("Error checking or creating user document:", error);
    return null;
  }
};

export const auth = getAuth();
export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return null;
  }
};

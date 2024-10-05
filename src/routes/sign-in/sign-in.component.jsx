import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const user = await signInWithGooglePopup();
      if (user) {
        console.log("Google Sign-In successful. User:", user);
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log("User document reference:", userDocRef);
      } else {
        console.error("Failed to get user from Google sign-in");
      }
    } catch (error) {
      console.error("Error in logGoogleUser:", error);
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;

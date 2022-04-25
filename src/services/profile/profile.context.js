import React, { useEffect, createContext, useState } from "react";
import { auth } from "../../../firebase";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (email, password) => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCreds) => setProfile(userCreds))
      .catch((err) => setError(err));

    setIsLoading(false);
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error, handleLogin }}>
      {children}
    </ProfileContext.Provider>
  );
};

// ///////////////////////////------------MMMMSKDFMKASMDFIANSDFIJNASJDFNASIDFNASIDJFNJIANSDFJNIASDNFIN
// useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         navigation.navigate("Friends");
//       }
//     });
//     return unsubscribe;
//   }, []);

// //   const Login = async () => {
// //     dispatch(setLoading(true));

// //     // let data = {
// //     //   username,
// //     //   password,
// //     // };
// //     // await axios("https://mutazbackend.herokuapp.com/login", data)
// //     //   .then(await dispatch(fetchUser(username)))
// //     //   .then(await dispatch(getFriendRequest(username)))
// //     //   .then(await dispatch(setLoggedIn(true)))
// //     //   .catch((err) => console.log(err));

// //     auth
// //       .signInWithEmailAndPassword(username, password)
// //       .then((userCreds) => {
// //         const user = userCreds.user;
// //       })
// //       .then(await dispatch(fetchUser(auth?.currentUser?.email)))
// //       .then(await dispatch(getFriendRequest(auth?.currentUser?.email)))
// //       .catch((err) => alert(err.message));

// //     dispatch(setLoading(false));
// //   };

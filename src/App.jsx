import React, { useContext, useEffect } from "react";
import Routing from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser)
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  },[]);

  return (
    <>
      <Routing />
    </>
  );
}

export default App;


// import React, { useContext, useEffect } from "react";
// import Routing from "./Router";
// import { DataContext } from "./Components/DataProvider/DataProvider";
// import { Type } from "./Utility/action.type";
// import { auth } from "./Utility/firebase";

// function App() {
//   const [{ user }, dispatch] = useContext(DataContext);

//   useEffect(() => {
//     // Set up an authentication state observer
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         console.log("User logged in:", authUser);
//         dispatch({
//           type: Type.SET_USER,
//           user: authUser,
//         });
//       } else {
//         console.log("No user logged in.");
//         dispatch({
//           type: Type.SET_USER,
//           user: null,
//         });
//       }
//     });

//     // Clean up subscription on unmount
//     return () => unsubscribe();
//   }, [dispatch]);

//   return (
//     <>
//       <Routing />
//     </>
//   );
// }

// export default App;

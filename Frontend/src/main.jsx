// import React, { createContext, useState } from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";

// export const Context = createContext({
//   isAuthorized:false
// })


// const AppWrapper = () => {
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [user, setUser] = useState({role:"Employer"});

//   return (
//     <Context.Provider value={{isAuthorized, setIsAuthorized, user, setUser }}>
//       <App />
//     </Context.Provider>
//   );
// };

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <AppWrapper />
// //   </React.StrictMode>
// // );


// const rootElement = document.getElementById("root");
// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <AppWrapper />
//   </React.StrictMode>
// );




import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthorized: false,
  user: {}, 
  setIsAuthorized: () => {},
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({ })

  return (
    <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};


const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

import "./App.css";
import React from "react";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
// For Routing ===> use Router, Switch, Route
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    // BEN naming convention
    <div className="app">
      {/* user x ==> call Login Component  */}
      {/* user o ==>  get all of app_body */}
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          {/* Wrapped by Router Component */}
          <Router>
            {/* If wanna maintain always ==> put Component out of <Switch> Component */}
            <Sidebar />
            {/* Inside <Switch> ===> rendering page is different according to path */}
            <Switch>
              {/* /rooms/:roomId ==> */}
              {/* If roomId different */}
              {/* path also different but Path /rooms/ is fixed*/}
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;

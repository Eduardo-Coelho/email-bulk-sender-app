import * as React from "react";
import * as ReactDOM from "react-dom";
import DashBord from "./components/dashbord/dashbord";
import UserContext from "./store/context";

function App() {
  return (
    <>
      <UserContext>
        <DashBord />
      </UserContext>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));

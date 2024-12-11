import { useState, useEffect } from "react";
import facade from "../../util/apiFacade";
function LoggedIn({ LoggedIn }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    /*TODO*/
    facade.fetchData().then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      
        <div>
          <h2>Data Received from server</h2>
          <h3>{dataFromServer}</h3>
        </div>
  
    </div>
  );
}

export default LoggedIn;

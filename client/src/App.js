import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
 
import "./App.css";

function App() {
  const [link, setLink] = useState("");

  useEffect(async () => {
    const fetch = await axios.get("/datauser");

    let data = JSON.parse(localStorage.getItem("auth"));

    if (!data) {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          status: false,
        })
      );
    } else {
      if (fetch.data.status == true && fetch.data.email !== "") {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            status: true,
            email: fetch.data.email,
          })
        );
      } else {
      }
    }
  }, []);

  const [email, setEmail] = useState("");

  const sendEmailConfirmation = async (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("auth"));

    if (data.status == false) {
      let data = {
        email,
      };

      axios.post("/confirmuser", data).then((res) => setLink(res.data.link));
    } else if (data.status == true && data.email == email) {
      alert("Ya has confirmado el usuario anteriormente");
    } else if (
      (data.status == true) | (data.status == true) &&
      data.email !== email
    ) {
      let data = {
        email,
      };

      axios.post("/confirmuser", data).then((res) => setLink(res.data.link));
    }
  };

 
  return (
    <div className="App">
      <form action="">
        <label htmlFor="">Introduzca email</label>
        <br />
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <button onClick={(e) => sendEmailConfirmation(e)}>Enviar</button>
      </form>

      {link ? (
        <p>
          <a href={link}>Link de confirmación</a>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

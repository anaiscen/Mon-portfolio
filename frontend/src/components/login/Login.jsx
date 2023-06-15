import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useApi from "../../services/useApi";
import { useUser } from "../../context/UserContext";
import "./Login.css";

function Login({ handleLogin }) {
  const api = useApi();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const refLogin = useRef();
  const refPass = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const login = refLogin.current.value;
    const pass = refPass.current.value;
    const user = {
      login,
      password: pass,
    };

    api
      .post("/login", user)
      .then((resp) => {
        console.warn(resp);
        const { token } = resp.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setUser(resp.data.user);
        handleLogin();
        navigate(`/admin/`);
      })
      .catch((err) => {
        console.warn(err);
        let errorMsg = "";
        switch (err?.response?.status) {
          case 401:
            errorMsg = "Vous n'êtes pas autorisé à vous connecter";
            break;
          case 404:
            errorMsg = "Utilisateur inexistant";
            break;
          case 422:
            errorMsg = "Erreur dans les données fournies";
            break;
          default:
            errorMsg = "Erreur serveur";
        }
        // eslint-disable-next-line no-alert
        alert(errorMsg);
      });
  };

  return (
    <div>
      <div className="loginFormContainer">
        <p className="loginTitle">Connexion</p>
        <form onSubmit={handleSubmit} className="loginForm">
          <label htmlFor="login" className="loginLabel">
            Email :
            <input type="text" className="inputLoginForm" ref={refLogin} />
          </label>
          <label htmlFor="password" className="loginLabel">
            Mot de passe :
            <input type="password" className="inputLoginForm" ref={refPass} />
          </label>
          <div />
          <button type="submit">Connexion</button>
        </form>
      </div>
    </div>
  );
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default Login;

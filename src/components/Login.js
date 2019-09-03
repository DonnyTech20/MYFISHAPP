
import React from "react";
import PropTypes from "prop-types";

 const Login = (authenticate) => (
     <nav className = "login">
         <h2>Inventory Login</h2>
         <p>Sign in to manage your store's inventory!!</p>
         
         <button 
          onClick={() => authenticate("Github")}
          className="github"
         >
             Log In with GitHub
         </button>
     </nav>
 );

 Login.propTypes = {
     authenticate: PropTypes.object.isRequired
 };

 export default Login;
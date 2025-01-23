import React, { useState } from "react";

const AccountLogin = () => {

  return (
    <>
      <body className="bg-desktop-bg">
        <div className="loginContainer text-center border-solid border-1 bg-brand-beige text-black rounded-2xl font-dmSans italic mx-7 my-12 shadow-md">
          <h1 className="text-gray-headline text-2xl p-6">Seja bem-vindo(a)!</h1>

            <form action="action_page.php" method="post">
                <input type="text" placeholder="Insira seu email" name="email" id="email" className="bg-mobile-bg my-2 p-1 border-2 border-solid rounded shadow-md px-14 text-center" required/>
                <br/>
                <input type="password" placeholder="Insira sua senha" name="psw" className="bg-mobile-bg my-2 p-1 border-2 border-solid rounded shadow-md px-14 text-center" required/>
                <br/>
                <a className="text-gray-headline" href="_blank">Esqueceu sua senha?</a>
                <br />
                <button className="bg-mobile-bg border-2 border-solid rounded shadow-md px-7 m-2 text-center p-1" type="submit">Login</button>
              </form>

        </div>
      </body>
    </>
  );
};

export default AccountLogin;
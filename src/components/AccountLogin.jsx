import React, { useState } from "react";

const AccountLogin = () => {

  return (
    <>
      <body className="bg-desktop-bg h-screen flex items-center justify-center">
        <div className="loginContainer text-center border-solid border-1 bg-brand-white text-black rounded-2xl font-dmSans font-extralight shadow-2xl">

            <form className="mx-10 my-36" action="action_page.php" method="post">
                <h1 className="text-gray-headline font-thin text-3xl my-6 italic">Seja bem-vindo(a)!</h1>

                <div className="user_icon w-12 h-12 mx-auto my-5">
                  <img src="src\assets\icons\user.png" alt="user_icon" />
                </div>

                <input type="text" placeholder="Insira seu email" name="email" id="email" className="bg-mobile-bg  italic p-1 border-2 border-solid rounded-xl shadow-md px-14 text-center" required/>
                <br/>
                <input type="password" placeholder="Insira sua senha" name="psw" className="bg-mobile-bg italic my-6 p-1 border-2 border-solid rounded-xl shadow-md px-14 text-center" required/>
                <br/>
                <a className="text-gray-headline" href="_blank">Esqueceu sua senha?</a>
                <br />
                <button className="bg-mobile-bg border-2 border-solid rounded-xl shadow-md px-8 my-6 text-center py-1" type="submit">Login</button>
                
              </form>

        </div>
      </body>
    </>
  );
};

export default AccountLogin;
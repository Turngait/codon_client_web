import React, { useState } from "react";
import Button from "../../../components/Button";
import Textinput from "../../../components/TextInput";

import { signInService } from '../services';

const ControlBox: React.FC<{}> = () => {
  const [ email, setEmail ] = useState("");
  const [ pass, setPass ] = useState("");

  const signInHandler = async (): Promise<void> => {
    const ans = await signInService(email, pass);
    console.log(ans);
  }
  return (
    <div className='main__controlBox'>
      <header className='main__controlBox__headerBox'><p>Terms of condition</p><p>Contacts</p></header>
      <div className='main__controlBox__form'>
        <h2 className='main__controlBox__form__title'>SignIn</h2>
        <Textinput placeholder="E-mail..." value={email} onChange={(event) => setEmail(event.target.value)} />
        <Textinput placeholder="Password..." value={pass} onChange={(event) => setPass(event.target.value)} />
        <Button title="Go!" onClick={signInHandler} />
        <p>Do not have an account?</p>
        <p className="main__controlBox__form__signUpBtn">SignUp!</p>
      </div>
      <footer className="main__controlBox__footer">2025</footer>
    </div>
  )
}

export default ControlBox;
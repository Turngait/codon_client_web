import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { editEmail, updateToken } from '../../../store/userSlice';
import Button from "../../../components/Button";
import Textinput from "../../../components/TextInput";

import { signInService, signUpService } from '../services';

const ControlBox: React.FC<{}> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState("");
  const [ pass, setPass ] = useState("");
  const [ gender, setGender ] = useState("");
  const [ age, setAge ] = useState<number>();
  const [ weight, setWeight ] = useState<number>();
  const [ height, setHeight ] = useState<number>();
  const [ isSignUp, setIsSignUp ] = useState(false);
  const [ err, setErr ] = useState<string | null>(null);

  const signInHandler = async (): Promise<void> => {
    const ans = await signInService(email, pass);
    if (ans.token) {
      dispatch(updateToken(ans.token));
      dispatch(editEmail(email));
      localStorage.setItem("token", ans.token);

      navigate('/dashboard');
    } else {
      setErr(ans.msg ? ans.msg : "Something goes wrong. Try later");
    }
  }

  const sinUpHandler = async (): Promise<void> => {
    const ans = await signUpService(email, pass, gender, age, weight, height);
    if (ans.token) {
      dispatch(updateToken(ans.token));
      dispatch(editEmail(email));
      localStorage.setItem("token", ans.token);

      navigate('/dashboard');
    } else {
      setErr(ans.msg ? ans.msg : "Something goes wrong. Try later");
    }
  }
  return (
    <div className='main__controlBox'>
      <title>Codon</title>
      <header className='main__controlBox__headerBox'><p>Terms of condition</p><p>Contacts</p></header>
      <div className='main__controlBox__form'>
        {
          isSignUp ? 
          <>
            <h2 className='main__controlBox__form__title'>SignUp</h2>
            {
              err ? <p className='main__controlBox__form__err'>{err}</p> : null
            }
            <Textinput placeholder="E-mail..." value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
            <Textinput placeholder="Password..." value={pass} onChange={(event) => setPass(event.target.value)} type="password" />
            <Textinput placeholder="Gender..." value={gender} onChange={(event) => setGender(event.target.value)} type="text" />
            <Textinput placeholder="Age..." value={age} onChange={(event) => setAge(+event.target.value)} type="number" />
            <Textinput placeholder="Weight..." value={weight} onChange={(event) => setWeight(+event.target.value)} type="number" />
            <Textinput placeholder="Heigh..." value={height} onChange={(event) => setHeight(+event.target.value)} type="number" />
            <Button title="SignUp!" onClick={sinUpHandler} />
            <p>Have an account?</p>
            <p className="main__controlBox__form__signUpBtn" onClick={() => setIsSignUp(false)}>SignIn!</p>
          </>
          :
          <>
            <h2 className='main__controlBox__form__title'>SignIn</h2>
            {
              err ? <p className='main__controlBox__form__err'>{err}</p> : null
            }
            <Textinput placeholder="E-mail..." value={email} onChange={(event) => setEmail(event.target.value)} type="email"/>
            <Textinput placeholder="Password..." value={pass} onChange={(event) => setPass(event.target.value)} type="password"/>
            <Button title="Go!" onClick={signInHandler} />
            <p>Do not have an account?</p>
            <p className="main__controlBox__form__signUpBtn" onClick={() => setIsSignUp(true)}>SignUp!</p>
          </>
        }
        
      </div>
      <footer className="main__controlBox__footer">2025</footer>
    </div>
  )
}

export default ControlBox;
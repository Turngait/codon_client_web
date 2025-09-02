import { API_KEY, API_URL } from "../../../config/api";

export async function signUpService(email: string, pass: string, gender: string, weight: number, height: number ) {}

export async function signInService(email: string, pass: string): Promise<{token: string | null, status: number, msg?: string}> {
  const {data, status, msg} = await fetch(API_URL + '/auth/signin', {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=utf-8",
      "token": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      email,
      pass
    }),
  })
  .then(res => {
    console.log(res)
    if(res.status === 201 || res.status === 200) {
      return res.json()
    } else {
      return {data: {token: null}, status: res.status, msg: res.statusText};
    }
  });
  return {token: data.token , status: status, msg: msg};
}
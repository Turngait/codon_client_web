import { API_KEY, API_URL } from "../../../config/api";

export async function signUpService(email: string, pass: string, sex: string, age: number = 0, weight: number = 0, height: number = 0 ) {
    const res = await fetch(API_URL + '/auth/signup', {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=utf-8",
      "token": API_KEY,
    },
    mode: "cors",
    body: JSON.stringify({
      email,
      pass,
      data: {
        sex,
        weight,
        height,
        age
      },
      settings: {
        lang: "en",
        theme: "light"
    }
    }),
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data)
    if (data && data.status) {
      return data;
    }
    else {
      return {data: {token: null}, status: data, msg: null}
    }
  });

  return {token: res.data.token , status: res.status, msg: res.msg};
}

export async function signInService(email: string, pass: string): Promise<{token: string | null, status: number, msg?: string}> {
  const res = await fetch(API_URL + '/auth/signin', {
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
    return res.json()
  })
  .then(data => {
    if (data && data.status) {
      return data;
    }
    else {
      return {data: {token: null}, status: data, msg: null}
    }
  });

  return {token: res.data.token , status: res.status, msg: res.msg};
}
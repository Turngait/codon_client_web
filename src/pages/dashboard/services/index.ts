import { API_KEY, API_URL } from "../../../config/api";

export async function getAllDataService(token: string): Promise<{status: number, data: any, msg?: string | null}> {
      const res = await fetch(API_URL + '/user', {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
    })
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data && data.status) {
        return data;
      }
      else {
        return {data: data.data, status: data, msg: null}
      }
    });
  
    return {data: res.data , status: res.status, msg: res.msg || null};
}
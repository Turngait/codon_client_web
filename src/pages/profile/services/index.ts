import { API_KEY, API_URL } from "../../../config/api";

export async function changePasswordService(token: string, oldPass: string, newPass: string): Promise<{status: number, msg?: string | null}> {
  const res = await fetch(API_URL + '/user/change-password', {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "oldPass": oldPass,
        "newPass": newPass
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
        return {status: data, msg: null}
      }
    });
  
    return {status: res.status, msg: res.msg || null};
}
import { API_KEY, API_URL } from "../../../../config/api";

export async function addClinicService(token: string, title: string, description: string, law_info: string, main_site: string, phone: string): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics', {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "title": title,
        "description": description,
        "law_info": law_info,
        "main_site": main_site,
        "phone": phone
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
        return {data: data.data, status: data, msg: null}
      }
    });
  
    return {data: res.data || null, status: res.status, msg: res.msg || null};
}

export async function deleteClinicService(token: string, id: number): Promise<{status: number, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics', {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "id": id,
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
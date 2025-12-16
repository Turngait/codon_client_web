import { API_KEY, API_URL } from "../../../config/api";

export async function addAnalysisService(token: string, title: string, equipment: string, groupId: number, clinicId:number, description: string, doctors: string, values: any, date: string): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/analysis', {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "date": date,
        "title": title,
        "values": values,
        "group_id": groupId,
        "doctors": [doctors],
        "clinic_id": clinicId,
        "equipment": equipment,
        "description": description
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

export async function deleteAnalysisOrValue(token: string, id: string): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/analysis', {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        id
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
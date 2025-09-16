import { API_KEY, API_URL } from "../../../config/api";

export async function addAnalysisService(token: string, title: string, clinic: string, equipment: string, groupId: string, description: string, doctors: string, values: any,): Promise<{status: number, data: any, msg?: string | null}> {
  const now = new Date();
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
        "date": now.toString(),
        "title": title,
        "values": values,
        "group_id": groupId,
        "doctors": [doctors],
        "clinic": clinic,
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
  
    return {data: res.data , status: res.status, msg: res.msg || null};
}
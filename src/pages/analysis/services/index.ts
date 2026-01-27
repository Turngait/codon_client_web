import { API_KEY, API_URL } from "../../../config/api";
import { IValue } from '../../../interfaces/analysis';

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
        "doctors": doctors,
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

export async function editAnalysisService(token: string, id: number, title: string, equipment: string, groupId: number, clinicId:number, description: string, doctors: string, values: any, date: string): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/analysis', {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "id": id,
        "date": date,
        "title": title,
        "values": values,
        "group_id": groupId,
        "doctors": doctors,
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

export async function deleteAnalysisOrValue(token: string, id: number): Promise<{status: number, data: any, msg?: string | null}> {
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

export async function addAnalysisGroupService(token: string, title: string, description: string): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/analysis/group', {
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

export async function addValuesService(token: string, analysis_id: number, values: IValue[]): Promise<{status: number, data: IValue[], msg?: string | null}> {
  const res = await fetch(API_URL + '/analysis/value', {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "analysis_id": analysis_id,
        "values": values,
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

export async function deleteValuesService(token: string, value_id: number): Promise<{status: number, msg?: string | null}> {
  const res = await fetch(API_URL + '/analysis/value', {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "id": value_id,
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
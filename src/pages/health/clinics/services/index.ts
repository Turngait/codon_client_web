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

export async function updateClinicService(token: string, id: number, title: string, description: string, law_info: string, main_site: string): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics', {
      method: "PUT",
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
        "id": id
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

export async function addClinicAddressService(token: string, clinic_id: number, title: string, address: string, isMain: boolean): Promise<{status: number, data: {address_id: number} | null, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics/address', {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "clinic_id": clinic_id,
        "title": title,
        "address": address,
        "is_main": isMain,
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

export async function updateClinicAddressService(token: string, id: number | undefined, title: string, address: string, is_main: boolean, clinic_id: number): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics/address', {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "title": title,
        "address": address,
        "is_main": is_main,
        "clinic_id": clinic_id,
        "id": id
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

export async function deleteClinicAddressService(token: string, id: number): Promise<{status: number, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics/address', {
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

export async function addClinicPhoneService(token: string, clinic_id: number, title: string, phone_number: string, isMain: boolean): Promise<{status: number, data: {phone_id: number} | null, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics/phone', {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "clinic_id": clinic_id,
        "title": title,
        "phone_number": phone_number,
        "is_main": isMain,
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

export async function updateClinicPhoneService(token: string, id: number | undefined, title: string, phone_number: string, is_main: boolean, clinic_id: number): Promise<{status: number, data: any, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics/phone', {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
        "token": API_KEY,
        "user_token": token
      },
      mode: "cors",
      body: JSON.stringify({
        "title": title,
        "phone_number": phone_number,
        "is_main": is_main,
        "clinic_id": clinic_id,
        "id": id
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

export async function deleteClinicPhoneService(token: string, id: number): Promise<{status: number, msg?: string | null}> {
  const res = await fetch(API_URL + '/clinics/phone', {
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
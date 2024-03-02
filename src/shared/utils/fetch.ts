import { HTTPError } from './error';

type FetchUrl = string | URL | globalThis.Request;
type AnyBody = Record<string, any>;

async function request<Response>(url: FetchUrl, { headers, ...rest }: RequestInit = {}): Promise<Response> {
  const baseUrl = '';
  const requestUrl = `${baseUrl}${url}`;

  const response = await fetch(requestUrl, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    ...rest,
  });

  if (response.status >= 400) {
    console.log(response);
    throw new HTTPError(response.status, `status code: ${response.status} error가 발생했습니다`);
  }

  const json = await response.json();
  return json;
}

const get = <Response>(url: FetchUrl, options?: RequestInit) => {
  return request<Response>(url, {
    ...options,
    method: 'GET',
  });
};

const post = <Response, Body extends AnyBody = AnyBody>(url: FetchUrl, body: Body, options?: RequestInit) => {
  return request<Response>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

const put = <Response, Body extends AnyBody = AnyBody>(url: FetchUrl, body: Body, options?: RequestInit) => {
  return request<Response>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

const patch = <Response, Body extends AnyBody = AnyBody>(url: FetchUrl, body: Body, options?: RequestInit) => {
  return request<Response>(url, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

const _delete = <Response, Body>(url: FetchUrl, body: Body, options?: RequestInit) => {
  return request<Response>(url, {
    ...options,
    method: 'DELETE',
    body: JSON.stringify(body),
  });
};

const http = {
  get,
  post,
  put,
  patch,
  delete: _delete,
};

export default http;

function createRequest(options = {}) {
  const method = options.method || 'GET';
  let url = options.url || '';
  const data = options.data;
  const callback = options.callback;
  
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  
  if (method === 'GET' && data) {
    const params = new URLSearchParams(data).toString();
    url += `?${params}`;
  }
  
  xhr.open(method, url);
  
  let requestBody = null;
  if (method !== 'GET' && data) {
    requestBody = new FormData();
    for (const key in data) {
      requestBody.append(key, data[key]);
    }
  }
  
  xhr.addEventListener('load', () => {
    if (callback) {
      callback(null, xhr.response);
    }
  });
  
  xhr.addEventListener('error', () => {
    if (callback) {
      callback(new Error('Network error'), null);
    }
  });
  
  try {
    xhr.send(requestBody);
  } catch (err) {
    if (callback) {
      callback(err, null);
    }
  }
}
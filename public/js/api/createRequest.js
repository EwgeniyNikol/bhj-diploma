function createRequest(options = {}) {
  const xhr = new XMLHttpRequest();
  
  xhr.responseType = 'json';
  
  const method = options.method || 'GET';
  let url = options.url || '';
  const data = options.data;
  
  if (method === 'GET' && data) {
    const params = new URLSearchParams(data).toString();
    url += `?${params}`;
  }
  
  xhr.open(method, url);
  
  xhr.addEventListener('load', () => {
    options.callback(null, xhr.response);
  });
  
  xhr.addEventListener('error', () => {
    options.callback(new Error('Network error'), null);
  });
  
  try {
    if (method !== 'GET' && data) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      xhr.send(formData);
    } else {
      xhr.send();
    }
  } catch (err) {
    options.callback(err, null);
  }
}

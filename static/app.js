// Configura la URL de tu backend FastAPI si es diferente
const BACKEND = 'http://localhost:8000';

document.getElementById('send').addEventListener('click', async () => {
  const promptEl = document.getElementById('prompt');
  const status = document.getElementById('status');
  const output = document.getElementById('output');
  const prompt = promptEl.value.trim();

  output.textContent = '';
  if (!prompt) {
    status.textContent = 'Escribe un prompt';
    return;
  }

  status.textContent = 'Enviando...';
  try {
    const url = `${BACKEND}/llm/${encodeURIComponent(prompt)}`;
    const res = await fetch(url, { method: 'GET' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    output.textContent = data.respuesta ?? JSON.stringify(data, null, 2);
    status.textContent = 'Completado';
  } catch (err) {
    status.textContent = 'Error';
    output.textContent = err.toString();
  }
});

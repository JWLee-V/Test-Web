const STORAGE_KEY = 'test-web-guestbook';

const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const greeting = document.getElementById('greeting');
const list = document.getElementById('list');
const count = document.getElementById('count');
const clearButton = document.getElementById('clear');

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function save(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // 저장이 막힌 환경(시크릿 창 등)에서는 화면에만 표시
  }
}

let entries = load();

function render() {
  list.replaceChildren();
  for (const entry of entries) {
    const li = document.createElement('li');
    const text = document.createElement('div');
    text.textContent = `${entry.name}: ${entry.message}`;
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = new Date(entry.time).toLocaleString('ko-KR');
    li.append(text, meta);
    list.append(li);
  }
  count.textContent = entries.length;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  if (!name || !message) return;

  entries.unshift({ name, message, time: Date.now() });
  save(entries);
  render();

  greeting.textContent = `${name}님, 반가워요! 메시지가 등록되었습니다.`;
  greeting.hidden = false;
  messageInput.value = '';
  messageInput.focus();
});

clearButton.addEventListener('click', () => {
  if (!entries.length || !confirm('남긴 글을 모두 지울까요?')) return;
  entries = [];
  save(entries);
  render();
  greeting.hidden = true;
});

render();

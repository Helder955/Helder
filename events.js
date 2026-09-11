async function loadEvents() {
  const list = document.getElementById('events');
  const emptyState = document.getElementById('empty-state');
  const template = document.getElementById('event-template');

  // Bail out clearly if the page is missing required elements,
  // instead of throwing a cryptic "Cannot set properties of null" error.
  if (!list) {
    console.error('events.js: no element with id="events-list" found on this page.');
    return;
  }
  if (!template) {
    console.error('events.js: no <template id="event-template"> found on this page.');
    return;
  }

  const showEmptyState = (message) => {
    list.innerHTML = '';
    if (emptyState) {
      emptyState.hidden = false;
      if (message) emptyState.textContent = message;
    } else {
      console.warn('events.js: no element with id="empty-state" found — skipping message:', message);
    }
  };

  let events;
  try {
    const response = await fetch('events.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    events = await response.json();
  } catch (err) {
    console.error('Could not load events.json:', err);
    showEmptyState('De evenementen konden niet geladen worden. Probeer later opnieuw.');
    return;
  }

  // Drop events whose date has already passed, soonest first.
  const today = new Date().setHours(0, 0, 0, 0);
  events = events
    .filter(ev => new Date(ev.date).setHours(0, 0, 0, 0) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (events.length === 0) {
    showEmptyState();
    return;
  }

  if (emptyState) emptyState.hidden = true;
  list.innerHTML = '';

  const longDate = new Intl.DateTimeFormat('nl-BE', { day: 'numeric', month: 'long' });

  for (const event of events) {
    // Clone the <template> content — nothing in it is ever rendered directly.
    const node = template.content.cloneNode(true);
    const dateObj = new Date(`${event.date}T00:00:00`);

    // "06.09: HELDER in je lijf" — matches your original button label format.
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const openBtn = node.querySelector('.open');
    openBtn.textContent = `${dd}.${mm}: ${event.title}`;

    node.querySelector('h2').textContent = event.title;

    const timeEl = node.querySelector('time');
    timeEl.setAttribute('datetime', `${dd}-${mm}-${dateObj.getFullYear()}`);
    timeEl.textContent = longDate.format(dateObj);

    node.querySelector('div').innerHTML = event.description || '';

    const nav = node.querySelector('nav');
    (event.links || []).forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.label;
      a.target = '_blank';
      a.rel = 'noopener';
      nav.appendChild(a);
    });
    if (!event.links || event.links.length === 0) nav.remove();

    list.appendChild(node);
  }

  // Wire up open/close behaviour once, after everything is in the DOM.
  list.addEventListener('click', (e) => {
    const openBtn = e.target.closest('.open');
    if (openBtn) {
      const section = openBtn.nextElementSibling;
      section.classList.toggle('hidden');
      return;
    }
    const closeBtn = e.target.closest('.close');
    if (closeBtn) {
      closeBtn.closest('section').classList.add('hidden');
    }
  });
}

loadEvents();
import { researchNotes as initialNotes } from './researchNotes';

const STORAGE_KEY = 'orbetex_user_notes';

// Safe localStorage getter
export function getStoredNotes() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read notes from localStorage:', err);
    return [];
  }
}

// Get all notes (user notes + bundled notes)
export function getAllNotes() {
  const userNotes = getStoredNotes();
  const userSlugs = new Set(userNotes.map(n => n.slug));
  const filteredInitial = initialNotes.filter(n => !userSlugs.has(n.slug));
  
  // Return combined list, with custom notes first
  return [...userNotes, ...filteredInitial];
}

// Get single note by slug
export function getNoteBySlug(slug) {
  const all = getAllNotes();
  return all.find(n => n.slug === slug || n.id === slug) || null;
}

// Save a note to localStorage
export function saveUserNote(note) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredNotes();
    const index = existing.findIndex(n => n.slug === note.slug);
    let updated;
    if (index >= 0) {
      updated = [...existing];
      updated[index] = { ...note, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...note, createdAt: new Date().toISOString() }, ...existing];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('orbetex_notes_updated', { detail: { slug: note.slug } }));
    return true;
  } catch (err) {
    console.error('Failed to save note to localStorage:', err);
    return false;
  }
}

// Delete a note from localStorage
export function deleteUserNote(slug) {
  if (typeof window === 'undefined') return false;
  try {
    const existing = getStoredNotes();
    const filtered = existing.filter(n => n.slug !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('orbetex_notes_updated', { detail: { slug } }));
    return true;
  } catch (err) {
    console.error('Failed to delete note:', err);
    return false;
  }
}

// Format note as a JS object ready to paste into src/data/researchNotes.js
export function formatNoteAsCode(note) {
  return `  {
    id: ${JSON.stringify(note.id || note.slug)},
    slug: ${JSON.stringify(note.slug)},
    title: ${JSON.stringify(note.title)},
    date: ${JSON.stringify(note.date || new Date().toISOString().split('T')[0])},
    status: ${JSON.stringify(note.status || 'in-progress')},
    readingTime: ${JSON.stringify(note.readingTime || '5 min read')},
    category: ${JSON.stringify(note.category || 'Artificial Intelligence')},
    tags: ${JSON.stringify(note.tags || [])},
    summary: ${JSON.stringify(note.summary || '')},
    mathSample: ${JSON.stringify(note.mathSample || '')},
    bibtex: ${JSON.stringify(note.bibtex || '')},
    content: \`${(note.content || '').replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`
  },`;
}

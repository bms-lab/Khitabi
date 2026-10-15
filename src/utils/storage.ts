/**
 * Safe local storage wrapper for form persistence
 */

export function saveFormState(key: string, data: Record<string, string>): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(`khitabi_form_${key}`, JSON.stringify(data));
    }
  } catch (e) {
    console.warn('Could not save form state to localStorage', e);
  }
}

export function loadFormState(key: string): Record<string, string> | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const item = window.localStorage.getItem(`khitabi_form_${key}`);
      return item ? JSON.parse(item) : null;
    }
  } catch (e) {
    console.warn('Could not load form state from localStorage', e);
  }
  return null;
}

export function clearFormState(key: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(`khitabi_form_${key}`);
    }
  } catch (e) {
    console.warn('Could not clear form state from localStorage', e);
  }
}

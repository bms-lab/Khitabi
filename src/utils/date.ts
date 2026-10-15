/**
 * Date formatting utilities for Gregorian and Hijri (Umm al-Qura) calendars,
 * and optional Arabic-Indic digits converter.
 */

export function convertToArabicIndicDigits(str: string): string {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, (w) => arabicDigits[+w]);
}

export function formatGregorianDate(dateInput: Date | string = new Date(), useArabicDigits = false): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return '';

  const formatter = new Intl.DateTimeFormat('ar-SA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatted = formatter.format(d);
  return useArabicDigits ? convertToArabicIndicDigits(formatted) : formatted;
}

export function formatHijriDate(dateInput: Date | string = new Date(), useArabicDigits = false): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return '';

  try {
    const formatter = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formatted = formatter.format(d);
    return useArabicDigits ? convertToArabicIndicDigits(formatted) : formatted;
  } catch {
    // Fallback if islamic-umalqura is unavailable
    return formatGregorianDate(d, useArabicDigits);
  }
}

export function getFullDateString(calendar: 'gregorian' | 'hijri' | 'both', dateInput: Date | string = new Date(), useArabicDigits = false): string {
  const greg = formatGregorianDate(dateInput, useArabicDigits);
  const hijri = formatHijriDate(dateInput, useArabicDigits);

  if (calendar === 'hijri') {
    return `${hijri} هـ`;
  }
  if (calendar === 'both') {
    return `${hijri} هـ (الموافق ${greg} م)`;
  }
  return `${greg} م`;
}

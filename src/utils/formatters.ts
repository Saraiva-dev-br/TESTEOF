/**
 * Formatting and helper utilities for Oficina do Aprendiz
 */

/**
 * Formats a raw phone string into Brazilian format: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
 */
export function formatPhone(value: string): string {
  if (!value) return '';
  const digits = value.replace(/\D/g, '').slice(0, 11);
  
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Generates a unique, professional protocol number for student registration
 */
export function generateProtocol(prefix = 'OA-PI'): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${randomNum}`;
}

/**
 * Formats an ISO or standard date into Brazilian locale format
 */
export function formatBrazilianDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

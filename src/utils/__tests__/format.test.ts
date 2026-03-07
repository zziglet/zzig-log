import { describe, it, expect } from 'vitest';
import { formatDate } from '../format';

describe('formatDate', () => {
  it('formats ISO date string to YYYY.MM.DD', () => {
    expect(formatDate('2025-01-15')).toBe('2025.01.15');
  });

  it('formats date with time component', () => {
    expect(formatDate('2025-03-07T12:30:00.000Z')).toBe('2025.03.07');
  });

  it('pads single-digit month and day', () => {
    expect(formatDate('2025-02-03')).toBe('2025.02.03');
  });

  it('returns "Invalid Date" for invalid string', () => {
    expect(formatDate('not-a-date')).toBe('Invalid Date');
  });

  it('returns "Invalid Date" for empty string', () => {
    expect(formatDate('')).toBe('Invalid Date');
  });
});

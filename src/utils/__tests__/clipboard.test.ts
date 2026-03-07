import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyToClipboard } from '../clipboard';

describe('copyToClipboard', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  it('returns true on successful copy', async () => {
    vi.mocked(navigator.clipboard.writeText).mockResolvedValue(undefined);
    const result = await copyToClipboard('https://example.com');
    expect(result).toBe(true);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com');
  });

  it('returns false on failure', async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error('denied'));
    const result = await copyToClipboard('https://example.com');
    expect(result).toBe(false);
  });
});

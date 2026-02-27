'use client';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '16px',
            fontFamily: 'sans-serif',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>예상치 못한 오류가 발생했습니다</h2>
          <p style={{ fontSize: '16px', color: '#9D9D9D', margin: 0 }}>잠시 후 다시 시도해주세요.</p>
          <button
            onClick={reset}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              backgroundColor: '#726C55',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}

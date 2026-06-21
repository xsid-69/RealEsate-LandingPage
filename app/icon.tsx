import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          borderRadius: 6,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 700, color: '#C4A44E', marginTop: -2 }}>N</span>
      </div>
    ),
    { width: 32, height: 32 }
  );
}

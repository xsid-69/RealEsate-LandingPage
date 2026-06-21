import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          borderRadius: '6px',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#C4A44E',
            fontFamily: 'serif',
          }}
        >
          N
        </span>
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: '#C4A44E',
          }}
        />
      </div>
    ),
    { ...size }
  );
}

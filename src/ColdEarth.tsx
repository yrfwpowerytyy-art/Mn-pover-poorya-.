
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from 'remotion';

export const ColdEarth: React.FC = () => {
  const frame = useCurrentFrame();

  const temperature = Math.round(
    interpolate(frame, [0, 900], [18, -50])
  );

  const zoom = interpolate(frame, [0, 900], [1, 1.2]);

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(#172f46,#7899a9,#e5f1f5)',
        fontFamily: 'Arial',
        overflow: 'hidden'
      }}
    >
      <AbsoluteFill
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center'
        }}
      >
        {/* Snowy ground */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '35%',
          background: 'linear-gradient(#dcebf0,#ffffff)'
        }}/>

        {/* House */}
        <div style={{
          position: 'absolute',
          left: '31%',
          top: '38%',
          width: '38%',
          height: '34%',
          background: '#526570',
          border: '8px solid #263d4b',
          boxShadow: '0 30px 70px #172b3b'
        }}>
          <div style={{
            position: 'absolute',
            left: '-12%',
            top: '-38%',
            width: '124%',
            height: '45%',
            background: '#dce9ed',
            clipPath: 'polygon(50% 0,100% 100%,0 100%)'
          }}/>
          <div style={{
            position: 'absolute',
            left: '12%',
            top: '25%',
            width: '22%',
            height: '25%',
            background: '#a9d8eb',
            border: '7px solid #e8f1f3'
          }}/>
          <div style={{
            position: 'absolute',
            right: '12%',
            top: '25%',
            width: '22%',
            height: '25%',
            background: '#a9d8eb',
            border: '7px solid #e8f1f3'
          }}/>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: '43%',
            width: '17%',
            height: '48%',
            background: '#203746'
          }}/>
        </div>

        {/* Snow particles */}
        {Array.from({length: 110}).map((_, i) => {
          const x = (i * 137) % 1920;
          const y = (i * 83 + frame * (2 + (i % 4))) % 1150;

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 3 + (i % 4),
                height: 3 + (i % 4),
                borderRadius: '50%',
                background: 'white',
                opacity: 0.85
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* Temperature display */}
      <div style={{
        position: 'absolute',
        right: 90,
        top: 100,
        color: 'white',
        textAlign: 'right',
        textShadow: '0 4px 20px #172b3b'
      }}>
        <div style={{
          fontSize: 25,
          letterSpacing: 5
        }}>
          OUTSIDE TEMPERATURE
        </div>
        <div style={{
          fontSize: 100,
          fontWeight: 900
        }}>
          {temperature}°C
        </div>
      </div>

      {/* Opening title */}
      <div style={{
        position: 'absolute',
        left: 90,
        bottom: 100,
        color: 'white',
        textShadow: '0 5px 25px #172b3b'
      }}>
        <div style={{
          fontSize: 27,
          letterSpacing: 6
        }}>
          THE WORLD HAS CHANGED
        </div>
        <div style={{
          fontSize: 76,
          fontWeight: 900
        }}>
          EARTH: -50°C
        </div>
        <div style={{
          fontSize: 28
        }}>
          A survival story begins
        </div>
      </div>
    </AbsoluteFill>
  );
};

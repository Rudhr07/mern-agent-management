import React from 'react';

const Logo = ({ size = 'lg', showText = true }) => {
  const sizes = {
    sm: { container: '32px', text: '14px', subtext: '10px' },
    md: { container: '40px', text: '16px', subtext: '11px' },
    lg: { container: '48px', text: '20px', subtext: '12px' }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <img 
        src="/cstech-logo.png" 
        alt="CSTech Logo" 
        style={{
          height: sizes[size].container,
          width: sizes[size].container,
          borderRadius: '8px',
          objectFit: 'contain',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
      />
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
          <span style={{ 
            fontSize: sizes[size].text, 
            fontWeight: '700', 
            color: '#1A1A1A',
            letterSpacing: '-0.025em'
          }}>
            CSTech
          </span>
          <span style={{ 
            fontSize: sizes[size].subtext, 
            color: '#4A5568',
            fontWeight: '500',
            letterSpacing: '0.05em'
          }}>
            Infosolutions
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
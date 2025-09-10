import React from 'react';


const Watermark = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
  zIndex: -1,
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.08,
      userSelect: 'none',
    }}
    aria-hidden="true"
  >
    <img
      src="/assets/images/hospital_angeles_logo.png"
      alt="Marca de agua Hospital Angeles"
      style={{
        width: '40vw',
        maxWidth: 600,
        minWidth: 200,
        height: 'auto',
        userSelect: 'none',
        pointerEvents: 'none',
        display: 'block',
      }}
      draggable={false}
    />
  </div>
);

export default Watermark;

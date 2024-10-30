import React from 'react';

interface LegendProps {
  labelColorDict: { [key: string]: string };
}

const Legend: React.FC<LegendProps> = ({ labelColorDict }) => {
  return (
    <div className="legend" style={{ padding: '10px' }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 'bold' }}>Legend</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Node Color</h4>
          {Object.entries(labelColorDict).map(([label, color]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <div style={{
                backgroundColor: color,
                width: '30px',
                height: '30px',
                borderRadius: '50%', // Make the items circular
                border: '2px solid black', // Add black outline
                marginRight: '8px'
              }}></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Node Size</h4>
          <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>Based on degree centrality</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              backgroundColor: '#000',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              marginRight: '8px'
            }}></div>
            <span>High degree centrality</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              backgroundColor: '#000',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              marginRight: '8px'
            }}></div>
            <span>Low degree centrality</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Edge Thickness</h4>
          <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>Based on transaction count</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              backgroundColor: '#000',
              width: '60px',
              height: '10px',
              marginRight: '8px'
            }}></div>
            <span>High transaction count</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              backgroundColor: '#000',
              width: '20px',
              height: '2px',
              marginRight: '8px'
            }}></div>
            <span>Low transaction count</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h4 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold' }}>Edge Opacity</h4>
          <p style={{ margin: '0 0 5px 0', fontSize: '12px' }}>Based on USD amount</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              width: '60px',
              height: '10px',
              marginRight: '8px'
            }}></div>
            <span>High USD amount</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              width: '20px',
              height: '2px',
              marginRight: '8px'
            }}></div>
            <span>Low USD amount</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Legend;

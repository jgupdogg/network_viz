import React from 'react';

interface LayoutSelectorProps {
    layout: string;
    onLayoutChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ layout, onLayoutChange }) => {
    return (
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <label htmlFor="layout-select">Choose a layout:</label>
            <select id="layout-select" value={layout} onChange={onLayoutChange}>
                <option value="circle">Circle</option>
                <option value="grid">Grid</option>
                <option value="random">Random</option>
                <option value="cose">Cose</option>
            </select>
        </div>
    );
};

export default LayoutSelector;

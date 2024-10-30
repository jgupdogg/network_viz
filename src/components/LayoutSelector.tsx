import React from 'react';

interface LayoutSelectorProps {
    layout: string;
    onLayoutChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LayoutSelector: React.FC<LayoutSelectorProps> = ({ layout, onLayoutChange }) => {
    return (
        <div className="w-full flex justify-center p-4 bg-white shadow-md">
            <label htmlFor="layout-select" className="mr-2">Choose a layout:</label>
            <select id="layout-select" value={layout} onChange={onLayoutChange} className="p-2 border border-gray-300 rounded">
                <option value="circle">Circle</option>
                <option value="grid">Grid</option>
                <option value="random">Random</option>
                <option value="cose">Cose</option>
                <option value="cose-bilkent">Cose Bilkent</option>
                <option value="cola">Cola</option>
            </select>
        </div>
    );
};

export default LayoutSelector;

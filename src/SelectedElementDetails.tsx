import React from 'react';

interface SelectedElementDetailsProps {
  selectedElement: any;
  setModalIsOpen: (isOpen: boolean) => void;
}

const SelectedElementDetails: React.FC<SelectedElementDetailsProps> = ({ selectedElement, setModalIsOpen }) => {
  if (!selectedElement) return null;

  const data = selectedElement.data();
  const isNode = selectedElement.isNode();
  const title = isNode ? data.id : `Transaction from ${data.source} to ${data.target}`;
  const backgroundColor = isNode ? data.background_color : '#ddd';

  const formatCurrency = (amount: number) => `$${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  const formatNumber = (number: number) => number.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formatDecimal = (number: number) => number.toFixed(3);

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontWeight: 'bolder', // Bold font weight
    fontSize: '16px', // Increase font size
    WebkitTextStroke: '1px black', // Thicker outline
    color: 'white', // Text color
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const closeButtonStyle: React.CSSProperties = {
    cursor: 'pointer',
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '4px',
    padding: '5px',
    fontSize: '14px',
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'hidden' }}>
      <div style={{ backgroundColor, padding: '10px', color: '#fff', position: 'relative' }}>
        <h3 style={titleStyle}>
          {title}
          <button onClick={() => setModalIsOpen(false)} style={closeButtonStyle}>X</button>
        </h3>
      </div>
      <div style={{ padding: '10px' }}>
        {isNode && (
          <>
            <p><strong>Partite:</strong> {data.partite}</p>
            <p><strong>Label:</strong> {data.label}</p>
            <p><strong>Type:</strong> {data.label_type}</p>
            <p><strong>Subtype:</strong> {data.label_subtype}</p>
            {data.balance_group && <p><strong>Balance Category:</strong> {data.balance_group}</p>}
            <p><strong>Total USD:</strong> {formatCurrency(data.total_usd)}</p>
            <p><strong>Address Count:</strong> {data.address_count}</p>
            <p><strong>Amount ETH:</strong> {formatNumber(data.amount_eth)}</p>
            <p><strong>Latest Balance:</strong> {formatNumber(data.latest_balance / 10 ** 18)}</p>
            <p><strong>Transaction Count:</strong> {formatNumber(data.transaction_count)}</p>
            <p><strong>Degree Centrality:</strong> {formatDecimal(data.degree_centrality)}</p>
            <p><strong>Closeness Centrality:</strong> {formatDecimal(data.closeness_centrality)}</p>
          </>
        )}
        {!isNode && (
          <>
            <p><strong>Source:</strong> {data.source}</p>
            <p><strong>Target:</strong> {data.target}</p>
            <p><strong>Amount USD:</strong> {formatCurrency(data.amount_usd)}</p>
            <p><strong>Amount ETH:</strong> {formatNumber(data.amount_eth)}</p>
            <p><strong>Transaction Count:</strong> {formatNumber(data.count)}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SelectedElementDetails;

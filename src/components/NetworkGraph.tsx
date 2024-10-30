import React, { useEffect, useRef, useState } from 'react';
import cytoscape, { Core, ElementDefinition, EdgeSingular, NodeSingular, Stylesheet } from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import cola from 'cytoscape-cola';
import Modal from 'react-modal';
import { layoutOptions } from '../constants';
import Legend from '../legend';
import SelectedElementDetails from '../SelectedElementDetails';

// Register extensions
cytoscape.use(edgehandles);
cytoscape.use(cola);

// Define the edgehandles method on the Core type
declare module 'cytoscape' {
  interface Core {
    edgehandles: (options?: any) => any;
  }
}

// Declare the cy property on the Window interface
declare global {
  interface Window {
    cy: Core;
  }
}

interface NetworkGraphProps {
  networkData: any;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ networkData }) => {
  const [elements, setElements] = useState<ElementDefinition[]>([]);
  const [selectedElement, setSelectedElement] = useState<NodeSingular | EdgeSingular | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [labelColorDict, setLabelColorDict] = useState<{ [key: string]: string }>({});
  const cyRef = useRef<Core | null>(null);

  useEffect(() => {
    if (networkData && networkData.data_projected && networkData.data_projected.elements) {
      console.log("Processing network data:", networkData); // Log the network data
      const data = networkData.data_projected;
      const legendData = networkData.label_color_dict; // Get the legend data
      console.log("Parsed network data:", data);

      const formatLabel = (label: string): string => {
        return label.replace(/_/g, ' ').split(' ').join('\n');
      };

      const nodes = data.elements.nodes.map((node: any) => ({
        data: {
          ...node.data,
          label: formatLabel(node.data.label), // Replace underscores and stack words
          latest_balance: Number(node.data.latest_balance),  // Convert latest_balance to number
          background_color: node.data.color || '#0074D9',
          partite: node.data.partite,
          label_subtype: node.data.label_subtype,
          label_type: node.data.label_type,
          total_usd: Number(node.data.total_usd),
          count: Number(node.data.count),
          interacted_count: Number(node.data.interacted_count),
          id: node.data.id,
          value: node.data.value,
          name: node.data.name,
        },
      }));

      const edges = data.elements.edges.map((edge: any) => ({
        data: {
          ...edge.data,
          count: Number(edge.data.count),  // Convert count to number
          amount_eth: Number(edge.data.amount_eth)  // Convert amount_eth to number
        },
      }));

      setElements([...nodes, ...edges]);
      setLabelColorDict(legendData); // Set the legend data
    } else {
      console.log("Network data elements not available or invalid");
    }
  }, [networkData]);

  useEffect(() => {
    if (elements.length > 0 && document.getElementById('cy')) {
      const cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        elements,
        style: [
          {
            selector: 'node',
            style: {
              'shape': 'data(shape)', // Set node shape based on data attribute
              'background-color': 'data(background_color)',
              'label': 'data(label)',
              'width': 'mapData(degree_centrality, 0, 1, 40, 100)', // Increase minimum width
              'height': 'mapData(degree_centrality, 0, 1, 40, 100)', // Increase minimum height
              'text-valign': 'center',
              'text-halign': 'center',
              'color': '#fff',
              'font-size': '12px', // Increase font size
              'font-weight': 'bold', // Make the text fatter
              'text-wrap': 'wrap', // Enable text wrapping
              'text-max-width': '80px', // Maximum width for text wrapping
              'text-outline-color': '#000', // Dark outline color
              'text-outline-width': '2px', // Outline width
              'border-width': 2,
              'border-color': '#000'
            }
          },
          {
            selector: 'edge',
            style: {
              'width': 'mapData(count, 0, 1000, 2, 10)', // Edge size based on count
              'line-color': '#000',
              'target-arrow-color': '#000',
              'target-arrow-shape': 'triangle',
              'curve-style': 'bezier',
              'opacity': 'mapData(amount_eth, 0, 200000, 0.2, 1)' as any, // Edge opacity based on amount_eth
            }
          }
        ] as Stylesheet[],
        layout: layoutOptions
      });

      cyRef.current = cy;

      const eh = cy.edgehandles({
        canConnect: (sourceNode: NodeSingular, targetNode: NodeSingular) => {
          return !sourceNode.same(targetNode);
        },
        edgeParams: (sourceNode: NodeSingular, targetNode: NodeSingular) => {
          return {};
        },
        hoverDelay: 150,
        snap: true,
        snapThreshold: 50,
        snapFrequency: 15,
        noEdgeEventsInDraw: true,
        disableBrowserGestures: true
      });

      cy.on('select', 'node, edge', (event) => {
        setSelectedElement(event.target);
        setModalIsOpen(true);
      });

      cy.on('unselect', 'node, edge', () => {
        setSelectedElement(null);
        setModalIsOpen(false);
      });
    }
  }, [elements]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      <div id="cy" className="flex-grow border border-gray-300" style={{ minHeight: '800px' }}></div>
      <Legend labelColorDict={labelColorDict} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '10%',
            left: '10%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-10%, -10%)',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Make overlay transparent
          },
        }}
      >
        <div>
          <SelectedElementDetails selectedElement={selectedElement} setModalIsOpen={setModalIsOpen} />
        </div>
      </Modal>
    </div>
  );
};

export default NetworkGraph;

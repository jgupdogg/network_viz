import cytoscape from 'cytoscape';
import { Stylesheet } from 'cytoscape';
import { getColor } from './utils';

export const cytoscapeStyles: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'background-color': (ele: cytoscape.NodeSingular) => getColor(ele.data('partite')),
      'label': 'data(label)',
      'font-size': '12px',
      'color': '#000',
      'text-valign': 'center',
      'text-halign': 'center',
      'width': '20px',
      'height': '20px',
      'border-width': '2px',
      'border-color': '#fff'
    }
  },
  {
    selector: 'edge',
    style: {
      'width': '2px',
      'line-color': '#888',
      'target-arrow-color': '#888',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  }
];

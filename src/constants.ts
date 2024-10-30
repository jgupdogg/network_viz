import { NodeSingular, EdgeSingular } from 'cytoscape';

export const layoutOptions = {
  name: 'cola',
  animate: true,
  refresh: 1,
  maxSimulationTime: 8000,
  ungrabifyWhileSimulating: false,
  fit: true,
  padding: 30,
  nodeDimensionsIncludeLabels: false,
  ready: function() {},
  stop: function() {},
  randomize: false,
  avoidOverlap: true,
  handleDisconnected: true,
  convergenceThreshold: 0.005,
  flow: 'DAG',
  centerGraph: true,
  edgeLength: function(edge: EdgeSingular) { return 200; },  // Increased edge length
};

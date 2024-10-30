import React, { useEffect, useState } from 'react';
import './App.css';
import NetworkGraph from './components/NetworkGraph';
import BalanceGroupChart from './BalanceGroupChart';
import { Tab } from '@headlessui/react';
import { fetchNetworkData } from './api/fetchNetworkData';

const App: React.FC = () => {
  const [balanceGroupStats, setBalanceGroupStats] = useState<any>(null);
  const [networkData, setNetworkData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNetworkData();
        console.log("Fetched data:", data); // Log the fetched data

        // Ensure the data has the expected structure
        if (data && data.data_projected && data.label_color_dict && data.balance_group_stats) {
          setBalanceGroupStats(data.balance_group_stats);
          setNetworkData(data);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        console.error("Failed to fetch network data", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-blue-500 text-white p-4 w-full">
        <h1 className="text-center text-2xl font-bold">Network Analysis of Ethereum Flows within Coinbase</h1>
        <p className="text-center text-sm mt-2">
          We have queried data to and from Coinbase on the Ethereum blockchain and joined existing ETH balances with all unknown and customer addresses.
          This visualization shows the flows to and from the 'hot wallet', where customers buy and receive crypto on Coinbase. The hot wallet and general
          contract are the busiest nodes in the network, as defined by their degree centrality.
        </p>
      </div>
      <div className="w-full max-w-6xl mt-4 flex-grow">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab
              className={({ selected }: { selected: boolean }) =>
                selected
                  ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg'
                  : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-100 hover:bg-white/[0.12] hover:text-white rounded-lg'
              }
            >
              Network Graph
            </Tab>
            <Tab
              className={({ selected }: { selected: boolean }) =>
                selected
                  ? 'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 bg-white rounded-lg'
                  : 'w-full py-2.5 text-sm leading-5 font-medium text-blue-100 hover:bg-white/[0.12] hover:text-white rounded-lg'
              }
            >
              Chart
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2 flex-grow">
            <Tab.Panel className="p-3 bg-white rounded-xl shadow h-full">
              <NetworkGraph networkData={networkData} />
            </Tab.Panel>
            <Tab.Panel className="p-3 bg-white rounded-xl shadow h-full">
              <BalanceGroupChart balanceGroupStats={balanceGroupStats} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default App;

export interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  color: string;
}

export const cryptoOptions: CryptoOption[] = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', color: '#F97316' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: '#A855F7' },
  { id: 'solana', name: 'Solana', symbol: 'SOL', color: '#4ADE80' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA', color: '#3B82F6' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', color: '#EC4899' },
  { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX', color: '#EF4444' },
  { id: 'chainlink', name: 'Chainlink', symbol: 'LINK', color: '#2563EB' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', color: '#9333EA' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', color: '#EAB308' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP', color: '#4B5563' }
];

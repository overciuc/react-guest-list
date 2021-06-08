import { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

export default function UseLoader() {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <LoadingIndicator /> : null,
    () => setLoading(true), // Show the loading indicator
    () => setLoading(false), // Hide the loading indicator
  ];
}

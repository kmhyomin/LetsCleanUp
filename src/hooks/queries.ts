import { useQuery } from '@tanstack/react-query';
import { fetchAirQuality, fetchCleanSpots, fetchCongestion } from '../api/mockApi';

export const queryKeys = {
  spots: ['spots'] as const,
  air: ['air-quality'] as const,
  congestion: ['congestion'] as const,
};

export const useCleanSpots = () =>
  useQuery({ queryKey: queryKeys.spots, queryFn: fetchCleanSpots });

export const useAirQuality = () =>
  useQuery({ queryKey: queryKeys.air, queryFn: fetchAirQuality, refetchInterval: 1000 * 60 * 5 });

export const useCongestion = () =>
  useQuery({ queryKey: queryKeys.congestion, queryFn: fetchCongestion });

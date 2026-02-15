import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function usePlayerStateQuery() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['playerState'],
    queryFn: async () => {
      if (!actor) return null;
      const [stress, scene, keycard, code, saveSpot, doors] = await actor.getPlayerState();
      return {
        stress: Number(stress),
        currentScene: scene,
        hasKeycard: keycard,
        hasFoundCode: code,
        isInSaveSpot: saveSpot,
        doorsBarricaded: doors
      };
    },
    enabled: !!actor && !isFetching
  });
}

export function useUpdateStress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateStress(BigInt(amount));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playerState'] });
    }
  });
}

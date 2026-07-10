import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLeaderboard, getMyScore, submitScore } from "@/lib/api/scores";
import { queryKeys } from "@/lib/query-keys";

export function useLeaderboardQuery() {
  return useQuery({
    queryKey: queryKeys.scores.leaderboard,
    queryFn: getLeaderboard,
  });
}

export function useMyScoreQuery(enabled = false) {
  return useQuery({
    queryKey: queryKeys.scores.myScore,
    queryFn: getMyScore,
    enabled,
    retry: false,
  });
}

export function useSubmitScoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitScore,
    onSuccess: (data, variables) => {
      if (data.score <= variables.score) {
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.leaderboard });
        queryClient.invalidateQueries({ queryKey: queryKeys.scores.myScore });
      }
    },
  });
}

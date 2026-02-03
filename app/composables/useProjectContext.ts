/**
 * Project context composable
 * Provides access to current project ID from route
 * SSR-safe
 */
export const useProjectContext = () => {
  const route = useRoute();

  const projectId = computed(() => {
    return route.params.projectId as string | undefined;
  });

  return {
    projectId,
  };
};

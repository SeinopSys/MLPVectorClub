import { ENDPOINTS } from 'src/utils';
import { useQuery } from 'react-query';
import { csrfFetcher, usefulLinksFetcher } from 'src/fetchers';
import { useEffect } from 'react';
import { CoreSliceMirroredState } from 'src/store/slices';
import { titleSetter } from 'src/utils/core';
import { AppDispatch } from 'src/store';

export function useCsrf() {
  const { data } = useQuery(ENDPOINTS.CSRF_INIT, csrfFetcher, {
    refetchInterval: 3600e3,
    refetchOnWindowFocus: false,
  });

  return data;
}

export function useSidebarUsefulLinks(enabled: boolean) {
  const { data } = useQuery(ENDPOINTS.USEFUL_LINKS_SIDEBAR, usefulLinksFetcher, { enabled });

  return enabled ? data : undefined;
}

export const useTitleSetter = (dispatch: AppDispatch, { title, breadcrumbs }: CoreSliceMirroredState): void => {
  useEffect(() => {
    titleSetter({ dispatch }, { title });
  }, [title, dispatch]);

  useEffect(() => {
    titleSetter({ dispatch }, { breadcrumbs });
  }, [breadcrumbs, dispatch]);
};

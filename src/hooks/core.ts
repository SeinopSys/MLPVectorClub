import { ENDPOINTS, requestObservableToPromise } from 'src/utils';
import { useQuery } from 'react-query';
import { coreService } from 'src/services';

const csrfFetcher = () => coreService.initCsrf().toPromise().then(r => r.status === 204);

export function useCsrf() {
  const { data } = useQuery(ENDPOINTS.CSRF_INIT, csrfFetcher, {
    refetchInterval: 3600e3,
    refetchOnWindowFocus: false,
  });

  return data;
}

const usefulLinksFetcher = () => requestObservableToPromise(coreService.getSidebarUsefulLinks());

export function useSidebarUsefulLinks(enabled: boolean) {
  const { data } = useQuery(ENDPOINTS.USEFUL_LINKS_SIDEBAR, usefulLinksFetcher, { enabled });

  return enabled ? data : undefined;
}

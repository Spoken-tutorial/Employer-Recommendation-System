// React Query hooks
import { useQuery } from "@tanstack/react-query";
import { api } from "@app/axios";

// --- Option fetchers (domains, states) ---
export function useMetaOptions() {
    return useQuery({
        queryKey: ['company-meta-options'],
        queryFn: async () => {
            const [domainsRes, statesRes ] = await Promise.all([
                api.get('/meta/domains/'), // -> ["Software","EdTech","Finance"]
                api.get('/meta/states/'),  // -> [{"code":"MH","name":"Maharashtra"}, ...]
            ])
        return { domains: domainsRes.data, states: statesRes.data }
        }
    })
}
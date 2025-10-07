// React Query hooks
import { useMutation } from "@tanstack/react-query";
import { api } from "@app/axios";
import type { RegistrationPayload } from "./schema";

// --- Registration mutation (company + employer + optional job) ---
export function useRegisterCompany() {
    return useMutation({
        mutationFn: async (payload: RegistrationPayload) => {
            // One endpoint that handles nested create (recommended)
            const url = `/companies/register/`;
            // const res = await api.post(url, payload);
            // return res.data as {
            //     company_id: number;
            //     status: 'pending_verification' | 'approved';
            //     job_id?: number
            // }
            return {
                company_id: 1
            }
        }
    })
}
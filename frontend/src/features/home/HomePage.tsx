import { useQuery } from '@tanstack/react-query'
import { api } from '@app/axios'

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await api.get('/health/') // Django: add a simple health endpoint
      return res.data
    }
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div>
      <h2>JRS Frontend</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

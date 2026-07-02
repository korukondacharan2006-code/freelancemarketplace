import { useEffect, useState } from 'react'
import api from '@/api/client'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function FreelancerDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [bids, setBids] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    try {
      setLoading(true)

      const [projectsRes, bidsRes] = await Promise.all([
        api.get('/projects'),
        api.get('/bids/my'),
      ])

      setProjects(projectsRes.data?.data || [])
      setBids(bidsRes.data?.data || [])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const placeBid = async (projectId: string) => {
    const amount = prompt('Enter Bid Amount')

    if (!amount) return

    const proposal = prompt('Enter Proposal')

    if (!proposal) return

    try {
      await api.post('/bids', {
        projectId,
        amount: Number(amount),
        proposal,
      })

      alert('Bid placed successfully')

      loadData()
    } catch (err: any) {
      console.log('Backend Error =>', err.response?.data)

      alert(
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        'Failed to place bid'
      )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">
          Available Projects
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p>No Projects Found</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="border rounded p-4 mb-4"
            >
              <h3 className="font-bold text-lg">
                {project.title}
              </h3>

              <p>{project.description}</p>

              <p className="mt-2">
                <b>Budget:</b> ₹{project.budget}
              </p>

              <Button
                className="mt-3"
                onClick={() => placeBid(project.id)}
              >
                Place Bid
              </Button>
            </div>
          ))
        )}
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">
          My Bids
        </h2>

        {bids.length === 0 ? (
          <p>No bids yet</p>
        ) : (
          bids.map((bid) => (
            <div
              key={bid.id}
              className="border rounded p-4 mb-4"
            >
              <p>
                <b>Project:</b>{' '}
                {bid.project?.title || 'N/A'}
              </p>

              <p>
                <b>Amount:</b> ₹{bid.amount}
              </p>

              <p>
                <b>Status:</b> {bid.status}
              </p>
            </div>
          ))
        )}
      </Card>
    </div>
  )
}
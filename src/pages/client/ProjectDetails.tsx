import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '@/api/client'

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState<any>(null)
  const [bids, setBids] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [amount, setAmount] = useState('')
  const [proposal, setProposal] = useState('')
  const [bidLoading, setBidLoading] = useState(false)

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const role = user?.role?.toLowerCase()

  const isFreelancer = role === 'freelancer'
  const isClient = role === 'client'

  const loadProject = async () => {
    try {
      setLoading(true)

      const res = await api.get(`/projects/${id}`)

      const projectData =
        res.data?.data || res.data

      setProject(projectData)

if (isClient || isFreelancer) {
  await loadBids(id!)
}
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

const loadBids = async (projectId: string) => {
  try {
    const endpoint = isClient
      ? `/bids/project/${projectId}/client`
      : `/bids/project/${projectId}`

    const res = await api.get(endpoint)

    setBids(res.data?.data || res.data || [])
  } catch (error) {
    console.log(error)
    setBids([])
  }
}

  useEffect(() => {
    if (id) {
      loadProject()
    }
  }, [id])

  const submitBid = async () => {
    try {
      if (!amount || !proposal) {
        alert('Fill all fields')
        return
      }

      setBidLoading(true)

      await api.post('/bids', {
        projectId: id,
        amount: Number(amount),
        proposal,
      })

      alert('Bid submitted successfully')

      setAmount('')
      setProposal('')

      await loadBids(id!)
    
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          'Failed to submit bid'
      )
    } finally {
      setBidLoading(false)
    }
  }

  const deleteProject = async () => {
    try {
      const confirmDelete = window.confirm(
        'Delete this project?'
      )

      if (!confirmDelete) return

      await api.delete(`/projects/${id}`)

      navigate('/client/projects')
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          'Delete failed'
      )
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold">
        {project.title}
      </h1>

      <p className="mt-4">
        {project.description}
      </p>

      <div className="mt-4 space-y-2">
        <p>
          <strong>Budget:</strong> ₹{project.budget}
        </p>

        <p>
          <strong>Status:</strong> {project.status}
        </p>

        <p>
          <strong>Category:</strong> {project.category}
        </p>
      </div>

      {isClient && (
        <div className="mt-6 flex gap-3">

          <button
            onClick={() =>
              navigate(`/client/projects/edit/${id}`)
            }
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Edit
          </button>

          <button
            onClick={deleteProject}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>

        </div>
      )}

      {isFreelancer && (
        <div className="mt-10 border rounded p-4">

          <h2 className="text-xl font-semibold">
            Submit Bid
          </h2>

          <input
            type="number"
            placeholder="Bid Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="border p-2 w-full mt-3"
          />

          <textarea
            placeholder="Proposal"
            value={proposal}
            onChange={(e) =>
              setProposal(e.target.value)
            }
            className="border p-2 w-full mt-3"
            rows={5}
          />

          <button
            onClick={submitBid}
            disabled={bidLoading}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded"
          >
            {bidLoading
              ? 'Submitting...'
              : 'Submit Bid'}
          </button>

        </div>
      )}

      {isClient && (
        <div className="mt-10">

          <h2 className="text-xl font-semibold mb-4">
            Project Bids
          </h2>

         {bids.length === 0 ? (
  <p>No bids yet</p>
) : (
  bids.map((bid) => (
    <div
      key={bid.id}
      className="border rounded p-4 mb-3"
    >
      <p>
        <strong>{bid.freelancer?.name}</strong>
      </p>

      <p>₹{bid.amount}</p>

      <p>{bid.proposal}</p>

      <p>Status: {bid.status}</p>

      {bid.status === 'PENDING' && (
        <div className="flex gap-3 mt-3">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={async () => {
              try {
                await api.patch(`/bids/${bid.id}/accept`)
                alert('Bid Accepted')
                await loadBids(id!)
              } catch (err: any) {
                alert(
                  err?.response?.data?.message ||
                  'Accept failed'
                )
              }
            }}
          >
            Accept
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={async () => {
              try {
                await api.patch(`/bids/${bid.id}/reject`)
                alert('Bid Rejected')
                await loadBids(id!)
              } catch (err: any) {
                alert(
                  err?.response?.data?.message ||
                  'Reject failed'
                )
              }
            }}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  ))
)}

    </div>
  )}

</div>
)
}
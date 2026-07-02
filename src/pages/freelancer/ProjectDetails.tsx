import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '@/api/client'

export default function ProjectDetails() {
  const { id } = useParams()

  const [project, setProject] = useState<any>(null)
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const loadProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`)
      setProject(res.data?.data || res.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) loadProject()
  }, [id])

  const submitBid = async () => {
    try {
      await api.post('/bids', {
        projectId: id,
        amount: Number(amount),
        message,
      })

      alert('Bid submitted successfully')
      setAmount('')
      setMessage('')
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Bid failed')
    }
  }

  if (loading) return <p>Loading...</p>
  if (!project) return <p>Project not found</p>

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="mt-2">{project.description}</p>
      <p className="mt-2 font-semibold">💰 ₹{project.budget}</p>

      <hr className="my-4" />

      <h2 className="font-bold">Place Bid</h2>

      <input
        className="border p-2 block my-2"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="border p-2 block my-2"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="bg-green-600 text-white px-4 py-2"
        onClick={submitBid}
      >
        Submit Bid
      </button>

    </div>
  )
}
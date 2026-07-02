import { useState } from 'react'
import api from '@/api/client'

export default function BidBox({ projectId }: { projectId: string }) {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const submitBid = async () => {
    setLoading(true)

    try {
      await api.post('/bids', {
        projectId,
        amount: Number(amount),
        message: message.trim(),
      })

      alert('Bid submitted successfully')
      window.location.reload()

    } catch (err: any) {
      alert(err?.response?.data?.message || 'Bid failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border p-3 rounded">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Bid Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-2"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={submitBid}
        disabled={loading}
        className="bg-purple-600 text-white w-full p-2"
      >
        {loading ? 'Submitting...' : 'Submit Bid'}
      </button>
    </div>
  )
}
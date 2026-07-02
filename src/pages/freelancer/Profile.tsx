import { useEffect, useState } from 'react'
import api from '@/api/client'
import ProfileCard from '@/components/cards/ProfileCard'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'
import type { User } from '@/types'

export default function Profile() {
  const { success, error } = useToast()
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [formState, setFormState] = useState({
    name: '',
    title: '',
    bio: '',
    skills: [] as string[],
    hourlyRate: '',
  })
  const [skillInput, setSkillInput] = useState('')

  const loadProfile = async () => {
    setLoading(true)
    setLoadError(null)

    try {
      const response = await api.get('/users/profile')
      const data = response.data?.data ?? response.data
      setProfile(data)
    } catch (err) {
      const apiError = err as {
        response?: { data?: { message?: string } }
        message?: string
      }

      setLoadError(
        apiError.response?.data?.message ||
          apiError.message ||
          'Failed to load your profile.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadProfile()
  }, [])

  const startEditing = () => {
    if (!profile) return

    setFormState({
      name: profile.name ?? '',
      title: profile.title ?? '',
      bio: profile.bio ?? '',
      skills: profile.skills ?? [],
      hourlyRate: profile.hourlyRate?.toString() ?? '',
    })
    setSkillInput('')
    setEditing(true)
  }

  const handleAddSkill = () => {
    const trimmed = skillInput.trim()
    if (!trimmed) return

    setFormState((prev) => ({
      ...prev,
      skills: prev.skills.includes(trimmed) ? prev.skills : [...prev.skills, trimmed],
    }))
    setSkillInput('')
  }

  const handleRemoveSkill = (skill: string) => {
    setFormState((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skill),
    }))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const parsedHourlyRate = formState.hourlyRate === '' ? null : Number(formState.hourlyRate)
    if (
      formState.hourlyRate !== '' &&
      (!Number.isFinite(parsedHourlyRate) || parsedHourlyRate === null || parsedHourlyRate < 0)
    ) {
      error('Hourly rate must be a valid non-negative number.')
      setSaving(false)
      return
    }

    try {
      const payload: Record<string, unknown> = {
        name: formState.name.trim(),
        title: formState.title.trim(),
        bio: formState.bio.trim(),
        skills: formState.skills,
      }

      if (formState.hourlyRate !== '') {
        payload.hourlyRate = parsedHourlyRate
      }

      await api.patch('/users/profile', payload)
      await loadProfile()
      setEditing(false)
      success('Profile updated successfully')
    } catch (err) {
      const apiError = err as {
        response?: { data?: { message?: string } }
        message?: string
      }

      error(
        apiError.response?.data?.message ||
          apiError.message ||
          'Failed to update profile. Please try again.',
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage your public profile and showcase your skills.
          </p>
        </div>
        {!editing && (
          <Button variant="outline" onClick={startEditing}>
            Edit Profile
          </Button>
        )}
      </div>

      {loading ? (
        <Card className="mt-8 text-center">
          <p className="text-slate-600">Loading your profile...</p>
        </Card>
      ) : loadError ? (
        <Card className="mt-8 text-center">
          <p className="text-slate-600">{loadError}</p>
        </Card>
      ) : !editing && profile ? (
        <ProfileCard
          user={profile}
          className="mt-8"
          showEditButton
          onEdit={startEditing}
        />
      ) : null}

      {editing && profile && (
        <Card className="mt-8">
          <form onSubmit={handleSave} className="space-y-5">
            <Input
              label="Full name"
              value={formState.name}
              onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
            <Input
              label="Professional title"
              value={formState.title}
              onChange={(e) => setFormState((prev) => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              label="Bio"
              value={formState.bio}
              onChange={(e) => setFormState((prev) => ({ ...prev, bio: e.target.value }))}
              rows={4}
            />
            <Input
              label="Hourly rate (USD)"
              type="number"
              inputMode="decimal"
              min="0"
              value={formState.hourlyRate}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, hourlyRate: e.target.value }))
              }
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Skills</label>
              <div className="mb-3 flex flex-wrap gap-2">
                {formState.skills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200"
                  >
                    {skill} ×
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  label=""
                  placeholder="Add a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={handleAddSkill}>
                  Add Skill
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" isLoading={saving}>
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}

import api from './client'

export async function uploadProfileImage(file: File) {
  const formData = new FormData()
  formData.append('profileImage', file)

  const response = await api.post('/users/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.data
}

export async function uploadResume(file: File) {
  const formData = new FormData()
  formData.append('resume', file)

  const response = await api.post('/users/resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.data
}

export async function uploadPortfolio(file: File) {
  const formData = new FormData()
  formData.append('portfolio', file)

  const response = await api.post('/users/portfolio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data.data
}
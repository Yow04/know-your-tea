import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({ baseURL: BASE_URL, timeout: 30000 , headers: { 'ngrok-skip-browser-warning': 'true' }})

export async function predictDisease(imageFile) {
  const formData = new FormData()
  formData.append('file', imageFile, imageFile.name)
  const response = await api.post('/predict', formData, {
    headers: { 'Content-Type': 'multipart/form-data' , 'ngrok-skip-browser-warning': 'true'},
  })
  return response.data
}

export async function healthCheck() {
  const response = await api.get('/health')
  return response.data
}

export async function mockPredictDisease() {
  await new Promise((res) => setTimeout(res, 1800))
  const diseases = [
    {
      disease: 'Algal Leaf Spot',
      confidence: 0.87,
      severity: 'ringan',
      description: 'Disebabkan oleh alga Cephaleuros virescens. Ditandai dengan bercak oranye-kemerahan pada permukaan daun.',
      topPredictions: [
        { label: 'Algal Leaf Spot', score: 0.87 },
        { label: 'Brown Blight', score: 0.08 },
        { label: 'Healthy', score: 0.05 },
      ],
    },
    {
      disease: 'Brown Blight',
      confidence: 0.91,
      severity: 'berat',
      description: 'Disebabkan oleh jamur Colletotrichum camelliae. Bercak coklat dengan tepi kuning yang meluas cepat.',
      topPredictions: [
        { label: 'Brown Blight', score: 0.91 },
        { label: 'Algal Leaf Spot', score: 0.06 },
        { label: 'Healthy', score: 0.03 },
      ],
    },
    {
      disease: 'Healthy',
      confidence: 0.95,
      severity: 'sehat',
      description: 'Daun teh dalam kondisi sehat. Tidak ditemukan tanda-tanda penyakit.',
      topPredictions: [
        { label: 'Healthy', score: 0.95 },
        { label: 'Algal Leaf Spot', score: 0.03 },
        { label: 'Brown Blight', score: 0.02 },
      ],
    },
  ]
  return diseases[Math.floor(Math.random() * diseases.length)]
}
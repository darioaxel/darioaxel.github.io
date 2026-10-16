// Health check endpoint para Docker
export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'app1'
  }
})

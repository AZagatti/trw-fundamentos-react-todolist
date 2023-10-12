const baseUrl = 'http://localhost:3001'

export const api = async <Type>(route: string, params: RequestInit = {}) => {
  const response = await fetch(`${baseUrl}/${route}`, {
    ...params,
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
  })
  if (!response.ok) {
    throw Error(response.statusText)
  }
  const data = (await response.json()) as Type
  return { ...response, data }
}

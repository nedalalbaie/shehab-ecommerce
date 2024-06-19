const storage = import.meta.env.VITE_API_Storage

export const pathToFile = async (path: string, filename: string): Promise<File> => {
  const response = await fetch(`${storage}${path}`)
  const blob = await response.blob()
  return new File([blob], filename, { type: 'image/png' })
}

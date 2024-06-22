export const pathToFile = async (path: string, filename: string): Promise<File> => {
  const response = await fetch(path)
  const blob = await response.blob()
  return new File([blob], filename, { type: 'image/png' })
}

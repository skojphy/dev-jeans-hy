export const pageFlater = (pages: any) => {
  if (pages) return pages.flatMap((page) => page.data.content)
  else return []
}

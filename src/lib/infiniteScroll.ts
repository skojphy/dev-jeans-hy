export const infiniteScroll = ({fetch, element}: {fetch: () => void; element: HTMLElement}) => {
  if (element) {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting) {
          fetch()
        }
      },
      {threshold: 1},
    )
    observer.observe(element) //Element of DOM
  }
}

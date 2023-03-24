type InitAuthProps = {
  ref: HTMLElement
  text?: google.accounts.id.GsiButtonConfiguration['text']
}

export const initAuth2 = ({ref, text = 'signin_with'}: InitAuthProps) => {
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    callback: (res) => {
      console.log({res})
    },
  })

  google.accounts.id.renderButton(
    ref,
    {theme: 'filled_black', size: 'medium', text, width: '200', type: 'standard'}, // customization attributes
  )
}

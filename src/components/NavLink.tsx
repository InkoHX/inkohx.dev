import React from 'react'

export type NavLinkProps = JSX.IntrinsicElements['a'] & {
  href: string
  mode?: 'equal' | 'startsWith'
}

const NavLink: React.FC<NavLinkProps> = ({
  mode = 'equal',
  ...props
}) => {
  const [isActive, setActive] = React.useState(false)

  React.useEffect(() => {
    const mutationObserver = new MutationObserver(() => {
      switch (mode) {
        case 'equal':
          setActive(location.pathname === props.href)
          break
        case 'startsWith':
          setActive(location.pathname.startsWith(props.href))
          break
        default:
          throw new TypeError(`Invalid mode: ${mode}`)
      }
    })

    mutationObserver.observe(document.body, { subtree: true, childList: true })
    return () => mutationObserver.disconnect()
  }, [mode, props.href])

  return <a {...props} data-is-active={isActive} />
}

export default NavLink

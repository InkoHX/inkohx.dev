import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import constants from '../constants'
import FontAwesomeIcon from './FontAwesomeIcon'

const MobileHeaderNavigation: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false)
  const [pathname, setPathname] = React.useState<string | undefined>()

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
    setPathname(location.pathname)

    const handlePopstate = () => {
      setPathname(location.pathname)
      setOpen(false)
    }

    window.addEventListener('popstate', handlePopstate)
    return () => window.removeEventListener('popstate', handlePopstate)
  }, [])

  return (
    <>
      <button type="button" className="sm:hidden" aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'} onClick={() => setOpen(it => !it)}>
        {isOpen
          ? (
              <FontAwesomeIcon icon={faXmark} className="!size-8" />
            )
          : (
              <FontAwesomeIcon icon={faBars} className="!size-8" />
            )}
      </button>
      <nav
        className="fixed right-0 top-[var(--header-height)] z-50 h-[calc(100vh-var(--header-height))] w-full translate-x-full space-y-2 overflow-x-hidden bg-slate-200 p-4 transition-transform ease-in-out data-[mobile-nav-open=true]:translate-x-0 sm:hidden"
        data-mobile-nav-open={isOpen}
      >
        {constants.navItems.map(({ text, href }) => (
          <a
            key={text}
            href={href}
            onClick={() => setOpen(false)}
            data-active={pathname === href}
            className="block rounded-lg p-4 text-center font-semibold transition-colors hover:bg-primary-100 data-[active=true]:bg-primary-200"
          >
            {text}
          </a>
        ))}
      </nav>
    </>
  )
}

export default MobileHeaderNavigation

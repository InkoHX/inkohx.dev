import React from 'react'
import styles from './Hero.module.css'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faGithub,
  faGitlab,
  faKeybase,
  faSteam,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'

interface Media {
  name: string
  link: string
  icon: IconDefinition
  style?: string
}

const media: readonly Media[] = [
  {
    name: 'GitHub',
    link: 'https://github.com/InkoHX',
    icon: faGithub,
  },
  {
    name: 'GitLab',
    link: 'https://gitlab.com/InkoHX',
    style: 'text-orange-600',
    icon: faGitlab,
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com/InkoHX',
    style: 'text-blue-600',
    icon: faTwitter,
  },
  {
    name: 'Keybase',
    link: 'https://keybase.io/inkohx',
    style: 'text-orange-600/80',
    icon: faKeybase,
  },
  {
    name: 'Steam',
    link: 'https://steamcommunity.com/id/InkoHX/',
    style: 'text-blue-900',
    icon: faSteam,
  },
]

export const Hero: React.FC = () => {
  return (
    <div id="hero" className={styles.root}>
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4">
        <picture>
          <source srcSet="/logo.png" type="image/png" />
          <img
            className="hover:animate-bounce"
            src="/logo.png"
            width={256}
            height={256}
            alt=""
          />
        </picture>
        <h1 className="text-5xl font-black">InkoHX</h1>
        <p className="text-md mt-2 md:text-2xl">
          Expert of JavaScript / TypeScript
        </p>
        <ul className="mt-4 flex space-x-4">
          {media.map(({ icon, link, name, style }) => (
            <li key={link}>
              <a className="transition-opacity hover:opacity-70" href={link}>
                <span className="sr-only">{name}</span>
                <FontAwesomeIcon
                  className={clsx('h-8 w-8', style)}
                  icon={icon}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

import { socialAccounts } from '../constants'
import {
  SiX,
  SiBluesky,
  SiGithub,
  SiKeybase,
  SiSteam,
  SiZenn,
} from '@icons-pack/react-simple-icons'
import React from 'react'

export interface SocialMediaIconProps {
  name: keyof typeof socialAccounts
  iconProps?: {
    className?: string
  }
}

export const SocialMediaLinkIcon: React.FC<SocialMediaIconProps> = props => {
  const socialAccount = socialAccounts[props.name]
  const icons = {
    bluesky: (
      <SiBluesky color="default" className={props.iconProps?.className} />
    ),
    github: <SiGithub color="default" className={props.iconProps?.className} />,
    keybase: (
      <SiKeybase color="default" className={props.iconProps?.className} />
    ),
    steam: <SiSteam color="default" className={props.iconProps?.className} />,
    x: <SiX color="default" className={props.iconProps?.className} />,
    zenn: <SiZenn color="default" className={props.iconProps?.className} />,
  } satisfies Record<keyof typeof socialAccounts, React.ReactElement>

  return (
    <a href={socialAccount.link}>
      {icons[props.name]}
      <span className="sr-only">{socialAccount.name}</span>
    </a>
  )
}

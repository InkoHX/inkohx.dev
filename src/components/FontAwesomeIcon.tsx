import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { config as fontAwesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon as FontAwesomeIconOriginal } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'

fontAwesomeConfig.autoAddCss = false

const FontAwesomeIcon: React.FC<FontAwesomeIconProps> = (props) => {
  return <FontAwesomeIconOriginal {...props} />
}

export default FontAwesomeIcon

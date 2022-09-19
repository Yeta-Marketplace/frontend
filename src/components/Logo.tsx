import { Link } from 'react-router-dom'
import { colors } from './constants'
import styled from '@emotion/styled'

type Props = {}

const AppLogo = styled(Link)`
  color: ${colors.orange};
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: calc(40px + 2vmin);
  font-weight: bold;
`

function Logo({ }: Props) {
  return (
    <AppLogo to='/'>YetA</AppLogo>
  )
}

export default Logo
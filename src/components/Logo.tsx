import { Link } from 'react-router-dom'
import { colors } from './constants'
import styled from "styled-components"
import "@fontsource/roboto"

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
    <AppLogo to='/'>Yeta</AppLogo>
  )
}

export default Logo
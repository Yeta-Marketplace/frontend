
import styled from '@emotion/styled'
import { colors } from '../styles/colors'
import { heights } from '../styles/heights'

type Props = {}

const Div = styled.div`
  background-color: ${colors.darkgrey};
  min-height: ${heights.nonHeaderVH};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: ${colors.platinum};
`

function WorkInProgress({ }: Props) {
    return (
        <Div>
            🛠 🛠 🛠 Work In Progress! 🛠 🛠 🛠
        </Div>
    )
}

export default WorkInProgress
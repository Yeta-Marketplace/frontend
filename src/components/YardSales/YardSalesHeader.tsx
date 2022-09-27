import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import { colors } from '../../styles/colors'

type Props = {
    isLocated: boolean,
    showCreateFrom: boolean,
    setShowCreateForm: Function
}

const StyledStack = styled(Stack)`
    background-color: ${colors.lightgrey};
    height: 100%;
`

export default function YardSaleHeader({ isLocated, showCreateFrom, setShowCreateForm }: Props) {

    return (
        <StyledStack
            direction="row"
            alignItems='center'
            justifyContent='space-evenly'
            spacing={0}
        >
            <Button variant='contained' size='large'>
                {isLocated ? "Refresh My Location" : "Find Yard Sales"}
            </Button>
            <Button variant='contained' size='large' onClick={() => { setShowCreateForm(!showCreateFrom) }}>
                Add Yard Sale
            </Button>
        </StyledStack>
    )
}
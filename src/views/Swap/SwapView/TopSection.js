import { styled } from '@mui/material/styles';


const SwapTopSectionArea = styled('div')(({ theme }) => ({
    marginTop: '2%',
    width:'80%',
    display: 'flex',
    paddingLeft: '16px',
    paddingRight: '16px',
    marginLeft:'auto',
    marginRight:'auto',
}));

const SwapHeadText = styled('h4')(({ theme }) => ({
    fontWeight: '700',
    fontSize: '20px',
    cursor: 'pointer'
}));

const TopSection = () => {
  return (
    <SwapTopSectionArea>
        <SwapHeadText>Swap CVS Token</SwapHeadText>
    </SwapTopSectionArea>
  )
}

export default TopSection
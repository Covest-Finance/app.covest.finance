import { styled } from '@mui/material/styles';

const FooterSectionArea = styled('div')(({ theme }) => ({
    marginTop: '2%',
    width:'80%',
    display: 'flex',
    flexDirection: 'column',
    
    paddingLeft: '16px',
    paddingRight: '16px',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'5%',
    
    backgroundColor: '#f0faff',
    border: '1px solid #abdcff',
    borderRadius: '8px',
    padding: '15px'
  }));

const FooterSectionView = () => {
  return (
    <FooterSectionArea>
        <ul>
            <li>
                You can stake an asset at any time, but only the unstaked amount and the reward amount are withdrawable after the lockup 
                period.
            </li>
            <li>
                During the lockup period, you are still eligible for rewards.
            </li>
        </ul>
    </FooterSectionArea>
  )
}

export default FooterSectionView
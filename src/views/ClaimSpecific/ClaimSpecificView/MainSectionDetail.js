import { styled } from '@mui/material/styles';


const StakeDetailArea = styled('div')(({ theme }) => ({

    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingLeft: '7.5px',
    paddingRight: '7.5px',
    backgroundColor: '#f6f8f9',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '15px;'

}));
const StakeDetailInnerArea = styled('div')(({ theme }) => ({

    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',

}));

const MainSectionDetail = (props) => {
    const {stakeName,stakeValue} = props
  
  return (
    <StakeDetailArea>
        <StakeDetailInnerArea>
            <div>{stakeValue}</div>
            <div>{stakeName}</div>
        </StakeDetailInnerArea>
    </StakeDetailArea>

  );
};

export default MainSectionDetail;

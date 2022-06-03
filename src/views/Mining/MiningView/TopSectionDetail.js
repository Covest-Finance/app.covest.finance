import { styled } from '@mui/material/styles';


const PoolDetailArea = styled('div')(({ theme }) => ({

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
const PoolDetailInnerArea = styled('div')(({ theme }) => ({

    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',

}));

const TopSectionDetail = (props) => {
    const {poolName,poolValue} = props
  
  return (
    <PoolDetailArea>
        <PoolDetailInnerArea>
            <div>{poolName}</div>
                <div>{poolValue}</div>
        </PoolDetailInnerArea>
    </PoolDetailArea>

  );
};

export default TopSectionDetail;

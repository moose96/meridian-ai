import { CardMedia } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CardMediaStyled = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%' //16:9
});

export default CardMediaStyled;
import styled from '@emotion/styled';
import { Box, Button, Card, CardMedia, Stack, Typography } from '@mui/material';

export const StyledCard = styled(Card)({
  maxWidth: 345,
  height: "auto",
  margin: 'auto',
  textAlign: 'center',
})

export const styledMedia = styled(CardMedia)({
  height: 140,
})

export const StyledInputStack = styled(Stack)({
  padding: "10px",
  border: "1px solid #ffa000",
  gap: 3,
  cursor: "pointer"
})

export const StyledImageBox = styled(Box)({
  textAlign: "center",
  backgroundColor: "#6424C2",
  borderRadius: "20px",
  color: "white",
})

export const StyledComfyTypo = styled(Typography)({
  lineHeight: "350%px",
  fontSize: "20px",
  color: "white",
  marginTop: "30px"
})

// export const StyledAnimateButton = styled(Button)({
//   fontWeight: 700,
//   padding: "10px 60px",
//   backgroundColor: "transparent",
//   border: "1px solid black",
//   fontSize: "26px",
//   borderRadius: "10px",
//   color: "blue",
//   '&:hover': {
//     backgroundColor: "transparent",
//     color: "blue",
//   },
// })

export const StyledAnimateButton = styled(Button)`
  position: relative;
  background: linear-gradient(330deg, #9DFF71 0%, #FFD88D 30%, #FF76D5 65%, #55BEFF 100%);
  padding: 0;
  width: 320px;
  height: 64px;
  text-align: center;
  color: #ffffff;
  display: block;
  cursor: pointer;
  border-radius: 40px;
  font: normal bold normal 25px/32px 'Inter', sans-serif;

  &:before {
    content: '';
    z-index: 1;
    position: absolute;
    display: block;
    width: 100%;
    height: 70%;
    top: 15%;
    left: 0;
    transition: 0.3s opacity ease-in-out;
    filter: blur(5px);
    opacity: 0;
    background: linear-gradient(330deg, #9DFF71 0%, #FFD88D 30%, #FF76D5 65%, #55BEFF 100%);
  }

  &:after {
    text-align: center;
    color: white;
    background-color: #6324C2;
    font: normal bold normal 25px/32px 'Inter', sans-serif;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    top: 3px;
    left: 3px;
    border-radius: 40px;
    z-index: 5;
    position: absolute;
    display: block;
    padding: 10px;
  }

  &:focus:before,
  &:hover:before {
    opacity: 1;
    transition: 0.3s opacity ease-in-out;
    filter: blur(25px);
    background: linear-gradient(330deg, #9DFF71 0%, #FFD88D 30%, #FF76D5 65%, #55BEFF 100%);
  }

  &:hover {
    text-decoration: none;
    color: white;
  }
`

export const StyledTypography = styled(Typography)({
  padding: "10px 20px",
  background: "#5928C4",
  color: "white !important",
  fontSize: "20px",
  width: "fit-content",
  marginBottom: "5px",
  borderRadius: "5px"
})

export const BoldTypography = styled(Typography)({
  fontWeight: 700,
  fontSize: "26px",
  color: "white",
})

export const LoadingContainer = styled(Stack)({
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  // marginTop: "-64px",
  color: "white",
  background: "linear-gradient(to bottom, #2539D0, #8816BA)"
})
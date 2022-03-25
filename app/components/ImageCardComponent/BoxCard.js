import styled from 'styled-components';
import { Row, Col } from 'styled-bootstrap-grid';
import { Relative, Div, Span, CommonStyles } from '../../../styles';

export const Img1 = styled.img`
    object-fit: cover;
    height: 100% !important;
    width: 100% !important
    position: absolute !important;
    top: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    right: 0px !important;
`;

export const ImgDiv2 = styled.div`
  -webkit-box-pack: center !important;
    -webkit-box-align: center !important;
    position: absolute !important;
    top: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    right: 0px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
`;
export const ImgDiv3 = styled.div`
padding-top: 62.5%;
position: relative !important;
display: block;
`;

export const ImgDiv4 = styled.div`
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 100% !important;
    display: block;
`;
export const ImgDiv5 = styled.div`
     height: 100% !important;
    position: relative !important;
    width: 100% !important;
    display: block;
`;
export const ImgDiv6 = styled.div`
    width: 100% !important;
    height: 100% !important;
    border-radius: 3px !important;
    overflow: hidden !important;
    display: block;
`;

export const ImgDiv7 = styled.div`
    position: absolute !important;
    top: 0px !important;
    bottom: 0px !important;
    left: 0px !important;
    right: 0px !important;
    height: 100% !important;
    width: 100% !important;
    display: block;
`;
export const ImgDiv8 = styled.div`
       padding-top: 62.5%;
    background: transparent;
    contain: strict !important;
    position: relative !important;
    width: 100% !important;
    z-index: 0 !important;
    display: block;
`;

export const ImgDiv9 = styled.div`
        display: block;
`;

export const ImgDiv10 = styled.div`
    margin-bottom: 10px;
        display: block;
`;

export const BoxAHref1 = styled.a`
    color: rgb(72, 72, 72) !important;
    display: block !important;
    text-decoration: none !important;
`;

export const BoxObject2 = styled.div`
@media (min-width: 744px){
  padding-left: 8px !important;
    padding-right: 8px !important;
}
    width: 100% !important;
    height: 100% !important;
    padding-left: 6px !important;
    padding-right: 6px !important;
    display: block;

`;

export const BoxObject3 = styled.div`
  @media (min-width: 744px){
    width: 50% !important;
}
@media (min-width: 1024px){
    width: 100% !important;
}
    width: 300px !important;
    display: inline-block !important;
    vertical-align: top !important;
    white-space: normal !important;
    /* width: 70% !important; */

`;

export const Span0 = styled.span`
    white-space: nowrap !important;
    position:relative;
    width:100%;
    height:100%;  
    flex: 1; 

    @media (min-width: 320px) and (max-width: 1023px) {
    &:first-child {
      margin-left: 30px;
    }
    &:last-child {
      margin-right: 24px;
    }
  }
`;


export const Row1 = styled.span`
    margin-top: 0px !important;
    margin-left: -24px !important;
    margin-right: -24px !important;
    overflow-y: hidden !important;
    display: block;
}
@media (min-width: 744px){
  margin-left: -8px !important;
    margin-right: -8px !important;
    overflow: hidden !important;
    display: block;
    }
`;

export const Row2 = styled.div`
    position: relative !important;
    z-index: 0 !important;
    display: block;

`;

export const RowMargin3 = styled.div`
    margin-top: 8px;
    margin-bottom: 12px;
    display: block;

`;

export const Row4 = styled.div`
@media (min-width: 744px){
      margin-top: 40px !important;
    margin-bottom: 40px !important;
    margin-top: 32px !important;
    margin-bottom: 32px !important;
    display: block;
}
`;



export const Button = styled.button`
  margin-top: 4px !important;
  width: 100% !important;
  /* height: 100% !important; */
  padding: 0 !important;
`;

export const ColAdj = styled(Col)`
  padding-right: 0px;
  padding-left: 0px;
  margin-right: 4px;
  margin-left: 4px;
  white-space: nowrap !important;
  @media (min-width: 320px) and (max-width: 1023px) {
    display: inline-block;
    width: initial;
    &:first-child {
      margin-left: 60px;
    }
    &:last-child {
      margin-right: 24px;
    }
  }
  @media (min-width: 1023px) {
    margin-bottom: 1rem;
    max-width: 24%;
  }
`;

export const RowAdj = styled(Row)`
  margin-left: -0.3125rem;
  margin-right: -0.3125rem;
  width: 100%;


  @media (min-width: 320px) and (max-width: 1023px) {
    display: block;
    /* height: 100%;
    overflow-y: auto;
    white-space: nowrap;
    overflow-x: scroll;
    padding-bottom: 30px;
    margin-bottom: -30px; */
    margin-left: -0rem;
    margin-right: -0rem;

    height: 100% !important;
    overflow-y: auto !important;
    white-space: nowrap !important;
    overflow-x: scroll !important;
    padding-bottom: 30px !important;
    margin-bottom: -30px !important;
    -webkit-overflow-scrolling: touch !important;

  }

  @media (min-width: 1023px) {
    justify-content: center;
  }
`;

export const RowBase = styled(Row)`
    margin-right: 0px !important;
    margin-left: 0px !important;
    width: 100% !important;
  @media (min-width: 320px) and (max-width: 1023px) {
    width: 100% !important;
    overflow-y: hidden !important;
    height: 100% !important;
    /* display: block; */
  }
  @media (min-width: 1023px){
    margin: 0px !important;
  }
`;

export const RelativeCustom = styled(Relative)`
  @media (min-width: 320px) and (max-width: 1023px) {
    margin-right: -28px !important;
    margin-left: -28px !important;
    overflow-y: hidden !important;
    overflow-x: hidden !important;
  }
`;

export const CardContainer = styled(Div)`
  float: left;
  text-align: left;
  width: 140px;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px;
  margin-right: 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-image: initial;
  border-radius: 3px;
  padding: 0px;

  @media (min-width: 1023px) {
    width: 100%;
    display: table;
  }
`;

export const DivBgColor = styled(Div)`
  padding-top: 56.25%;
  background: rgb(72, 72, 72, 0.3);
  contain: strict;
  position: relative;
  width: 100%;

  @media (min-width: 1023px) {
    width: 96px;
    display: table-cell;
    vertical-align: middle;
    height: 72px;
    border-spacing: 0px;
    min-height: 100%;
    padding-top: 0px;
  }
`;

export const DivImagePosition = styled(Div)`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 100%;
  width: 100%;

  @media (min-width: 1023px) {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

export const DivImageHolder = styled(Div)`
  position: relative;
  height: 99%;
  width: 100%;
  background-size: 140px;

  @media (min-width: 1023px) {
    background-size: cover !important;
    background-position: 50% 50% !important;
    background-repeat: no-repeat !important;
    position: absolute;
  }
`;

export const ProcedureName = styled(Span)`
  @media (min-width: 1023px) {
    vertical-align: sub;
  }
`;

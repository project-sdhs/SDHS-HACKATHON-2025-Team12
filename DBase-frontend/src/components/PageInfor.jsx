import styled from "styled-components";

const PageInfor = ({ ImageURL, TitleText, PageText }) => {
  return (
    <>
      <Wrap>
        <ImageWrap $url={ImageURL}></ImageWrap>
        <InforTextWrap>
          <div>{TitleText}</div>
          <div>{PageText}</div>
        </InforTextWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  /* background-color: #f0f8ff47; */
  @media screen and (max-width: 1000px) {
    & {
      flex-direction: column !important;
      gap: 10px;
    }
  }
`;

const ImageWrap = styled.div`
  width: 45%;
  aspect-ratio: 16 / 9; /* 또는 2 / 1, 원하는 비율로 설정 */
  background-color: rgba(154, 176, 255, 0.5);
  border-radius: 10px;
  background-image: url(${(props) => props.$url});
  background-size: cover;
  background-position: center;
  border: 1px solid white;
  @media screen and (max-width: 1000px) {
    & {
      width: 100%;
    }
  }
`;

const InforTextWrap = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 30px;

  /* 타이틀 텍스트 */
  & > div:nth-child(1) {
    font-size: 3rem;
    font-weight: bold;
    word-break: keep-all;
    line-height: 3.5rem;
  }
  & > div:nth-child(2) {
    font-size: 1.5rem;
    line-height: 2.5rem;
    word-break: keep-all;
  }
  @media screen and (max-width: 1000px) {
    & {
      width: 100%;
    }
  }
`;

export default PageInfor;

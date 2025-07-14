import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <Wrap>
        <FooterWrap>
          <WebInforWrap>
            <img src="../src/assets/images/Logo.svg" alt="" />
            <div>
              서울디지텍고등학교 학생들의 성공적인 취업을 위한 AI 기반 <br />
              맞춤형 지원 플랫폼입니다.
            </div>
            <div>© 2025 DBase. All Rights Reserved.</div>
          </WebInforWrap>
          <FooterNavWrap>
            <span>플랫폼</span>
            <FooterNavList>
              <a href="#">채용정보</a>

              <a href="#">내 프로필</a>

              <a href="#">취업현황</a>

              <a href="#">취업 로드맵</a>
            </FooterNavList>
          </FooterNavWrap>
        </FooterWrap>
        <FooterETC>서울디지텍고등학교 | 문의: sdh230406@sdh.hs.kr</FooterETC>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100%;
  /* height: 100px; */
  background-color: #141826;
  color: white;
`;

const FooterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;

  margin: 50px 200px;
  @media screen and (max-width: 1000px) {
    & {
      margin: 0px 20px;
    }
  }
`;

const WebInforWrap = styled.div`
  /* width: 40%; */
  /* background-color: #f0f8ff4c; */
  & > img {
    width: 300px;
    margin-bottom: 20px;
  }
  & > div:nth-child(2) {
    word-break: keep-all;
    margin-bottom: 10px;
    color: #ffffff;
    opacity: 0.7;
    line-height: 20px;
  }
  & > div:nth-child(3) {
    color: #ffffff;
    opacity: 0.5;
  }
`;

const FooterNavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-direction: column;
  gap: 10px;
`;

const FooterNavList = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: end;
  flex-direction: column;

  /* FooterNavListItem */
  & > a {
    color: #ffffff;
    opacity: 0.7;
    transition: all 0.2s ease-in-out;
  }
  & > a:hover {
    text-decoration: underline;
  }
`;

const FooterETC = styled.div`
  padding: 20px 0px;
  text-align: center;
  color: #ffffff;
  opacity: 0.7;
  border-top: 1px solid #ffffff5c;
`;

export default Footer;

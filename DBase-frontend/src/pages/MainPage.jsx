import { Link } from "react-router-dom";
import styled from "styled-components";
import PageInfor from "../components/PageInfor";
import AcountButton from "../components/AcountButton";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import HeroAnimation from "../components/HeroAnimation";

const MainPage = ({ updateHeaderState }) => {
  const [inforWrap, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    updateHeaderState(inView);
  }, [inView, updateHeaderState]);

  return (
    <>
      <HeroAnimation />
      <Wrap>
        <MainWrap>
          <TextWrap>
            <div>
              <span>
                <p>DBase</p>
                <p>우리만의 채용 커뮤니티</p>
              </span>
              <span>
                취업준비도 이제 혼자 말고, 같이! <br />
                나만의 프로필로 채용의뢰서를 확인하고, 선배들과 연결되고, 취업
                로드맵까지 한눈에. <br />
                DBase에서 우리 학교만의 AI 기반 채용 플랫폼을 만나보세요.
              </span>
            </div>

            <Link to={"/jobinfor"}>채용 의뢰 확인하기</Link>
          </TextWrap>
          <MascotWrap>
            <img src="../src/assets/images/KIT.svg" alt="" />
            <img src="../src/assets/images/file.png" alt="" />
            <img src="../src/assets/images/glasses.png" alt="" />
            <img src="../src/assets/images/Mmockup.png" alt="" />
            <img src="../src/assets/images/back.png" alt="" />
          </MascotWrap>
          <ScrollNav>
            <div>Scroll To</div>
            <div>▽</div>
          </ScrollNav>
        </MainWrap>
        <InforWrap ref={inforWrap}>
          <PageInfor
            ImageURL={"../src/assets/images/page1.png"}
            TitleText={"채용정보를 한눈에 확인하세요"}
            PageText={
              "우리 학교로 들어온 채용 정보를 확인하고 AI 분석으로 간편하게 회사에 대한 정보를 알아보세요"
            }
          />
          <PageInfor
            ImageURL={"../src/assets/images/page2.png"}
            TitleText={"간단한 이력서와 프로필 등록"}
            PageText={
              "기술 스택, 프로젝트, 포트폴리오를 체계적으로 관리하고 나만의 이력서를 완성하세요"
            }
          />
          <PageInfor
            ImageURL={"../src/assets/images/page3.png"}
            TitleText={"지도에서 회사의 위치들을 확인하세요"}
            PageText={
              "지도로 보는 선배들의 취업 현황과 회사 주변 편의 시설을 한눈에 확인하세요"
            }
          />
          <PageInfor
            ImageURL={"../src/assets/images/page4.png"}
            TitleText={"원하는 기술 스택의 취업 로드맵을 따라가세요"}
            PageText={
              "AI가 분석한 맞춤형 취업 로드맵으로 체계적인 커리어 준비를 시작하세요"
            }
          />
        </InforWrap>
        <LoginWrap>
          <div>지금 바로 시작하세요</div>
          <div>DBase와 함께 여러분의 꿈을 만들어 보세요</div>
          <AcountButton
            LinkPath={"http://localhost:4433/auth/google"}
            Label={"구글 계정으로 로그인 →"}
          />
          <div>@sdh.hs.kr 계정만 사용 가능합니다</div>
        </LoginWrap>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  background: linear-gradient(
    #020619,
    0%,
    rgb(0, 5, 21),
    15%,
    rgb(9, 35, 119),
    25%,
    rgb(10, 37, 134)
  );
  width: 100%;
  padding-bottom: 100px;
  & > div {
    margin: 0px 200px;
  }

  @media screen and (max-width: 1000px) {
    & > div {
      margin: 0px 20px;
    }
  }
  color: white;
`;

const MainWrap = styled.div`
  margin-top: 100px !important;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media screen and (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`;

const InforWrap = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 50px;
  margin-top: 100px !important;
  & > div:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const ScrollNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  position: absolute;
  bottom: 30px;
  animation: scrollAnimation 1s ease-in-out infinite alternate;
  & > div {
    font-weight: bold;
  }

  @keyframes scrollAnimation {
    from {
      transform: translateY(10px);
    }
    to {
      transform: translateY(0px);
    }
  }
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  & > div {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    gap: 20px;
  }

  & > div > span > p {
    font-weight: bold;
    font-size: 70px;
  }

  & > div > span:nth-child(2) {
    font-size: 18px;
    line-height: 28px;
  }

  & > a {
    font-size: 20px;
    padding: 15px;
    background-color: white;
    font-weight: bold;
    border-radius: 10px;
  }
`;

const MascotWrap = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

  & > img {
    position: absolute;
    animation: floatY 3s ease-in-out infinite alternate;
  }

  & > img:nth-child(1) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8vw;
    z-index: 10;
    animation-delay: 0s;
  }

  & > img:nth-child(2) {
    top: 20%;
    left: 10%;
    transform: scale(1.3);
    animation-delay: 0.2s;
  }

  & > img:nth-child(3) {
    bottom: 20%;
    left: 10%;
    transform: scale(1.3);
    animation-delay: 0.4s;
  }

  & > img:nth-child(4) {
    top: 10%;
    right: 10%;
    transform: scale(1.3);
    animation-delay: 0.6s;
  }

  & > img:nth-child(5) {
    bottom: 30%;
    right: 8%;
    transform: scale(1.3);
    animation-delay: 0.8s;
  }

  @keyframes floatY {
    0% {
      transform: translateY(0) scale(1.3);
    }
    100% {
      transform: translateY(-10px) scale(1.3);
    }
  }

  /* 특이하게 가운데 이미지는 translate로 위치 잡았기 때문에 예외 처리 */
  & > img:nth-child(1) {
    animation: floatYCenter 4s ease-in-out infinite alternate;
  }

  @keyframes floatYCenter {
    0% {
      transform: translate(-50%, -50%) scale(2);
    }
    100% {
      transform: translate(-50%, -60%) scale(2);
    }
  }
`;

const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 100px !important;
  & > div:nth-child(1) {
    font-size: 2rem;
    font-weight: bold;
  }
  & > div:nth-child(2) {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

export default MainPage;

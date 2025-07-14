import styled from "styled-components";
import SelectDropDown from "../components/SelectDropDown";
import SubmitButton from "../components/SubmitButton";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import HeroAnimation from "../components/HeroAnimation";
import AcountButton from "../components/AcountButton";

const RoadMapPage = ({ LoginState }) => {
  const [markdown, setMarkdown] = useState("");
  const [markdownTitle, setMarkdownTitle] = useState("로드맵을 선택해주세요");
  const [job, setJob] = useState(null);
  const [period, setPeriod] = useState(null);

  const handleUpdateJob = (jobItem) => {
    setJob(jobItem);
  };

  const handleUpdatePeriod = (periodItem) => {
    setPeriod(periodItem);
  };

  const sendData = async () => {
    if (!job || !period) {
      alert("직무와 기간을 모두 선택해주세요.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4433/roadmap?job=${job}&period=${period}`
      );
      const data = await res.json();
      const markdownText = data.content;

      // 제목 추출 및 본문에서 제목 제거
      const match = markdownText.match(/^##\s+(.*)$/m);
      if (match && match.index !== undefined) {
        const title = match[1].trim();
        setMarkdownTitle(title);

        const cleanedMarkdown =
          markdownText.slice(0, match.index) +
          markdownText.slice(match.index + match[0].length).trimStart();
        setMarkdown(cleanedMarkdown);
      } else {
        setMarkdownTitle("로드맵을 선택해주세요");
        setMarkdown(markdownText); // 제목 못 찾았으면 원본 그대로
      }
    } catch (error) {
      console.error("로드맵 요청 실패:", error);
    }
  };

  return (
    <>
      <HeroAnimation />

      <Wrap>
        {LoginState ? (
          <>
            <PageinforWrap>
              <PageTitleWrap>
                <PageTitle>취업 로드맵</PageTitle>
                <PageSubTitle>
                  AI가 분석한 맞춤형 취업 로드맵으로 체계적으로 취업을
                  준비하세요
                </PageSubTitle>
              </PageTitleWrap>
            </PageinforWrap>
            <RoadMapSecitonWrap>
              <SectionTitle>로드맵 설정</SectionTitle>
              <div>
                <SectionSubTtile>
                  희망 직무를 선택하면 AI가 맞춤형 로드맵을 생성합니다
                </SectionSubTtile>
                <div>
                  <SelectDropDown
                    UpdateSelectValue={handleUpdateJob}
                    DropDownLabel={"희망 직무 선택"}
                    DropDownItems={[
                      { ItemName: "AI 엔지니어", ReqName: "ai-engineer" },
                      { ItemName: "앱-andoroid", ReqName: "app-android" },
                      { ItemName: "앱-ios", ReqName: "app-ios" },
                      { ItemName: "정보 보안", ReqName: "cyber-security" },
                      { ItemName: "서버 엔지니어", ReqName: "server-engineer" },
                      { ItemName: "웹-백엔드", ReqName: "web-back" },
                      { ItemName: "웹-프론트", ReqName: "web-front" },
                      // ai-engineer, app-android, app-ios, cyber-security, server-engineer, web-back, web-front
                    ]}
                    DropDwonItemColor={"#f9822d"}
                  />
                  <SelectDropDown
                    UpdateSelectValue={handleUpdatePeriod}
                    DropDownLabel={"목표 기간"}
                    DropDownItems={[
                      { ItemName: "6개월", ReqName: "6" },
                      { ItemName: "3개월", ReqName: "3" },
                      { ItemName: "1개월", ReqName: "1" },
                    ]}
                    DropDwonItemColor={"#f9822d"}
                  />
                  <SubmitButton
                    clickEvent={sendData}
                    Text={"로드맵 생성"}
                    BackColor={"#CE622C"}
                    TextColor={"white"}
                    imagePath={"../src/assets/images/RoadMapWhite.svg"}
                  />
                </div>
              </div>
            </RoadMapSecitonWrap>
            <RoadMapSecitonWrap>
              <SectionTitle style={{ marginBottom: "30px" }}>
                {markdownTitle}
              </SectionTitle>
              <div
                style={{
                  display: "block",
                  backgroundColor: "white",
                  color: "black",
                }}
                className="markdown-body"
              >
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </RoadMapSecitonWrap>
          </>
        ) : (
          <div
            style={{
              height: "100vh",
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            로그인 후 이용해주세요.
            <AcountButton
              LinkPath={"http://localhost:4433/auth/google"}
              Label={"구글 계정으로 로그인"}
            />
            <div>@sdh.hs.kr 계정만 사용 가능합니다</div>
          </div>
        )}
      </Wrap>
    </>
  );
};
const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    #1e0c04 0vh,
    #35190a 20vh,
    #753618 50vh,
    #ea6727 75vh,
    #ff8c42 100vh
  );
  color: white;
  padding-bottom: 100px;

  & > div {
    margin: 0px 200px;
  }

  @media screen and (max-width: 1000px) {
    & > div {
      margin: 0px 20px;
    }
  }
`;

const PageinforWrap = styled.div`
  /* height: 100%; */

  /* background-color: #95a8b93b; */
  margin-top: 150px !important;
  padding: 50px 0px;
`;

const PageTitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 30px;
`;

const PageTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const PageSubTitle = styled.div`
  font-size: 20px;
`;

const RoadMapSecitonWrap = styled.div`
  /* height: 100px; */
  padding: 40px 20px;
  background-color: white;
  border-radius: 10px;
  color: black;
  margin-bottom: 30px !important;

  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      width: 100%;
    }
    & > div:nth-child(2) {
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 10px;
      & > div {
        width: 25%;
      }
    }
  }
`;

const SectionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
const SectionSubTtile = styled.div`
  font-size: 18px;
  color: #6c6c6c;
`;
export default RoadMapPage;

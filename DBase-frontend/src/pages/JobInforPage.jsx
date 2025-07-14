import styled from "styled-components";
import SelectDropDown from "../components/SelectDropDown";
import CompanyItem from "../components/CompanyItem";
import JobInforLayout from "../layouts/JobInforLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import FileUploadInput from "../components/FileUploadInput";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroAnimation from "../components/HeroAnimation";
import AcountButton from "../components/AcountButton";

const JobInforPage = ({ LoginState, TeacherState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnlyJobInforPage = location.pathname === "/jobinfor";
  const isJobUploadPage = location.pathname.includes("/jobupload");
  const isJobElementPage = location.pathname.includes("/jobinfor/");
  const isJobInforDetail = location.pathname.includes("/jobinfordetail");
  const isOnlyJobCompanyapplyPage =
    location.pathname === "/jobinfor/companyapply";
  const isOnlyJobCompanyapplyCheckPage =
    location.pathname === "/jobinfor/companyapplycheck";

  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const companyId = queryParams.get("companyId");

  useEffect(() => {
    if (!companyId) return;

    setLoading(true);

    axios
      .get(`http://localhost:4433/job/company?id=${companyId}`)
      .then((res) => {
        setCompanyData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API 호출 에러:", err);
        setLoading(false);
      });
  }, [companyId]);

  return (
    <>
      <HeroAnimation />
      <Wrap>
        {LoginState ? (
          <>
            <PageinforWrap>
              <PageTitleWrap>
                {isJobElementPage && (
                  <div
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "0",
                      transform: "translateY(-150%)",
                    }}
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    ← 채용정보로 돌아가기
                  </div>
                )}
                {isOnlyJobInforPage && <PageTitle>채용정보</PageTitle>}
                {isJobUploadPage && <PageTitle>채용의뢰서 등록</PageTitle>}
                {isJobInforDetail && (
                  <PageTitle>
                    {companyData?.company_name || "채용 상세정보"}
                  </PageTitle>
                )}
                {isOnlyJobCompanyapplyPage && <PageTitle>지원하기</PageTitle>}
                {isOnlyJobInforPage && (
                  <PageSubTitle>
                    우리 학교로 들어온 채용정보를 확인해보세요
                  </PageSubTitle>
                )}
                {isOnlyJobCompanyapplyCheckPage && (
                  <PageTitle>지원현황 확인</PageTitle>
                )}
              </PageTitleWrap>
              {isOnlyJobInforPage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                    marginBottom: "20px",
                    position: "absolute",
                    right: "0",
                    transform: "translateY(-100%)",
                  }}
                >
                  <SubmitButton
                    imagePath={"../src/assets/images/Note.svg"}
                    BackColor={"white"}
                    TextColor={"black"}
                    TextSize={"20px"}
                    Text={"지원현황 확인"}
                    BorderState={false}
                    clickEvent={() => {
                      navigate("companyapplycheck");
                    }}
                  />
                  {TeacherState && (
                    <SubmitButton
                      clickEvent={() => {
                        navigate("/jobinfor/jobupload");
                      }}
                      imagePath={"../src/assets/images/Note.svg"}
                      BackColor={"#3449B4"}
                      TextColor={"white"}
                      TextSize={"20px"}
                      Text={"채용의뢰서 등록"}
                      BorderState={false}
                    />
                  )}
                </div>
              )}
            </PageinforWrap>

            <Outlet />
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
    #020619 0vh,
    #061751 20vh,
    #0b2da2 50vh,
    #0c2ca0 100vh
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
  margin-top: 100px !important;
  padding: 50px 0px;
  position: relative;
`;

const PageTitleWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 30px;
  position: relative;
`;

const PageTitle = styled.div`
  font-size: 60px;
  font-weight: bold;
`;

const PageSubTitle = styled.div`
  font-size: 20px;
`;

export default JobInforPage;

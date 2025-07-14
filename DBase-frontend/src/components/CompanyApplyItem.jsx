import { useState, useEffect } from "react";
import SelectDropDown from "./SelectDropDown";
import SubmitButton from "./SubmitButton";
import FeedbackModal from "./FeedbackModal";
import {
  SectionItemWrap,
  SectionSmallTtile,
  SectionTitle,
} from "../style/SectionLayoutStyle";
import styled from "styled-components";
import axios from "axios";

const CompanyApplyItem = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:4433/apply/status", {
        withCredentials: true,
      });
      setApplications(response.data);
    } catch (error) {
      console.error("지원현황 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    // 반려가 아닌 경우에만 즉시 업데이트
    if (newStatus !== "반려") {
      try {
        await axios.put(
          `http://localhost:4433/apply/status/${applicationId}`,
          {
            status: newStatus,
          },
          {
            withCredentials: true,
          }
        );

        // 상태 업데이트 후 목록 새로고침
        fetchApplications();
      } catch (error) {
        console.error("상태 업데이트 실패:", error);
        alert("상태 업데이트에 실패했습니다.");
      }
    } else {
      // 반려인 경우 피드백 모달을 열기 위해 selectedApplication 설정
      const application = applications.find((app) => app.id === applicationId);
      setSelectedApplication(application);
      setShowFeedbackModal(true);
    }
  };

  const handleDownload = async (applicationId) => {
    try {
      const response = await axios.get(
        `http://localhost:4433/apply/download/${applicationId}`,
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      // ZIP 파일 다운로드
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "지원서류.zip");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 다운로드 실패:", error);

      // 에러 응답에서 메시지 추출
      let errorMessage = "파일 다운로드에 실패했습니다.";
      if (error.response && error.response.data) {
        try {
          const errorData = JSON.parse(await error.response.data.text());
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // JSON 파싱 실패 시 기본 메시지 사용
        }
      }

      alert(errorMessage);
    }
  };

  const handleSubmitFeedback = async (feedback) => {
    if (!selectedApplication) return;

    try {
      await axios.put(
        `http://localhost:4433/apply/status/${selectedApplication.id}`,
        {
          status: "반려",
          feedback: feedback,
        },
        {
          withCredentials: true,
        }
      );

      alert("피드백이 저장되었습니다.");
      setShowFeedbackModal(false);
      setSelectedApplication(null);
      fetchApplications();
    } catch (error) {
      console.error("피드백 저장 실패:", error);
      alert("피드백 저장에 실패했습니다.");
    }
  };

  const handleCancelFeedback = () => {
    setShowFeedbackModal(false);
    setSelectedApplication(null);
  };

  if (loading) {
    return <div>지원현황을 불러오는 중...</div>;
  }

  if (applications.length === 0) {
    return (
      <SectionItemWrap>
        <SectionTitle>지원현황</SectionTitle>
        <SectionSmallTtile>아직 제출한 지원서가 없습니다.</SectionSmallTtile>
      </SectionItemWrap>
    );
  }

  return (
    <>
      {applications.map((application) => (
        <SectionItemWrap key={application.id}>
          <SectionTitle>{application.userName}</SectionTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%" }}>
              <SectionSmallTtile>{application.companyName}</SectionSmallTtile>
              <SectionSmallTtile>{application.jobTitle}</SectionSmallTtile>
              {application.feedback && (
                <SectionSmallTtile
                  style={{ color: "#ff4444", fontSize: "14px" }}
                >
                  피드백: {application.feedback}
                </SectionSmallTtile>
              )}
            </div>
            <ButtonWrap>
              <SelectDropDown
                DropDownItems={[
                  { ItemName: "미확인", ReqName: "미확인" },
                  { ItemName: "제출완료", ReqName: "제출완료" },
                  { ItemName: "반려", ReqName: "반려" },
                ]}
                DropDownLabel={application.status}
                DropDwonItemColor={"#078bff"}
                UpdateSelectValue={(value) =>
                  handleStatusChange(application.id, value)
                }
                onBanryeoSelected={() => {
                  // 반려 선택 시 피드백 모달이 열리도록 이미 handleStatusChange에서 처리됨
                }}
              />
              <SubmitButton
                Text={"지원서류 다운로드"}
                BorderState={false}
                BackColor={"#3449B4"}
                TextColor={"white"}
                clickEvent={() => handleDownload(application.id)}
              />
            </ButtonWrap>
          </div>
        </SectionItemWrap>
      ))}

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={handleCancelFeedback}
        onSubmit={handleSubmitFeedback}
      />
    </>
  );
};

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  gap: 10px;
  & > div {
    width: 20%;
  }
`;

export default CompanyApplyItem;

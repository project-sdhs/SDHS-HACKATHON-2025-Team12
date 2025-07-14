import styled from "styled-components";
import {
  SectionItemWrap,
  SectionSmallTtile,
  SectionSubTitle,
  SectionTitle,
} from "../style/SectionLayoutStyle";
import FileUploadInput from "../components/FileUploadInput";
import SubmitButton from "../components/SubmitButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanyApplyLayout = () => {
  const [company, setCompany] = useState(null);
  const [files, setFiles] = useState({
    resumeAndCoverLetter: null,
    portfolio: null,
    etcFiles: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const companyId = params.get("companyId");

    if (companyId) {
      axios
        .get(`http://localhost:4433/job/company?id=${companyId}`)
        .then((res) => {
          setCompany(res.data);
        })
        .catch((err) => {
          console.error("회사 정보를 불러오지 못했습니다:", err);
        });
    }
  }, []);

  const handleFileChange = (file, fileType) => {
    if (fileType === 'resumeAndCoverLetter') {
      setFiles(prev => ({ ...prev, resumeAndCoverLetter: file }));
    } else if (fileType === 'portfolio') {
      setFiles(prev => ({ ...prev, portfolio: file }));
    } else if (fileType === 'etc') {
      setFiles(prev => ({ ...prev, etcFiles: [...prev.etcFiles, file] }));
    }
  };

  const handleSubmit = async () => {
    // 필수 파일 체크
    if (!files.resumeAndCoverLetter) {
      alert("이력서 + 자기소개서는 필수입니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('resumeAndCoverLetter', files.resumeAndCoverLetter);
      
      if (files.portfolio) {
        formData.append('portfolio', files.portfolio);
      }
      
      files.etcFiles.forEach((file, index) => {
        formData.append('etcFile', file);
      });

      formData.append('companyId', company.id);

      const response = await axios.post(
        'http://localhost:4433/apply/input',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        alert("지원서가 성공적으로 제출되었습니다!");
        // jobinfor 페이지로 이동
        navigate("/jobinfor");
      }
    } catch (error) {
      console.error("지원서 제출 실패:", error);
      alert("지원서 제출에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!company) return <div>불러오는 중...</div>;

  const job = company.jobs && company.jobs.length > 0 ? company.jobs[0] : null;

  return (
    <CompnayInforAlign>
      <SectionItemWrap>
        <SectionTitle>{company.company_name}</SectionTitle>
        <CompanySectionSubTitle style={{ marginBottom: "30px" }}>
          {job?.job_title || "직무 정보 없음"}
        </CompanySectionSubTitle>
        <SectionSmallTtile>
          <img src="../src/assets/images/CLocation.svg" alt="" />
          {company.address}
        </SectionSmallTtile>
        <SectionSmallTtile>
          <img src="../src/assets/images/CDeadline.svg" alt="" />
          마감: {company.deadline}
        </SectionSmallTtile>
        <SectionSmallTtile>
          <img src="../src/assets/images/CWork.svg" alt="" />
          {company.main_business}
        </SectionSmallTtile>
        <hr />
        <SectionSubTitle style={{ marginBottom: "20px" }}>
          자격요건 (우대자격)
        </SectionSubTitle>
        <div>
          <SectionSmallTtile style={{ marginBottom: "5px" }}>
            {job?.qualifications || "자격요건 없음"}
          </SectionSmallTtile>
        </div>
      </SectionItemWrap>

      <SectionItemWrap>
        <SectionTitle>지원서 작성</SectionTitle>
        <SectionSmallTtile style={{ marginBottom: "30px" }}>
          모든 필수 항목을 작성해주세요. 제출 후 수정이 불가능합니다.
        </SectionSmallTtile>
        <SectionSubTitle style={{ marginBottom: "20px" }}>
          <img src="../src/assets/images/fileUpload.svg" alt="" />
          서류 제출
        </SectionSubTitle>
        <FileWrap>
          <FileUploadInput 
            LabelName={"이력서 + 자기소개서"} 
            onFileChange={handleFileChange}
            fileType="resumeAndCoverLetter"
          />
          <FileUploadInput 
            LabelName={"포트폴리오"} 
            onFileChange={handleFileChange}
            fileType="portfolio"
          />
          <FileUploadInput 
            LabelName={"기타"} 
            LabelState={false} 
            onFileChange={handleFileChange}
            fileType="etc"
          />
        </FileWrap>

        <ButtonWrap>
          <SubmitButton
            Text={isSubmitting ? "제출 중..." : "지원서 제출"}
            TextColor={"white"}
            BackColor={isSubmitting ? "#cccccc" : "#3449B4"}
            BorderState={false}
            clickEvent={handleSubmit}
            disabled={isSubmitting}
          />
        </ButtonWrap>
      </SectionItemWrap>
    </CompnayInforAlign>
  );
};

const CompnayInforAlign = styled.div`
  margin-top: 20px !important;
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 25px;
  & hr {
    background-color: #dddddd;
    height: 2px;
    border: none;
    margin: 20px 0px;
  }
  & > div:nth-child(1) {
    width: 35%;
  }
  & > div:nth-child(2) {
    width: 65%;
  }
  & ul {
    padding: 10px;
    & li {
      margin-bottom: 10px;
      font-size: 16px;
      font-weight: 500;
      color: #6c6c6c;
    }
  }
`;

const CompanySectionSubTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 10px;
`;

const FileWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  & > div {
    width: 100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
  & > div {
    width: 20%;
  }
`;

export default CompanyApplyLayout;

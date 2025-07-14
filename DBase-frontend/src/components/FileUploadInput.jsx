import styled from "styled-components";
import { useState } from "react";

const FileUploadInput = ({ LabelName, LabelState = true, onFileChange, fileType }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 파일 크기 체크 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.");
        return;
      }

      // 파일 타입 체크 (PDF만 허용)
      if (file.type !== "application/pdf") {
        alert("PDF 파일만 업로드 가능합니다.");
        return;
      }

      setSelectedFile(file);
      setFileName(file.name);
      
      // 부모 컴포넌트에 파일 정보 전달
      if (onFileChange) {
        onFileChange(file, fileType);
      }
    }
  };

  return (
    <Wrap>
      <div>
        <InputLabel $state={LabelState}>{LabelName}</InputLabel>
        <input 
          type="file" 
          id={`jobFile-${fileType}`} 
          accept=".pdf"
          onChange={handleFileChange}
        />
        <label htmlFor={`jobFile-${fileType}`}>
          <img src="../src/assets/images/fileUpload.svg" alt="파일 업로드" />
          {selectedFile ? (
            <div style={{ color: "#3449B4", fontWeight: "bold" }}>
              {fileName}
            </div>
          ) : (
            <>
              <div>PDF파일을 업로드하세요</div>
              <div>최대 10MB</div>
            </>
          )}
        </label>
      </div>
    </Wrap>
  );
};

const InputLabel = styled.label`
  font-size: 16px;
  color: #111111;
  font-weight: bold;
  position: relative;

  &::after {
    display: ${(props) => (props.$state ? "block" : "none")};
    position: absolute;
    top: 0px;
    right: 0px;
    transform: translateX(110%) translateY(-20%);
    content: "*";
    color: red;
  }
`;

const Wrap = styled.div`
  & > div {
    display: flex;
    justify-content: center;
    align-items: start;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    & > label:nth-child(3) {
      width: 100%;
      /* background-color: #cccccc; */
      aspect-ratio: 16 / 6;
      border: 3px dashed #a1a1a1;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
      color: #a1a1a1;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #3449B4;
        color: #3449B4;
      }
      
      & > img {
        width: 25px;
      }
    }

    input[type="file"] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
`;

export default FileUploadInput;

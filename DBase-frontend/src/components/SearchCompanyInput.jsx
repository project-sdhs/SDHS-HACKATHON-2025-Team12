import styled from "styled-components";
import SelectDropDown from "./SelectDropDown";

const SearchCompanyInput = ({ DropDownItems, DropDownLabel, Placeholder, onSearch }) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    onSearch(value); // 입력할 때마다 검색 실행
  };

  return (
    <SearchWrap>
      <InputWrap>
        <a href="#">
          <img src="../src/assets/images/InputSearch.svg" alt="돋보기" />
        </a>
        <input
          type="text"
          placeholder={Placeholder}
          onChange={handleInputChange}
        />
      </InputWrap>
      <SelectDropDown
        DropDownLabel={DropDownLabel}
        DropDownItems={DropDownItems}
        DropDwonItemColor={"#078bff"}
      />
    </SearchWrap>
  );
};

const SearchWrap = styled.div`
  /* width: 100%; */
  /* height: 100px; */
  margin-bottom: 50px !important;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  & > div {
    width: 100%;
    height: 50px;
  }
  & > div:nth-child(n + 2) {
    width: 15%;
    /* height: 100%; */
  }
`;

const InputWrap = styled.div`
  width: 70%;
  height: 100%;
  border: 1px solid #cccccc;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-radius: 10px;
  & > input {
    outline: none;
    border: none;
    width: 100%;
    font-size: 20px;
    /* height: 0; */
    /* border-radius: 100px; */
  }
`;

export default SearchCompanyInput;

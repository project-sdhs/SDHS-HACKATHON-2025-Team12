import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";
import AcountButton from "../components/AcountButton";

const Header = ({ updateLoginState, headerState }) => {
  // const cookies = new Cookies();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4433/user/profile", {
      method: "GET",
      credentials: "include", // ✅ 이걸 반드시 설정해야 쿠키 전송됨
    })
      .then((res) => res.json())
      .then((data) => {
        // ex: { name: "김지윤", email: "...", ... }

        if (data.statusCode != 401) {
          setUser(data);
          if (data.category === "teacher") {
            updateLoginState(true, true);
          } else {
            updateLoginState(true, false);
          }
        }
      });
  }, [updateLoginState]);
  return (
    <Wrap $shrink={headerState}>
      <HeaderWrap>
        <LogoWrap>
          <Link to={"/"}>
            <img src="../src/assets/images/Logo.svg" alt="logo" />
          </Link>
        </LogoWrap>
        <MenuWrap $shrink={headerState}>
          <Link to={"/jobinfor"}>채용정보</Link>
          <Link to={"/profile"}>내프로필</Link>
          <Link to={"/EmploymentStatus"}>취업현황</Link>
          <Link to={"/roadmap"}>취업 로드맵</Link>
        </MenuWrap>

        {user ? (
          <div
            style={{
              color: "black",
              backgroundColor: "white",
              borderRadius: "10px",
              padding: "15px 20px",
              fontWeight: "bold",
            }}
          >
            {user.name}님
          </div>
        ) : (
          <AcountButton
            LinkPath={"http://localhost:4433/auth/google"}
            Label={"구글 로그인"}
          />
        )}
      </HeaderWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  color: white;
  width: 100%;
  height: 100px;
  transition: all 0.3s ease-in-out;
  position: fixed;
  top: 0;
  background-color: ${(props) =>
    props.$shrink ? "rgba(255, 255, 255, 0.11)" : "transparent"};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.199);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(7.9px);
  z-index: 999;
`;

const HeaderWrap = styled.div`
  height: 100%;
  margin: 0px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: white; */
  & * {
    font-size: 18px;
    /* font-weight: bold; */
  }
`;

const LogoWrap = styled.div``;

const MenuWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  & > a {
    color: white;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    padding: 10px 15px;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    white-space: pre;
    &:hover {
      background-color: ${(props) =>
        props.$shrink ? "rgba(0, 0, 0, 0.3)" : "none"};
      /* background-color: ; */
    }
  }
`;

export default Header;

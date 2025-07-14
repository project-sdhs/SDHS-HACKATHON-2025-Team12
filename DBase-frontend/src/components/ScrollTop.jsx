import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지 전환 시 스크롤 맨 위로 이동
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // 렌더링하지 않음
};

export default ScrollToTop;

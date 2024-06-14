import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { getUserInfo } from "../lib/api/auth";

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  // 추가적인 스타일
`;

const Navbar = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: calc(100% - 2rem);
  top: 0;
  z-index: 1000;
  max-width: 1240px;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  color: white;
  margin: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const PageContainer = styled.div`
  padding: 6rem 2rem; /* Navbar height */
`;
const UserAvatar = styled.img`
  width: 40px; // 예시 크기, 필요에 따라 조정
  height: 40px; // 예시 크기, 필요에 따라 조정
  border-radius: 50%; // 원형 이미지로 표시
  margin-right: 10px; // 오른쪽 여백
`;

const UserName = styled.span`
  color: white; // 예시 색상
  // 추가적인 스타일
`;

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/sign_in");
  };

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      }
    });
  }, []);

  return (
    <>
      <Navbar>
        <NavItems>
          <NavItem to="/">HOME</NavItem>
          <NavItem to="/profile">내 프로필</NavItem>
        </NavItems>
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
            </>
          )}
        </UserProfile>
      </Navbar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}

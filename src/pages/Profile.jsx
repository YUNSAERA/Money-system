import { useState, useEffect } from "react";
import styled from "styled-components";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
`;

export default function Profile({ user, setUser }) {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatar);
    console.log(nickname, avatar);
    try {
      const response = await updateProfile(formData);
      console.log("응답 데이터:", response); // 로그로 응답 내용 확인

      if (response && response.success) {
        // response가 유효하면 그 안의 success를 검사
        setUser({
          ...user,
          nickname: response.nickname,
          avatar: response.avatar,
        });
        navigate("/");
      } else {
        console.error("프로필 업데이트 실패: 응답 없음");
      }
    } catch (error) {
      console.error("프로필 업데이트 실패:", error);
    }
  };

  return (
    <Container>
      <h2>프로필 수정</h2>
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          placeholder="닉네임"
          minLength="1"
          maxLength="10"
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="avatar">아바타 이미지</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setAvatar(e.target.files[0]);
            }
          }}
        />
      </InputGroup>
      <Button onClick={handleUpdateProfile}>프로필 업데이트</Button>
    </Container>
  );
}

import { useState } from "react"; // React의 useState 훅을 임포트합니다.
import { useNavigate } from "react-router-dom"; // 페이지 네비게이션을 위해 useNavigate 훅을 임포트합니다.
import styled from "styled-components"; // styled-components 라이브러리를 임포트합니다.
import { register } from "../lib/api/auth";

// Container 스타일 컴포넌트를 정의합니다. 이 컴포넌트는 로그인 폼을 감싸는 컨테이너 역할을 합니다.
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
`;

// InputGroup 스타일 컴포넌트를 정의합니다. 각 입력 필드와 라벨을 그룹화하는 역할을 합니다.
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

// Button 스타일 컴포넌트를 정의합니다. 로그인 버튼의 스타일을 적용합니다.
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    background-color: #aaa;
  }
`;

// ToggleButton 스타일 컴포넌트를 정의합니다. 회원가입 페이지로 이동하는 버튼의 스타일을 적용합니다.
const ToggleButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// SignIn 함수형 컴포넌트를 정의합니다.
export default function SignUp() {
  const [id, setId] = useState(""); // 사용자 아이디를 위한 상태를 관리합니다.
  const [password, setPassword] = useState(""); // 사용자 비밀번호를 위한 상태를 관리합니다.
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate(); // 네비게이션 함수를 초기화합니다.

  const handleRegister = async () => {
    if (id.length < 4 || id.length > 10 || !/\d/.test(id)) {
      alert(
        "아이디는 4글자에서 10글자 이내로만 가능하며, 숫자를 포함해야 합니다!"
      );
      return;
    }

    if (
      password.length < 4 ||
      password.length > 15 ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      alert(
        "패스워드는 4글자에서 15글자 이내로만 가능하며, 특수문자를 포함해야 합니다!"
      );
      return;
    }

    if (nickname.length < 1 || nickname.length > 10) {
      alert("닉네임은 1글자에서 10글자 이내로만 가능합니다!");
      return;
    }

    // API 호출하는 부분

    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
    });
    if (response) {
        confirm("회원가입이 완료되었습니다.")
        navigate("/sign_in");
    }
  };

  return (
    <Container>
      <InputGroup>
        <label htmlFor="id">아이디</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="아이디"
          minLength="4"
          maxLength="10"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
      </InputGroup>
      <Button onClick={handleRegister}>회원가입</Button>
      <ToggleButton onClick={() => navigate("/sign_in")}>돌아가기</ToggleButton>
    </Container>
  );
}

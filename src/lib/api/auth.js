import axios from "axios";

const AUTH_API_HOST = "https://moneyfulpublicpolicy.co.kr";

export const register = async ({ id, password, nickname }) => {
  try {
    const response = await axios.post(AUTH_API_HOST + "/register", {
      id: id,
      password: password,
      nickname: nickname,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message; // 오타를 'massage'에서 'message'로 수정함

    // 에러 메시지가 "이미 존재하는 유저입니다."인 경우 사용자에게 알림
    if (errorMessage === "이미 존재하는 유저입니다.") {
      alert("이미 존재하는 유저입니다.");
    } else {
      alert(errorMessage || "회원가입에 실패했습니다."); // 다른 에러 메시지 또는 기본 메시지 표시
    }
  }
};

export const login = async ({ id, password }) => {
  try {
    const response = await axios.post(AUTH_API_HOST + "/login?expiresIn=10m", {
      id: id,
      password: password,
    });
    console.log(response);
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;

    // 에러 메시지가 "이미 존재하는 유저입니다."인 경우 사용자에게 알림
    if (errorMessage === "이미 존재하는 유저입니다.") {
      alert("이미 존재하는 유저입니다.");
    } else {
      alert(errorMessage || "회원가입에 실패했습니다."); // 다른 에러 메시지 또는 기본 메시지 표시
    }
  }
};

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await axios.get(AUTH_API_HOST + "/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (err) {
      alert("AccessToken 이 만료되었습니다.");
      localStorage.clear();
    }
  }
};

export const updateProfile = async (formData) => {
  console.log(formData);
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const response = await axios.patch(AUTH_API_HOST + "/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (err) {}
  }
};

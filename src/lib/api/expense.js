import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:5000";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된거 같아요! 데이터를 로드 할 수가 없어요");
  }
};
export const getExpense = async ({ queryKey }) => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된 것 같아요! 데이터를 불러 올 수가 없어요");
  }
};

export const postExpense = async (newExpense) => {
  try {
    const response = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return response.data;
  } catch (err) {
    console.log(err);
    alert("뭔가 잘못된거 같아요! 데이터가 써지지 않아요!");
  }
};

import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getExpense } from "../lib/api/expense";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    margin-bottom: 5px;
    font-size: 14px;
    color: #333;
    text-align: left;
  }

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.danger ? "#cc0000" : "#0056b3")};
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

export default function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // useQuery를 사용하여 서버로부터 지출 데이터를 불러옵니다.
  const {
    data: selectedExpense,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expense", id],
    queryFn: () => getExpense(id),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  // 여기서 훅을 호출하면 안 됩니다. 모든 훅은 함수 최상단에 위치해야 합니다.
  if (!selectedExpense) {
    alert("해당 지출 내역을 찾을 수 없습니다.");
    navigate(-1);
    return null;
  }

  // useState를 조건과 상관없이 상단에서 호출
  const [date, setDate] = useState(selectedExpense ? selectedExpense.date : "");
  const [item, setItem] = useState(selectedExpense ? selectedExpense.item : "");
  const [amount, setAmount] = useState(
    selectedExpense ? selectedExpense.amount : 0
  );
  const [description, setDescription] = useState(
    selectedExpense ? selectedExpense.description : ""
  );

  // 수정 함수
  const editExpense = () => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      alert("날짜를 YYYY-MM-DD 형식으로 입력해주세요.");
      return;
    }
    if (!item || amount <= 0) {
      alert("유효한 항목과 금액을 입력해주세요.");
      return;
    }

    const newExpenses = expenses.map((expense) => {
      if (expense.id !== id) {
        return expense;
      } else {
        return {
          ...expense,
          date: date,
          item: item,
          amount: amount,
          description: description,
        };
      }
    });
    setExpenses(newExpenses);
    navigate("/");
  };

  //삭제 로직
  const deleteExpense = () => {
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(newExpenses);
    navigate("/");
  };

  return (
    <Container>
      <InputGroup>
        <label htmlFor="date">날짜</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="YYYY-MM-DD"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="item">항목</label>
        <input
          type="text"
          id="item"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="지출 항목"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="amount">금액</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="지출 금액"
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="description">내용</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="지출 내용"
        />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={editExpense}>수정</Button>
        <Button danger="true" onClick={deleteExpense}>
          삭제
        </Button>
        <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
      </ButtonGroup>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // 백엔드 API를 호출, 사용자 목록을 가져옴
    axios.get("/api/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleLogout = () => {
    // 로그아웃 버튼을 클릭하면 JWT를 삭제, 로그인 페이지 이동
    localStorage.removeItem("jwt");
    history.push("/login");
  };

  return (
    <div>
      <h1>관리자 페이지</h1>
      <button onClick={handleLogout}>로그아웃</button>
      <h2>사용자 목록</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.isAdmin ? "관리자" : "일반 사용자"})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
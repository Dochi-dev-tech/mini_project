import React from 'react'
import { useState, useEffect } from 'react';

function UserEdit() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [user, setUser] = useState(null); // 유저 정보 상태 관리

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get('/api/users/woosung'); // 예시: id가 woosung인 유저 정보를 가져옴
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []); 

  function handleSubmit(event) {
    event.preventDefault();
    // API 요청, 유저 정보 업데이트
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <button type="submit">Update User Info</button>
    </form>
  );
}
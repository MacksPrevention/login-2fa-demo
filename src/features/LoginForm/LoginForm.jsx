import { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ErrorText from '../../components/ErrorText.jsx';

const Form = styled.form`
  width: 23.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
`;

export default function LoginForm({
  onChange,
  onSubmit,
  loading = false,
  error = false,
  errorMessage = '',
}) {
  const [username, setUsername] = useState('user@test.com');
  const [password, setPassword] = useState('123456');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ username, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        size="large"
        placeholder="Email"
        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />}
        type="email"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          if (error && onChange) onChange();
        }}
        status={error ? 'error' : ''}
        autoComplete="username"
      />

      <Input.Password
        size="large"
        placeholder="Password"
        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.45)' }} />}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error && onChange) onChange();
        }}
        status={error ? 'error' : ''}
        autoComplete="current-password"
      />

      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

      <Button type="primary" htmlType="submit" size="large" block loading={loading}>
        Log in
      </Button>
    </Form>
  );
}

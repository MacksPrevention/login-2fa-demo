import { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useMutation } from '@tanstack/react-query';

import { mockLogin, mockVerify2FA } from './api/auth.mock.js';
import LogoSVG from './assets/Company.svg';
import LoginForm from './features/LoginForm/LoginForm.jsx';
import TwoFactorAuth from './features/TwoFactorAuth/TwoFactorAuth.jsx';
import SuccessScreen from './components/SuccessScreen.jsx';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  width: 440px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.div`
  width: 23.5rem;
  margin-top: 2rem;
  position: relative;
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  background: transparent;
  padding: 7px 11px;
  font-size: 1.125rem;

  &:hover {
    background: transparent;
    color: #1677ff;
  }
`;

const Logo = styled.div`
  padding-top: 1.25rem;
  display: flex;
  min-height: 24px;
  flex-direction: row;
  align-items: center;
  padding-bottom: 1.5rem;
  justify-content: center;
`;

const Title = styled.div`
  font-family:
    'San Francisco Pro Text',
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif;
  text-align: center;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #111827;
    line-height: 2rem;
    margin: 0;
  }

  p {
    display: flex;
    font-size: 1.02rem;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    font-style: normal;
    color: rgba(0, 0, 0, 0.88);
    align-items: center;
    margin: 0;
  }
`;

export default function App() {
  const [step, setStep] = useState('login');

  const loginMutation = useMutation({
    mutationFn: mockLogin,
    onSuccess: (data) => {
      if (data.requires2FA) setStep('2fa');
    },
    onError: (err) => {
      message.error(err.message || 'Login failed');
    },
  });

  const verifyMutation = useMutation({
    mutationFn: mockVerify2FA,
    onSuccess: () => {
      message.success('2FA verified!');
      setStep('done');
    },
    onError: (err) => {
      message.error(err.message || 'Invalid code');
    },
  });

  const handleLogin = (data) => loginMutation.mutate(data);
  const handle2FA = (code) => verifyMutation.mutate(code);

  return (
    <Container>
      <Card>
        <Menu>
          {step === '2fa' && (
            <BackButton type="text" icon={<ArrowLeftOutlined />} onClick={() => setStep('login')} />
          )}
          <Logo>
            <img src={LogoSVG} alt="Company Logo" style={{ height: '24px' }} />
          </Logo>
          <Title>
            {step === 'login' && <h3>Sign in to your account to continue</h3>}
            {step === '2fa' && (
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Enter the 6-digit code from the Google Authenticator app</p>
              </div>
            )}
          </Title>
        </Menu>

        {step === 'login' && (
          <LoginForm
            onSubmit={handleLogin}
            loading={loginMutation.isPending}
            error={!!loginMutation.isError}
            errorMessage={loginMutation.error?.message}
            onChange={() => loginMutation.reset()}
          />
        )}

        {step === '2fa' && (
          <TwoFactorAuth
            onSubmit={handle2FA}
            loading={verifyMutation.isPending}
            error={!!verifyMutation.isError}
            onBack={() => setStep('login')}
            onChange={() => verifyMutation.reset()}
          />
        )}

        {step === 'done' && <SuccessScreen onContinue={() => setStep('login')} />}
      </Card>
    </Container>
  );
}

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import ErrorText from '../../components/ErrorText.jsx';

const Form = styled.form`
  position: relative;
  width: 23.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
`;

const CodeInputsWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
`;

export default function TwoFactorAuth({
  onChange,
  onSubmit,
  onGetNew,
  onBack,
  loading = false,
  error = false,
}) {
  const [code, setCode] = useState(['1', '2', '3', '4', '5', '6']);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // таймер обратного отсчёта
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // ввод цифр
  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    if (index > 0 && !newCode[index - 1]) return;
    newCode[index] = value;
    setCode(newCode);

    if (error && onChange) onChange();

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // переход назад по backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // отправка кода
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCode = code.join('');
    if (onSubmit) onSubmit(finalCode);
    inputsRef.current[5]?.focus();
  };

  // получить новый код
  const handleGetNew = () => {
    setCode(Array(6).fill(''));
    setTimeLeft(30);
    inputsRef.current[0]?.focus();
    if (onGetNew) onGetNew();
  };

  const allFilled = code.every((d) => d !== '');

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <CodeInputsWrapper>
          {code.map((num, index) => (
            <Input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              id={`code-${index}`}
              value={num}
              maxLength={1}
              status={error ? 'error' : ''}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              autoComplete="off"
              style={{
                height: '3.75rem',
                textAlign: 'center',
                fontSize: '2rem',
                borderRadius: '0.5rem',
              }}
            />
          ))}
        </CodeInputsWrapper>
        {error && <ErrorText>Invalid code</ErrorText>}
      </div>

      {timeLeft > 0 ? (
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={loading}
          disabled={!allFilled}
        >
          Continue
        </Button>
      ) : (
        <Button type="primary" size="large" block onClick={handleGetNew}>
          Get new
        </Button>
      )}
    </Form>
  );
}

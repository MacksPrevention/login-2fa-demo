import styled from 'styled-components';
import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const Wrapper = styled.div`
  width: 23.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-family:
    'San Francisco Pro Text',
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  line-height: 2rem;
  margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
  font-family:
    'San Francisco Pro Text',
    -apple-system,
    BlinkMacSystemFont,
    'Helvetica Neue',
    Helvetica,
    Arial,
    sans-serif;
  color: rgba(0, 0, 0, 0.88);
  font-size: 1.02rem;
  font-weight: 400;
  line-height: 1.5rem;
  margin: 0 0 2rem 0;
`;

export default function SuccessScreen({ onContinue }) {
  return (
    <Wrapper>
      <IconWrapper>
        <CheckCircleFilled style={{ fontSize: '64px', color: '#52c41a' }} />
      </IconWrapper>
      <Title>Success!!</Title>
      <Description>You have successfully signed in to your account</Description>
      <Button type="primary" size="large" block onClick={onContinue}>
        Continue
      </Button>
    </Wrapper>
  );
}

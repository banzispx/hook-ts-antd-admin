import React, { useState } from 'react';
import { Button, Card, Form, Input } from 'antd';
import styled from '@emotion/styled';

const LongButton = styled(Button)`
  width: 50%;
`;
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
const ShadowCard = styled(Card)`
  width: 50rem;
  height: 30rem;
  padding: 1rem 0rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: absolute;
  top: 50%;
  left: 76%;
  transform: translate(-50%, -50%);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to left bottom, #474947, #111111);
`;
function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (values: { username: string; password: string }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <Container>
      <ShadowCard>
        <Title>请登录</Title>
        <Form
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          style={{ textAlign: 'left' }}
        >
          <Form.Item
            label="用户名"
            name={'username'}
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder={'用户名'} type="text" id={'username'} />
          </Form.Item>
          <Form.Item
            label="密码"
            name={'password'}
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input placeholder={'密码'} type="password" id={'password'} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <LongButton
              loading={isLoading}
              htmlType={'submit'}
              type={'primary'}
            >
              登录
            </LongButton>
          </Form.Item>
        </Form>
      </ShadowCard>
    </Container>
  );
}

export default Login;

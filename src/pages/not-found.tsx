import { Col, Row } from 'antd';

const NotFound = () => {
  return (
    <Row className="not-found">
      <Col span={12} className="left"></Col>
      <Col span={12} className="right">
        <h1>404</h1>
        <h2>抱歉，您访问的页面不存在</h2>
        <div></div>
      </Col>
    </Row>
  );
};

export default NotFound;

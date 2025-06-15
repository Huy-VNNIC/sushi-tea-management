import React from 'react';
import { Typography, Button, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const HeroSection = styled.div`
  text-align: center;
  padding: 60px 0;
  background-color: #001529;
  color: white;
  margin-bottom: 40px;
  position: relative;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(Title)`
  text-align: center;
  margin-bottom: 40px !important;
`;

const FeatureCard = styled(Card)`
  text-align: center;
  margin-bottom: 20px;
  height: 100%;
`;

const HomePage = () => {
  return (
    <MainLayout>
      <HeroSection>
        <HeroContent>
          <Title level={1}>Khám Phá Hương Vị Tuyệt Vời</Title>
          <Paragraph style={{ fontSize: '18px', marginBottom: '30px' }}>
            Trà sữa tươi và đồ ăn Nhật Bản chế biến từ nguyên liệu tươi ngon
          </Paragraph>
          <Button type="primary" size="large">
            <Link to="/menu">Xem Thực Đơn</Link>
          </Button>
        </HeroContent>
      </HeroSection>

      <section>
        <SectionTitle level={2}>Sản Phẩm Nổi Bật</SectionTitle>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <FeatureCard
              cover={<div style={{height: 200, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span>Trà sữa trân châu</span></div>}
              hoverable
            >
              <Card.Meta 
                title="Trà Sữa Trân Châu" 
                description="Hương vị thơm ngon, đậm đà với trân châu dai mềm" 
              />
            </FeatureCard>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FeatureCard
              cover={<div style={{height: 200, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span>Sushi cá hồi</span></div>}
              hoverable
            >
              <Card.Meta 
                title="Sushi Cá Hồi" 
                description="Cá hồi tươi ngon với cơm sushi đậm đà" 
              />
            </FeatureCard>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <FeatureCard
              cover={<div style={{height: 200, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><span>Matcha đá xay</span></div>}
              hoverable
            >
              <Card.Meta 
                title="Matcha Đá Xay" 
                description="Vị đắng thanh của matcha hòa quyện với kem tươi béo ngậy" 
              />
            </FeatureCard>
          </Col>
        </Row>
      </section>

      <section style={{ margin: '60px 0' }}>
        <SectionTitle level={2}>Về Chúng Tôi</SectionTitle>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <div 
              style={{
                width: '100%', 
                height: 400, 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span>Về chúng tôi</span>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Title level={3}>Quán đồ uống và đồ ăn vặt ưa thích của bạn</Title>
            <Paragraph>
              Sushi Tea là điểm đến lý tưởng cho những ai yêu thích hương vị độc đáo 
              của trà sữa và đồ ăn Nhật Bản. Chúng tôi tự hào mang đến cho khách hàng 
              những sản phẩm chất lượng cao, được chế biến từ nguyên liệu tươi ngon 
              và công thức độc quyền.
            </Paragraph>
            <Paragraph>
              Với không gian thoải mái và phục vụ tận tình, Sushi Tea cam kết mang đến 
              cho bạn trải nghiệm ẩm thực tuyệt vời mỗi ngày.
            </Paragraph>
            <Button type="primary">
              <Link to="/contact">Liên Hệ Ngay</Link>
            </Button>
          </Col>
        </Row>
      </section>
    </MainLayout>
  );
};

export default HomePage;

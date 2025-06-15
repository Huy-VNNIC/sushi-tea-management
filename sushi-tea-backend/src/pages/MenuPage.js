import React, { useEffect, useState } from 'react';
import { Typography, Alert, Card, Row, Col, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import MainLayout from '../components/layout/MainLayout';
import styled from 'styled-components';

const { Title, Text } = Typography;

const CategorySection = styled.div`
  margin-bottom: 40px;
`;

const CategoryTitle = styled(Title)`
  margin-bottom: 8px !important;
`;

const CategoryDescription = styled(Text)`
  display: block;
  margin-bottom: 24px;
  font-size: 16px;
`;

const ProductCard = styled(Card)`
  margin-bottom: 16px;
  height: 100%;
`;

const ProductImage = styled.div`
  height: 150px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #999;
`;

const ProductPrice = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: #ff4d4f;
`;

const MenuPage = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Dummy toppings data for now
  const toppings = [
    { _id: 't1', name: 'Trân Châu Đen', price: 5000 },
    { _id: 't2', name: 'Thạch Trái Cây', price: 5000 },
    { _id: 't3', name: 'Pudding', price: 7000 },
    { _id: 't4', name: 'Kem Cheese', price: 10000 },
    { _id: 't5', name: 'Thạch Cà Phê', price: 5000 },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setMenu([
        {
          category: {
            _id: 'c1',
            name: 'Trà Sữa',
            slug: 'tra-sua',
            description: 'Các loại trà sữa thơm ngon'
          },
          items: [
            {_id: 'p1', name: 'Trà Sữa Trân Châu Đường Đen', price: 35000},
            {_id: 'p2', name: 'Trà Sữa Matcha', price: 38000},
          ]
        },
        {
          category: {
            _id: 'c2',
            name: 'Sushi',
            slug: 'sushi',
            description: 'Các loại sushi tươi ngon'
          },
          items: [
            {_id: 'p3', name: 'Sushi Cá Hồi', price: 45000},
            {_id: 'p4', name: 'Sushi Bơ', price: 40000},
          ]
        }
      ]);
    }, 500);
  }, []);

  const handleAddToCart = (item) => {
    // Thêm sản phẩm vào giỏ hàng
    console.log('Thêm vào giỏ hàng:', item);
  };

  return (
    <MainLayout>
      <Title level={1} style={{ marginBottom: 24, textAlign: 'center' }}>
        Thực Đơn
      </Title>
      
      {error && (
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Text>Đang tải thực đơn...</Text>
        </div>
      ) : (
        menu.map((category) => (
          <CategorySection key={category.category._id}>
            <CategoryTitle level={2}>{category.category.name}</CategoryTitle>
            <CategoryDescription type="secondary">{category.category.description}</CategoryDescription>
            
            <Row gutter={[16, 16]}>
              {category.items.map((item) => (
                <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
                  <ProductCard
                    hoverable
                    cover={<ProductImage>{item.name}</ProductImage>}
                    actions={[
                      <Button 
                        type="primary" 
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(item)}
                      >
                        Thêm vào giỏ
                      </Button>
                    ]}
                  >
                    <Card.Meta 
                      title={item.name} 
                      description={<ProductPrice>{item.price.toLocaleString('vi-VN')}đ</ProductPrice>} 
                    />
                  </ProductCard>
                </Col>
              ))}
            </Row>
          </CategorySection>
        ))
      )}
    </MainLayout>
  );
};

export default MenuPage;

import React from 'react';
import { Checkbox, Typography, Divider } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

const ToppingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ToppingSelector = ({ toppings = [], selectedToppings = [], onChange }) => {
  const handleChange = (toppingId, checked) => {
    if (onChange) {
      if (checked) {
        onChange([...selectedToppings, toppingId]);
      } else {
        onChange(selectedToppings.filter(id => id !== toppingId));
      }
    }
  };

  if (!toppings || toppings.length === 0) {
    return null;
  }

  return (
    <>
      <Divider>Toppings</Divider>
      {toppings.map(topping => (
        <ToppingItem key={topping._id}>
          <Checkbox
            checked={selectedToppings.includes(topping._id)}
            onChange={e => handleChange(topping._id, e.target.checked)}
          >
            {topping.name}
          </Checkbox>
          <Text>{topping.price.toLocaleString('vi-VN')}đ</Text>
        </ToppingItem>
      ))}
    </>
  );
};

export default ToppingSelector;

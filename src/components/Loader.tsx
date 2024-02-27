import React from 'react';
import { Flex, Spin } from 'antd';

const Loader: React.FC = () => (
  <Flex style={{padding: 15}} justify="center" align="flex-end" gap="middle">
    <Spin spinning size="large" />
  </Flex>
);

export default Loader;
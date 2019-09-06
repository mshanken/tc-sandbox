import React from 'react';
import '../stylesheets/App.css';
import { Layout } from 'antd';
import Form from './Form';

const { Content, Header } = Layout;

function App() {
  return (
    <Layout>
      <Header />
      <Content
        style={{
          padding: '0 5em',
          marginTop: '1em',
          width: '80%'
        }}
      >
        <Form />
      </Content>
    </Layout>
  );
}

export default App;

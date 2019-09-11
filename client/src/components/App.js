import React, { Component } from 'react';
import '../stylesheets/App.css';
import { message, Button, Layout, Steps } from 'antd';
import Form from './Form';

const { Content } = Layout;
const { Step } = Steps;

const steps = [
  {
    title: 'Basic Info',
    content: <Form />
  },
  {
    title: 'Wine Info',
    content: 'wine-info'
  },
  {
    title: 'Food Info',
    content: 'food-info'
  }
];

class App extends Component {
  state = {
    current: 0
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  render() {
    const { current } = this.state;

    return (
      <Layout>
        <Content
          style={{
            padding: '1em 2em',
            margin: '0 auto',
            minWidth: '860px'
          }}
        >
          <Steps current={current}>
            {steps.map(step => (
              <Step key={step.title} title={step.title} />
            ))}
          </Steps>
          <Content
            style={{
              background: '#fff',
              padding: '2em',
              margin: '2em auto'
            }}
          >
            {steps[current].content}
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => message.success('Processing complete!')}
                >
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
            </div>
          </Content>
        </Content>
      </Layout>
    );
  }
}

export default App;

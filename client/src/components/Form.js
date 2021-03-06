import React, { Component } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Button,
  AutoComplete
} from 'antd';
import Upload from './Upload';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'canada',
    label: 'Canada',
    children: [
      {
        value: 'ontario',
        label: 'Ontario',
        children: [
          {
            value: 'toronto',
            label: 'Toronto'
          }
        ]
      }
    ]
  },
  {
    value: 'usa',
    label: 'United States',
    children: [
      {
        value: 'newyork',
        label: 'New York',
        children: [
          {
            value: 'nyc',
            label: 'New York City'
          }
        ]
      }
    ]
  }
];

class ApplicationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        sm: { span: 24 },
        md: { span: 6 }
      },
      wrapperCol: {
        sm: { span: 24 },
        md: { span: 18 }
      }
    };

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '1'
    })(
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
        <Option value="44">+44</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form {...formItemLayout} labelAlign="left" onSubmit={this.handleSubmit}>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: this.validateToNextPassword
              }
            ]
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="Confirm Password" hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: this.compareToFirstPassword
              }
            ]
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('nickname', {
            rules: [
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="City">
          {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: 'Please enter a city',
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="State">
          {getFieldDecorator('state', {
            initialValue: 'ca',
            rules: [
              {
                required: true,
                message: 'Please select a state',
                whitespace: true
              }
            ]
          })(
            <Select>
              <Option value="ca">CA</Option>
              <Option value="ma">MA</Option>
              <Option value="ny">NY</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Country / State / City">
          {getFieldDecorator('residence', {
            initialValue: ['usa', 'newyork', 'nyc'],
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Please select your residence!'
              }
            ]
          })(<Cascader options={residences} />)}
        </Form.Item>
        <Form.Item label="Phone Number">
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: 'Please input your phone number!' }
            ]
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label="Website">
          {getFieldDecorator('website', {
            rules: [{ required: true, message: 'Please input website!' }]
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          )}
        </Form.Item>
        <Form.Item
          label="Captcha"
          extra="We must make sure that your are a human."
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [
                  {
                    required: true,
                    message: 'Please input the captcha you got!'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Images">
          <Upload />
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'application' })(ApplicationForm);

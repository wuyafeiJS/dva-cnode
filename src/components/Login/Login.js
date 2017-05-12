import React, { Component } from 'react';
import { Button, Form, Icon, Input, Checkbox, Spin } from 'antd';
import styles from './Login.css';

const FormItem = Form.Item;
class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, handleToggle } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        handleToggle(values.remember);
        dispatch({ type: 'login/fetchAccess', payload: values.userName });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    let isLoad = false;
    if (loading) {
      isLoad = true;
    } else {
      isLoad = false;
    }
    const { loginData } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className={`${styles.form} login-form`}>
        <h3 style={{ color: '#f00', marginBottom: '20px' }}>{ !loginData.succeed && loginData.failedMessage }</h3>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入AccessToken' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="AccessToken" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: false,
          })(
            <Checkbox>记住我</Checkbox>
          )}
          
          <Spin spinning={isLoad} delay={500} >
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>登录</Button>
          </Spin>
        </FormItem>
      </Form>
    );
  }
}

function mapPropsToFields(props) {
  return props;
}

export default Form.create(mapPropsToFields)(NormalLoginForm);

import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'dva/router';
import styles from './NeedComment.css';

const FormItem = Form.Item;
class NeedComment extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { loginData, dispatch, currentTopicId } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const text = values.comment;
        dispatch({ type: 'Article/fetchComment', payload: { accessToken: loginData.accessToken, topicId: currentTopicId, content: text } });
      }
    });
  }
  render() {
    const { loginData, name } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { succeed } = loginData;
    if (succeed) {
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('comment', {
              rules: [{ required: true, message: '请输入留言！' }],
              initialValue: name,
            })(
              <Input placeholder={name || ''} />,
            )}
          </FormItem>
          
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              发布
            </Button>
          </FormItem>
        </Form>
      );
    } else {
      return (
        <div>您还未登录，请<Link to="login">登录</Link></div>
      );
    }
  }
}

function mapPropsToFields(props) {
  return props;
}
export default Form.create(mapPropsToFields)(NeedComment);

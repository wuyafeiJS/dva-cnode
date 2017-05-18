import React, { Component } from 'react';
import { Form, Select, Input, Button } from 'antd';
import LzEditor from 'react-lz-editor'
import styles from './PublishTopic.css';

const FormItem = Form.Item;
const Option = Select.Option;

class PublishTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: `<h1>一级标题 Head level 1</h1>`
    };
    this.receiveHtml = this.receiveHtml.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, loginData } = this.props;
    const { accessToken } = loginData;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { select, title } = values;
        const content = JSON.stringify(this.state.content);
        console.log('Received values of form: ', values, this.state.content, loginData);
        dispatch({ type: 'publish/fetchPublishTopic', payload: { accessToken, select, title, content } });
        this.props.showModal();
      }
    });
  }
  receiveHtml = (content) => {
    this.setState({ content });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className={styles.normal} layout="horizontal" onSubmit={this.handleSubmit}>
        <FormItem
          label="请选择主题类别"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('select', {
            rules: [{ required: true, message: '请选择分类' }],
          })(
            <Select placeholder="请选择">
              <Option value="ask">问答</Option>
              <Option value="share">分享</Option>
              <Option value="job">招聘</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          label="标题"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, min: 10, message: '标题最少10个字符' }],
          })(
            <Input placeholder="请输入标题，不少于10个字符" />,
          )}
        </FormItem>
        <FormItem
          label="内容"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
        >
          <LzEditor
            active={true}
            importContent={this.state.content}
            cbReceiver={this.receiveHtml}
            fullScreen={false}
            image={false}
            video={false}
            convertFormat="html"
          />
        </FormItem>
        <FormItem
          wrapperCol={{ span: 8, offset: 8 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}


export default Form.create()(PublishTopic);

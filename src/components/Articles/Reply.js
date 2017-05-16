import React, { Component } from 'react';
import { Icon, Modal } from 'antd';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import getSize from '../../utils/getSize';
import NeedComment from './NeedComment';
import transformDate from '../../utils/transformDate';
import styles from './Reply.css';

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSupported: [],
      supportNum: [],
      commentShow: [],
      name: [],
      showModal: false,
      toLoginDialog: false,
    };
  }
  componentWillMount() {
    const { replies, loginData } = this.props;
    this.supportState(replies, loginData);
  }
  componentWillReceiveProps(nextProps) {
    const { replies, loginData, isSupported, currentT } = nextProps;
    if (currentT) {
      window.scrollTo(0, currentT);
    }
    if (isSupported) {
      this.supportState(replies, loginData);
    }
  }
  supportState(replies, loginData) {
    const isSupported = replies.map((v) => {
      return v.ups.some(up => up === loginData.loginId);
    });
    const supportNum = replies.map(v => v.ups.length);
    this.setState({ isSupported, supportNum });
  }
  handleOk = () => {
    this.setState({
      showModal: false,
    });
  }
  handleCancel = () => {
    this.setState({
      toLoginDialog: false,
    });
  }
  handleLoginOk() {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/login'));
  }
  render() {
    const { replies, loginData, dispatch, currentTopicId } = this.props;
    return (
      <div className={styles.comments}>
        <p className={styles.total}>共有{ replies.length }条回复</p>
        <Modal title="提示" visible={this.state.showModal}
          onOk={this.handleOk} okText="确定"
        >
          <p>不能给自己点赞！！！</p>
        </Modal>
        <Modal title="提示" visible={this.state.toLoginDialog}
          onOk={this.handleLoginOk.bind(this)} onCancel={this.handleCancel}
          okText="登录" cancelText="取消"
        >
          <p>您还未登录！！！</p>
        </Modal>
        <ul>
          {
            replies.map((v, k) => (
              <li key={k}>
                <dl>
                  <dt>
                    <img src={v.author.avatar_url} alt={v.author.loginname} />
                  </dt>
                  <dd>{ k + 1 }楼</dd>
                </dl>
                <p className={styles.autorName}>
                  <Link to={`profile/${v.author.loginname}`} style={{ float: 'left' }}>{ v.author.loginname }</Link>
                  <span style={{ float: 'right' }}>{transformDate(v.create_at)}</span>
                </p>
                <div className={styles.details}>
                  <div className={'markdown-text'} dangerouslySetInnerHTML={{ __html: v.content }} style={{ lineHeight: '21px', float: 'left' }}></div>
                  <span style={{ float: 'right' }}>
                    <b
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        let commentShowArr = [];// 每次点击都清空数据，这样就能做到每次只显示被点击行的回复框
                        let nameArr = [];
                        nameArr[k] = `@${v.author.loginname} `;
                        commentShowArr[k] = true;
                        this.setState({ commentShow: commentShowArr, name: nameArr });
                      }}
                    >回复</b>{'   '}
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={e => {
                        e.stopPropagation();
                        if (loginData.succeed) {
                          if (v.author.loginname !== loginData.loginName) {
                            const { scrollT } = getSize();
                            dispatch({ type: 'Article/recordArticleScrollT', payload: { scrollT, topicId: currentTopicId } })
                            dispatch({ type: 'Article/switchSupport', payload: { accessToken: loginData.accessToken, replyId: v.id, index: k } });
                          } else {
                            this.setState({ showModal: true });
                          }
                        } else {
                          this.setState({ toLoginDialog: true });
                        }
                      }}
                    >
                      <Icon type="like" style={{ color: this.state.isSupported[k] ? '#f00' : '#000' }} />
                      { this.state.supportNum[k] || 0 }
                    </span>
                  </span>
                </div>
                { this.state.commentShow[k] && <NeedComment {...({ loginData, dispatch, currentTopicId })} name={this.state.name[k]} /> }
              </li>
            ))
          }
        </ul>
        <div className={styles.loginPart}>
          <p>留言区：</p>
          <NeedComment {...({ loginData, dispatch, currentTopicId })} />
        </div>
      </div>
    );
  }
}




export default Reply;

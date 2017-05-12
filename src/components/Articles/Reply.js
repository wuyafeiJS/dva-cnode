import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'dva/router';
import NeedComment from './NeedComment';
import transformDate from '../../utils/transformDate';
import styles from './Reply.css';

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentShow: [],
      name: [],
    };
  }
  render() {
    const { replies, loginData, dispatch, currentTopicId } = this.props;
    console.log(loginData)
    return (
      <div className={styles.comments}>
        <p className={styles.total}>共有{ replies.length }条回复</p>
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
                        if (loginData.loginId) {
                          
                        }
                      }}
                    >
                      <Icon type="like" />
                      { v.ups.length }
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

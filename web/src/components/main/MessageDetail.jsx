import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const messageDetailAction = require('../../actions/main/MessageDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class MessageDetail extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // 取得消息信息
        this.props.getMessageInfo();
    }

    render() {
        const {messageDetailReducer} = this.props;

        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/message', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">消息记录 - 消息详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体部分：消息信息 */}
                {messageDetailReducer.messageInfo.length > 0 &&
                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                    <div className="row detail-box-header">
                        {/* 消息信息：消息编号 */}
                        <div className="col s6 no-padding">消息编号：{this.props.match.params.id}</div>

                        {/* 消息信息：发送时间 */}
                        <div className="col s6 no-padding right-align">
                            <span className="grey-text">发送时间：{formatUtil.getDateTime(messageDetailReducer.messageInfo[0].created_on)}</span>
                        </div>
                    </div>

                    <div className="col s12 grey-text">
                        {/** 消息 */}
                        <div className="row">
                            {/** 消息图标 消息类型 */}
                            <div className="col s-percent-10 no-padding">
                                <div className="col s4">
                                    <i className="mdi mdi-comment-processing-outline blue-text text-lighten-1 fz20"/>
                                </div>
                                <div className="col s8 right-align margin-top3 no-padding blue-font">
                                    【{sysConst.MESSAGE_TYPE[messageDetailReducer.messageInfo[0].type-1].label}】
                                </div>
                            </div>
                            {/** 消息内容 */}
                            <div className="col s-percent-90 word-wrap margin-top3">{messageDetailReducer.messageInfo[0].content}</div>
                        </div>

                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 用户 电话 */}
                        <div className="row">
                            {/* 用户 */}
                            <div className="col s10 right-align">
                                <i className="mdi mdi-account-outline blue-font fz20"/>
                                <span className="margin-left20">{messageDetailReducer.messageInfo[0].user_name}</span>
                            </div>

                            {/* 电话 */}
                            <div className="col s2 right-align">
                                <i className="mdi mdi-cellphone blue-font fz20"/>
                                <span className="margin-left20">{messageDetailReducer.messageInfo[0].phone}</span>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messageDetailReducer: state.MessageDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getMessageInfo: () => {
        dispatch(messageDetailAction.getMessageInfo(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetail)

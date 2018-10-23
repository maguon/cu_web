import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const messageDetailAction = require('../../actions/main/MessageDetailAction');
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
                <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                    <div className="row detail-box-header vc-center">
                        {/* 消息信息：消息编号 */}
                        <div className="col s6">消息编号：{this.props.match.params.id}</div>

                        {/* 消息信息：发送时间 */}
                        <div className="col s6 right-align">
                            <span className="grey-text">发送时间：{formatUtil.getDateTime(messageDetailReducer.messageCreateOn)}</span>
                        </div>
                    </div>

                    <div className="col s12 grey-text">

                        {/** 消息名称 */}
                        <div className="row">
                            <div className="col s12 center blue-font fz18">{messageDetailReducer.messageName}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 车牌 用户 电话 */}
                        <div className="row">
                            {/* 车牌 */}
                            <div className="col s4">
                                <i className="mdi mdi-car blue-text text-lighten-1 fz20"/>
                                <span className="margin-left30 blue-font">{messageDetailReducer.plateNum}</span>
                            </div>

                            {/* 用户 */}
                            <div className="col s6 right-align">
                                <i className="mdi mdi-account-outline fz20"/>
                                <span className="margin-left20">{messageDetailReducer.bindUser}</span>
                            </div>

                            {/* 电话 */}
                            <div className="col s2 right-align">
                                <i className="mdi mdi-cellphone fz20"/>
                                <span className="margin-left20">{messageDetailReducer.phone}</span>
                            </div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 消息内容 */}
                        <div className="row">
                            <div className="col s-percent-4"><i className="mdi mdi-comment-processing-outline blue-text text-lighten-1 fz20"/></div>
                            <div className="col s-percent-96 word-wrap margin-top3">{messageDetailReducer.messageContent}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 地址 */}
                        <div className="row">
                            <div className="col s-percent-4"><i className="mdi mdi-map-marker-outline orange-text text-lighten-1 fz20"/></div>
                            <div className="col s-percent-96 word-wrap margin-top3">{messageDetailReducer.messageAddress}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 图片显示 */}
                        <div className="row">
                            <div className="col s12">TODO IMG LIST</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 发送人 */}
                        <div className="row">
                            <div className="col s12 right-align blue-font">扫描交警：{messageDetailReducer.messageSuperviseName}</div>
                        </div>

                    </div>
                </div>
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

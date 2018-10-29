import React from 'react';
import {connect} from 'react-redux';

const formatUtil = require('../../util/FormatUtil');

class MessageInfoModal extends React.Component {

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
        $('.modal').modal();
    }

    render() {
        const {messageDetailReducer, closeModal} = this.props;

        return (
            <div>
                {/* 标题部分 */}
                <div id="messageModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">消息详情</div>

                    {/** Modal主体 */}
                    <div className="modal-content white grey-text">

                        {/** 消息编号 消息名称 */}
                        <div className="row">
                            <div className="col s12 fz14">消息编号：{messageDetailReducer.messageId}</div>
                            <div className="col s12 center blue-font fz18">{messageDetailReducer.messageName}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 消息时间 */}
                        <div className="row">
                            <div className="col s-percent-4"><i className="mdi mdi-car custom-indigo fz20"/></div>
                            <div className="col s-percent-46 margin-top3 blue-font">{messageDetailReducer.plateNum}</div>
                            <div className="col s6 right-align fz14">{formatUtil.getDateTime(messageDetailReducer.messageCreateOn)}</div>
                        </div>

                        {/** 消息内容 */}
                        <div className="row">
                            <div className="col s-percent-4"><i className="mdi mdi-comment-processing-outline blue-text text-lighten-1 fz20"/></div>
                            <div className="col s-percent-96 word-wrap margin-top3">{messageDetailReducer.messageContent}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 地址 */}
                        <div className="row">
                            <div className="col s-percent-4"><i className="mdi mdi-map-marker-outline orange-text text-lighten-1 fz20"/></div>
                            <div className="col s-percent-96 word-wrap margin-top3">{messageDetailReducer.address}</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 图片显示 */}
                        <div className="row">
                            <div className="col s12">TODO IMG LIST</div>
                        </div>
                        <div className="row divider margin-left10 margin-right10"/>

                        {/** 扫描交警 */}
                        <div className="row">
                            <div className="col s12 right-align blue-font">扫描交警：{messageDetailReducer.superviseName}</div>
                        </div>
                    </div>

                    {/** Modal固定底部：确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
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

const mapDispatchToProps = () => ({
    closeModal: () => {
        $('#messageModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageInfoModal)

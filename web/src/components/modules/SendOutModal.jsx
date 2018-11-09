import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {SendOutModalActionType} from "../../actionTypes";

const sendOutModalAction = require('../../actions/modules/SendOutModalAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');

class SendOutModal extends React.Component {

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

    /**
     * 更新 退款金额
     */
    changeRefund = (event) => {
        this.props.setNewRefund(event.target.value);
    };

    /**
     * 更新 运费
     */
    changeFreight = (event) => {
        this.props.setFreight(event.target.value);
    };

    render() {
        const {sendOutModalReducer, sendOut, closeModal} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div id="sendOutModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">发货信息</div>

                    {/** Modal主体 */}
                    <div className="modal-content white grey-text text-darken-2">

                        {/* 发货信息描述 */}
                        {sendOutModalReducer.logInfo.length > 0 &&
                        <div className="col s12 padding-left20 padding-right20 margin-top10">
                            <div className="col s12 detail-box custom-grey padding-top20 padding-bottom20">
                                <div className="col s12">{sendOutModalReducer.logInfo[0].product_des}</div>
                                <div className="col s12 margin-top10 dotted-line margin-left10 margin-right10"/>
                                <div className="col s12 margin-top10">
                                    {sendOutModalReducer.logInfo[0].recv_address} {sendOutModalReducer.logInfo[0].recv_name} {sendOutModalReducer.logInfo[0].recv_phone}
                                </div>
                            </div>
                        </div>}


                        {/* 已退款金额 TODO */}
                        <div className="col s12 padding-top20 padding-bottom10">
                            <Input s={4} label="退款金额(元)" type="number" className="right-align red-font fz16" value={sendOutModalReducer.newRefund} onChange={this.changeRefund}/>
                            <Input s={4} label="退款金额(元)" type="number" className="right-align red-font fz16" value={sendOutModalReducer.newRefund} onChange={this.changeRefund}/>
                            <Input s={4} label="运费(元)" type="number" className="right-align red-font fz16" value={sendOutModalReducer.freight} onChange={this.setFreight}/>
                        </div>

                        <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                        {/** 退款金额(元) */}
                        <div className="col s12 margin-top10">
                            <Input s={12} label="退款金额(元)" type="number" className="right-align red-font fz16" value={sendOutModalReducer.newRefund} onChange={this.changeRefund}/>
                        </div>
                    </div>

                    {/** Modal固定底部：取消/确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                        <button type="button" className="btn confirm-btn margin-left20" onClick={sendOut}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sendOutModalReducer: state.SendOutModalReducer
    }
};

const mapDispatchToProps = (dispatch) => ({






    setNewRefund: (value) => {
        dispatch(SendOutModalActionType.setNewRefund(value))
    },

    sendOut: () => {
        dispatch(sendOutModalAction.getLogCoList())
    },



    setFreight: (value) => {
        dispatch(SendOutModalActionType.setFreight(value))
    },

    closeModal: () => {
        $('#sendOutModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SendOutModal)

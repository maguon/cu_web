import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {ReSendModalActionType} from "../../actionTypes";

const reSendModalAction = require('../../actions/modules/ReSendModalAction');
const formatUtil = require('../../util/FormatUtil');
const sysConst = require('../../util/SysConst');

class ReSendModal extends React.Component {

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

    render() {
        const {reSendModalReducer, refund, closeModal} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div id="reSendModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">补发</div>

                    {/** Modal主体 */}
                    <div className="modal-content white grey-text text-darken-2">
                        {/* 申请原因 */}
                        <div className="col s12 padding-left20 padding-right20 margin-top10">
                            <div className="col s12 detail-box custom-grey padding-top20 padding-bottom20">
                                <div className="col s-percent-10 no-padding blue-font">申请原因：</div>
                                <div className="col s-percent-90 no-padding padding-left0 grey-text">{reSendModalReducer.applyReason}</div>
                            </div>
                        </div>

                        {/* 已退款金额 TODO */}
                        <div className="col s12 padding-top20 padding-bottom10">
                            <div className="col s6">已补发商品</div>
                            <div className="col s6 right-align">¥ {formatUtil.formatNumber(reSendModalReducer.refundMoney, 2)}</div>
                        </div>

                        <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                        {/** 退款金额(元) */}
                        <div className="col s12 margin-top10">
                            <Input s={12} label="退款金额(元)" type="number" className="right-align red-font fz16" value={reSendModalReducer.newRefund} onChange={this.changeRefund}/>
                        </div>
                    </div>

                    {/** Modal固定底部：取消/确定按钮 */}
                    <div className="modal-footer">
                        <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                        <button type="button" className="btn confirm-btn margin-left20" onClick={refund}>确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reSendModalReducer: state.ReSendModalReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    setNewRefund: (value) => {
        dispatch(ReSendModalActionType.setNewRefund(value))
    },
    refund: () => {
        dispatch(reSendModalAction.reSend())
    },
    closeModal: () => {
        $('#reSendModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReSendModal)

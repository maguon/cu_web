import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {MessageActionType} from '../../actionTypes';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';

const messageAction = require('../../actions/main/MessageAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class Message extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
        // 取得交警列表
        this.props.getPoliceList();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionNo('');
            this.props.setConditionPlateNum('');
            this.props.setConditionPhone('');
            this.props.setConditionBindUser('');
            this.props.changeConditionTrafficPolice('');
            this.props.setConditionStartDate('');
            this.props.setConditionEndDate('');
            this.props.changeConditionStatus('');
        }
        this.props.getMessageList();
    }

    /**
     * 更新 检索条件：消息编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：被通知车辆
     */
    changeConditionPlateNum = (event) => {
        this.props.setConditionPlateNum(event.target.value);
    };

    /**
     * 更新 检索条件：接收电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：接收用户
     */
    changeConditionBindUser = (event) => {
        this.props.setConditionBindUser(event.target.value);
    };

    /**
     * 更新 检索条件：发送时间(始)
     */
    changeConditionStartDate = (event, value) => {
        this.props.setConditionStartDate(value);
    };

    /**
     * 更新 检索条件：发送时间(始)
     */
    changeConditionEndDate = (event, value) => {
        this.props.setConditionEndDate(value);
    };

    /**
     * 查询消息记录列表
     */
    queryMessageList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getMessageList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.messageReducer.start - (this.props.messageReducer.size - 1));
        this.props.getMessageList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.messageReducer.start + (this.props.messageReducer.size - 1));
        this.props.getMessageList();
    };

    render() {
        const {messageReducer, changeConditionTrafficPolice, changeConditionStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">消息记录</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：消息编号 */}
                            <Input s={3} label="消息编号" value={messageReducer.conditionNo} onChange={this.changeConditionNo}/>

                            {/* 查询条件：被通知车辆 */}
                            <Input s={3} label="被通知车辆" value={messageReducer.conditionPlateNum} onChange={this.changeConditionPlateNum}/>

                            {/* 查询条件：接收电话 */}
                            <Input s={3} label="接收电话" type='tel' value={messageReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                            {/* 查询条件：接收用户 */}
                            <Input s={3} label="接收用户" value={messageReducer.conditionBindUser} onChange={this.changeConditionBindUser}/>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：扫描交警 */}
                            <div className="input-field col s3">
                                <Select
                                    options={messageReducer.trafficPoliceArray}
                                    onChange={changeConditionTrafficPolice}
                                    value={messageReducer.conditionTrafficPolice}
                                    isSearchable={true}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">扫描交警</label>
                            </div>

                            {/* 查询条件：发送时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="发送时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={messageReducer.conditionStartDate} onChange={this.changeConditionStartDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：发送时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="发送时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={messageReducer.conditionEndDate} onChange={this.changeConditionEndDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：是否成功 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.SUCCESS_STATUS}
                                    onChange={changeConditionStatus}
                                    value={messageReducer.conditionStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">是否成功</label>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s2 padding-left50">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 margin-left50 query-btn" onClick={this.queryMessageList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>消息编号</th>
                                <th>消息名称</th>
                                <th>被通知车辆</th>
                                <th>接收电话</th>
                                <th>接收用户</th>
                                <th>扫描交警</th>
                                <th>发送时间</th>
                                <th>是否成功</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                messageReducer.messageArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.message_name}</td>
                                                <td>{item.license_plate}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.user_name}</td>
                                                <td>{item.superviseName}</td>
                                                <td>{formatUtil.getDateTime(item.created_on)}</td>
                                                <td>{sysConst.SUCCESS_STATUS[item.status].label}</td>
                                                <td className="operation center">
                                                    <Link to={{pathname: '/message/'+ item.id}} >
                                                        <i className="mdi mdi-table-search cyan-text lighten-1"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { messageReducer.messageArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="9">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {messageReducer.start > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {messageReducer.dataSize >= messageReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        messageReducer: state.MessageReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPoliceList: () => {
        dispatch(messageAction.getPoliceList())
    },
    getMessageList: () => {
        dispatch(messageAction.getMessageList())
    },
    setStartNumber: (start) => {
        dispatch(MessageActionType.setStartNumber(start))
    },
    setConditionNo: (carNo) => {
        dispatch(MessageActionType.setConditionNo(carNo))
    },
    setConditionPlateNum: (plateNum) => {
        dispatch(MessageActionType.setConditionPlateNum(plateNum))
    },
    setConditionPhone: (phone) => {
        dispatch(MessageActionType.setConditionPhone(phone))
    },
    setConditionBindUser: (user) => {
        dispatch(MessageActionType.setConditionBindUser(user))
    },
    changeConditionTrafficPolice: (vin) => {
        dispatch(MessageActionType.setConditionTrafficPolice(vin))
    },
    setConditionStartDate: (time) => {
        dispatch(MessageActionType.setConditionStartDate(time))
    },
    setConditionEndDate: (time) => {
        dispatch(MessageActionType.setConditionEndDate(time))
    },
    changeConditionStatus: (status) => {
        dispatch(MessageActionType.setConditionStatus(status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Message)

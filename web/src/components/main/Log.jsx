import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {LogActionType} from '../../actionTypes';
import {NewLogModal} from '../modules/index';

const commonAction = require('../../actions/main/CommonAction');
const newLogModalAction = require('../../actions/modules/NewLogModalAction');
const logAction = require('../../actions/main/LogAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class Log extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
        this.props.getLogCoList();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionNo('');
            this.props.setConditionOrder('');
            this.props.changeConditionLogStatus({value: 0, label: "待发货"});
            this.props.changeConditionLogCo(null);
            this.props.setConditionLogNum('');
            this.props.setConditionRecvName('');
            this.props.setConditionRecvPhone('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.setConditionUpdatedOnStart('');
            this.props.setConditionUpdatedOnEnd('');
        }
        this.props.getLogList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：关联订单
     */
    changeConditionOrder = (event) => {
        this.props.setConditionOrder(event.target.value);
    };

    /**
     * 更新 检索条件：物流编号
     */
    changeConditionLogNum = (event) => {
        this.props.setConditionLogNum(event.target.value);
    };

    /**
     * 更新 检索条件：收货人
     */
    changeConditionRecvName = (event) => {
        this.props.setConditionRecvName(event.target.value);
    };

    /**
     * 更新 检索条件：收货电话
     */
    changeConditionRecvPhone = (event) => {
        this.props.setConditionRecvPhone(event.target.value);
    };

    /**
     * 更新 检索条件：创建时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：创建时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 更新 检索条件：发货时间(始)
     */
    changeConditionUpdatedOnStart = (event, value) => {
        this.props.setConditionUpdatedOnStart(value);
    };

    /**
     * 更新 检索条件：发货时间(始)
     */
    changeConditionUpdatedOnEnd = (event, value) => {
        this.props.setConditionUpdatedOnEnd(value);
    };

    /**
     * 查询消息记录列表
     */
    queryLogList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getLogList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.logReducer.start - (this.props.logReducer.size - 1));
        this.props.getLogList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.logReducer.start + (this.props.logReducer.size - 1));
        this.props.getLogList();
    };

    /**
     * 显示 新增发货信息
     */
    showAddLog = () => {
        this.props.initModalData();
        $('#newLogModal').modal('open');
    };

    render() {
        const {logReducer, commonReducer, changeConditionLogCo, changeConditionLogStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">发货管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：发货编号 关联订单 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={6} label="发货编号" value={logReducer.conditionNo} onChange={this.changeConditionNo}/>
                                <Input s={6} label="关联订单" value={logReducer.conditionOrder} onChange={this.changeConditionOrder}/>
                            </div>

                            {/* 查询条件：发货状态 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.LOG_STATUS}
                                    onChange={changeConditionLogStatus}
                                    value={logReducer.conditionLogStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">发货状态</label>
                            </div>

                            {/* 查询条件：快递公司 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={commonReducer.logCoArray}
                                    onChange={changeConditionLogCo}
                                    value={logReducer.conditionLogCo}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">快递公司</label>
                            </div>

                            {/* 查询条件：物流编号 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="物流编号" value={logReducer.conditionLogNum} onChange={this.changeConditionLogNum}/>

                            </div>

                            {/* 查询条件：收货人 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="收货人" value={logReducer.conditionRecvName} onChange={this.changeConditionRecvName}/>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：创建时间(始) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="创建时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION} value={logReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart}/>
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：创建时间(终) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="创建时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION} value={logReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd}/>
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：发货时间(始) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="发货时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION} value={logReducer.conditionUpdatedOnStart} onChange={this.changeConditionUpdatedOnStart}/>
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：发货时间(终) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="发货时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION} value={logReducer.conditionUpdatedOnEnd} onChange={this.changeConditionUpdatedOnEnd}/>
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：收货电话 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="收货电话" value={logReducer.conditionRecvPhone} onChange={this.changeConditionRecvPhone}/>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryLogList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 add-btn" onClick={this.showAddLog}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">

                        <div className="divider custom-divider"/>
                        <table className="fixed-table bordered striped">
                            <thead className="blue-grey lighten-5">
                            <tr className="grey-text text-darken-2">
                                <th>发货编号</th>
                                <th>关联订单</th>
                                <th>快递公司</th>
                                <th>物流编号</th>
                                <th>运费</th>
                                <th>收货人</th>
                                <th>收货电话</th>
                                <th className="center">创建时间</th>
                                <th className="center">发货时间</th>
                                <th className="center">发货状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                logReducer.logArray.map(function (item) {
                                    return (
                                        <tr className="grey-text text-darken-1">
                                            <td>{item.id}</td>
                                            <td>{item.order_id}</td>
                                            <td>{item.company_name}</td>
                                            <td>{item.log_num}</td>
                                            <td>{formatUtil.formatNumber(item.total_freight,2)}</td>
                                            <td>{item.recv_name}</td>
                                            <td>{item.recv_phone}</td>
                                            <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                            <td className="center">{formatUtil.getDateTime(item.updated_on)}</td>
                                            <td className={`center ${item.status === 0 ?"red-font":""}`}>{sysConst.LOG_STATUS[item.status].label}</td>
                                            <td className="operation center">
                                                <Link to={{pathname: '/log/' + item.id}}>
                                                    <i className="mdi mdi-table-search light-blue-text"/>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            {logReducer.logArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="11">暂无数据</td>
                            </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {logReducer.start > 0 && logReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {logReducer.dataSize >= logReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
                <NewLogModal/>
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
        logReducer: state.LogReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLogCoList: () => {
        dispatch(commonAction.getLogCoList())
    },
    getLogList: () => {
        dispatch(logAction.getLogList())
    },
    setStartNumber: (start) => {
        dispatch(LogActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(LogActionType.setConditionNo(value))
    },
    setConditionOrder: (value) => {
        dispatch(LogActionType.setConditionOrder(value))
    },
    changeConditionLogCo: (value) => {
        dispatch(LogActionType.setConditionLogCo(value))
    },
    changeConditionLogStatus: (value) => {
        dispatch(LogActionType.setConditionLogStatus(value))
    },
    setConditionLogNum: (value) => {
        dispatch(LogActionType.setConditionLogNum(value))
    },
    setConditionRecvName: (value) => {
        dispatch(LogActionType.setConditionRecvName(value))
    },
    setConditionRecvPhone: (value) => {
        dispatch(LogActionType.setConditionRecvPhone(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(LogActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(LogActionType.setConditionCreatedOnEnd(value))
    },
    setConditionUpdatedOnStart: (value) => {
        dispatch(LogActionType.setConditionUpdatedOnStart(value))
    },
    setConditionUpdatedOnEnd: (value) => {
        dispatch(LogActionType.setConditionUpdatedOnEnd(value))
    },
    initModalData: () => {
        dispatch(newLogModalAction.initData())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Log)

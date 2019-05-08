import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {FeedBackActionType} from '../../actionTypes';

const feedBackAction = require('../../actions/main/FeedBackAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class FeedBack extends React.Component {

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
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionNo('');
            this.props.setConditionOrderId('');
            this.props.setConditionUser('');
            this.props.setConditionPhone('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.setConditionUpdatedOnStart('');
            this.props.setConditionUpdatedOnEnd('');
            this.props.changeConditionStatus(null);
        }
        this.props.getFeedBackList();
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
    changeConditionOrderId = (event) => {
        this.props.setConditionOrderId(event.target.value);
    };


    /**
     * 更新 检索条件：申请人
     */
    changeConditionUser = (event) => {
        this.props.setConditionUser(event.target.value);
    };

    /**
     * 更新 检索条件：手机
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：申请时间(始)
     */
    changeConditionStartDate = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：申请时间(始)
     */
    changeConditionEndDate = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 更新 检索条件：处理时间(始)
     */
    changeConditionUpdatedOnStart = (event, value) => {
        this.props.setConditionUpdatedOnStart(value);
    };

    /**
     * 更新 检索条件：处理时间(始)
     */
    changeConditionUpdatedOnEnd = (event, value) => {
        this.props.setConditionUpdatedOnEnd(value);
    };

    /**
     * 查询绑定车辆列表
     */
    queryFeedBackList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getFeedBackList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.feedBackReducer.start - (this.props.feedBackReducer.size - 1));
        this.props.getFeedBackList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.feedBackReducer.start + (this.props.feedBackReducer.size - 1));
        this.props.getFeedBackList();
    };

    render() {
        const {feedBackReducer, changeConditionStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">售后管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：售后编号 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="售后编号" value={feedBackReducer.conditionNo} onChange={this.changeConditionNo}/>
                            </div>

                            {/* 查询条件：关联订单 */}
                            <div className="custom-input-field col s-percent-40">
                                <Input s={12} label="关联订单" value={feedBackReducer.conditionOrderId} onChange={this.changeConditionOrderId}/>
                            </div>

                            {/* 查询条件：申请人 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="申请人" value={feedBackReducer.conditionUser} onChange={this.changeConditionUser}/>
                            </div>

                            {/* 查询条件：手机 */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="手机" value={feedBackReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：申请时间(始) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="申请时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={feedBackReducer.conditionCreatedOnStart} onChange={this.changeConditionStartDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：申请时间(终) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="申请时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={feedBackReducer.conditionCreatedOnEnd} onChange={this.changeConditionEndDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：处理时间(始) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="处理时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={feedBackReducer.conditionUpdatedOnStart} onChange={this.changeConditionUpdatedOnStart} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：处理时间(终) */}
                            <div className="custom-input-field col s-percent-20">
                                <Input s={12} label="处理时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={feedBackReducer.conditionUpdatedOnEnd} onChange={this.changeConditionUpdatedOnEnd} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：处理状态 */}
                            <div className="input-field col s-percent-20">
                                <Select
                                    options={sysConst.FEED_BACK_STATUS}
                                    onChange={changeConditionStatus}
                                    value={feedBackReducer.conditionStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                    backspaceRemovesValue={false}
                                />
                                <label className="active">处理状态</label>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryFeedBackList}>
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
                                <th>售后编号</th>
                                <th>关联订单</th>
                                <th>支付金额</th>
                                <th>申请人</th>
                                <th className="center">手机</th>
                                <th className="center">申请时间</th>
                                <th className="center">处理状态</th>
                                <th className="center">处理时间</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {feedBackReducer.feedBackArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.order_id}</td>
                                        <td>{formatUtil.formatNumber(item.total_price, 2)}</td>
                                        <td>{item.user_name}</td>
                                        <td className="center">{item.phone}</td>
                                        <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                        <td className={`center ${item.status === 0 ? "red-font" : ""}`}>{sysConst.FEED_BACK_STATUS[item.status].label}</td>
                                        <td className="center">{formatUtil.getDateTime(item.updated_on)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/feed_back/' + item.id}}>
                                                <i className="mdi mdi-table-search light-blue-text"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            { feedBackReducer.feedBackArray.length === 0 &&
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
                            {feedBackReducer.start > 0 && feedBackReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {feedBackReducer.dataSize >= feedBackReducer.size &&
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
        feedBackReducer: state.FeedBackReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getFeedBackList: () => {
        dispatch(feedBackAction.getFeedBackList())
    },
    setStartNumber: (start) => {
        dispatch(FeedBackActionType.setStartNumber(start))
    },
    setConditionNo: (value) => {
        dispatch(FeedBackActionType.setConditionNo(value))
    },
    setConditionOrderId: (value) => {
        dispatch(FeedBackActionType.setConditionOrderId(value))
    },
    setConditionUser: (user) => {
        dispatch(FeedBackActionType.setConditionUser(user))
    },
    setConditionPhone: (phone) => {
        dispatch(FeedBackActionType.setConditionPhone(phone))
    },
    setConditionCreatedOnStart: (time) => {
        dispatch(FeedBackActionType.setConditionCreatedOnStart(time))
    },
    setConditionCreatedOnEnd: (time) => {
        dispatch(FeedBackActionType.setConditionCreatedOnEnd(time))
    },
    setConditionUpdatedOnStart: (time) => {
        dispatch(FeedBackActionType.setConditionUpdatedOnStart(time))
    },
    setConditionUpdatedOnEnd: (time) => {
        dispatch(FeedBackActionType.setConditionUpdatedOnEnd(time))
    },
    changeConditionStatus: (status) => {
        dispatch(FeedBackActionType.setConditionStatus(status))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack)
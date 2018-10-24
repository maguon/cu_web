import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import {UserCarActionType} from '../../actionTypes';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';

const userCarAction = require('../../actions/main/UserCarAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class UserCar extends React.Component {

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
            this.props.setConditionPlateNum('');
            this.props.setConditionVin('');
            this.props.changeConditionBindStatus('');
            this.props.setConditionBindUser('');
            this.props.setConditionPhone('');
            this.props.setConditionBindTimeStart('');
            this.props.setConditionBindTimeEnd('');
        }
        this.props.getUserCarList();
        // $('.datepicker').pickadate(sysConst.DATE_PICKER_OPTION);
    }

    /**
     * 更新 检索条件：车辆编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：车辆号码
     */
    changeConditionPlateNum = (event) => {
        this.props.setConditionPlateNum(event.target.value);
    };

    /**
     * 更新 检索条件：车辆识别码
     */
    changeConditionVin = (event) => {
        this.props.setConditionVin(event.target.value);
    };

    /**
     * 更新 检索条件：绑定用户
     */
    changeConditionBindUser = (event) => {
        this.props.setConditionBindUser(event.target.value);
    };

    /**
     * 更新 检索条件：电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：绑定时间(始)
     */
    changeConditionStartDate = (event, value) => {
        this.props.setConditionBindTimeStart(value);
    };

    /**
     * 更新 检索条件：绑定时间(始)
     */
    changeConditionEndDate = (event, value) => {
        this.props.setConditionBindTimeEnd(value);
    };

    /**
     * 查询绑定车辆列表
     */
    queryUserCarList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getUserCarList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.userCarReducer.start - (this.props.userCarReducer.size - 1));
        this.props.getUserCarList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.userCarReducer.start + (this.props.userCarReducer.size - 1));
        this.props.getUserCarList();
    };

    render() {
        const {userCarReducer, changeConditionBindStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">绑定车辆管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：车辆编号 */}
                            <Input s={3} label="车辆编号" value={userCarReducer.conditionNo} onChange={this.changeConditionNo}/>

                            {/* 查询条件：车牌号码 */}
                            <Input s={3} label="车牌号码" value={userCarReducer.conditionPlateNum} onChange={this.changeConditionPlateNum}/>

                            {/* 查询条件：车辆识别码 */}
                            <Input s={3} label="车辆识别码" value={userCarReducer.conditionVin} onChange={this.changeConditionVin}/>

                            {/* 查询条件：绑定状态 */}
                            <div className="input-field col s3">
                                <Select
                                    options={sysConst.BIND_STATUS}
                                    onChange={changeConditionBindStatus}
                                    value={userCarReducer.conditionBindStatus}
                                    isSearchable={false}
                                    placeholder={"请选择"}
                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                    isClearable={true}
                                />
                                <label className="active">绑定状态</label>
                            </div>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：绑定用户 */}
                            <Input s={3} label="绑定用户" value={userCarReducer.conditionBindUser} onChange={this.changeConditionBindUser}/>

                            {/* 查询条件：联系电话 */}
                            <Input s={3} label="联系电话" type='tel' value={userCarReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                            {/* 查询条件：绑定时间(始) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="绑定时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={userCarReducer.conditionBindTimeStart} onChange={this.changeConditionStartDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：绑定时间(终) */}
                            <div className="input-field col s3 custom-input-field">
                                <Input s={12} label="绑定时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={userCarReducer.conditionBindTimeEnd} onChange={this.changeConditionEndDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/*<div className="input-field col s3">*/}
                                {/*<input type="text" className="datepicker" value={userCarReducer.conditionBindTimeEnd} onChange={this.changeConditionEndDate}/>*/}
                                {/*<i className="mdi data-icon mdi-table-large"/>*/}
                                {/*<label id="bind_time_end">绑定时间(终)</label>*/}
                            {/*</div>*/}

                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryUserCarList}>
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
                                <th>车辆编号</th>
                                <th>车牌号码</th>
                                <th>车辆识别码</th>
                                <th>发动机号码</th>
                                <th>绑定手机</th>
                                <th>绑定用户</th>
                                <th>绑定时间</th>
                                <th>绑定状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                userCarReducer.userCarArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.license_plate}</td>
                                                <td>{item.vin}</td>
                                                <td>{item.engine_num}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.user_name}</td>
                                                <td>{formatUtil.getDateTime(item.created_on)}</td>
                                                <td>{sysConst.BIND_STATUS[item.status].label}</td>
                                                <td className="operation center">
                                                    <Link to={{pathname: '/user_car/'+ item.id}} >
                                                        <i className="mdi mdi-table-search cyan-text lighten-1"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { userCarReducer.userCarArray.length === 0 &&
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
                            {userCarReducer.start > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {userCarReducer.dataSize >= userCarReducer.size &&
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
        userCarReducer: state.UserCarReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserCarList: () => {
        dispatch(userCarAction.getUserCarList())
    },
    setStartNumber: (start) => {
        dispatch(UserCarActionType.setStartNumber(start))
    },
    setConditionNo: (carNo) => {
        dispatch(UserCarActionType.setConditionNo(carNo))
    },
    setConditionPlateNum: (plateNum) => {
        dispatch(UserCarActionType.setConditionPlateNum(plateNum))
    },
    setConditionVin: (vin) => {
        dispatch(UserCarActionType.setConditionVin(vin))
    },
    changeConditionBindStatus: (status) => {
        dispatch(UserCarActionType.setConditionBindStatus(status))
    },
    setConditionBindUser: (user) => {
        dispatch(UserCarActionType.setConditionBindUser(user))
    },
    setConditionPhone: (phone) => {
        dispatch(UserCarActionType.setConditionPhone(phone))
    },
    setConditionBindTimeStart: (time) => {
        dispatch(UserCarActionType.setConditionBindTimeStart(time))
    },
    setConditionBindTimeEnd: (time) => {
        dispatch(UserCarActionType.setConditionBindTimeEnd(time))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCar)

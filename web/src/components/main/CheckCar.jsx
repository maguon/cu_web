import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {CheckCarActionType} from '../../actionTypes';

const checkCarAction = require('../../actions/main/CheckCarAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class Message extends React.Component {

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
            this.props.setConditionPhone('');
            this.props.setConditionPoliceNm('');
            this.props.setConditionStartDate('');
            this.props.setConditionEndDate('');
        }
        this.props.getCheckCarList();
    }

    /**
     * 更新 检索条件：编号
     */
    changeConditionNo = (event) => {
        this.props.setConditionNo(event.target.value);
    };

    /**
     * 更新 检索条件：车牌号
     */
    changeConditionPlateNum = (event) => {
        this.props.setConditionPlateNum(event.target.value);
    };

    /**
     * 更新 检索条件：车主电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：交警
     */
    changeConditionPoliceNm = (event) => {
        this.props.setConditionPoliceNm(event.target.value);
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
    queryCheckCarList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getCheckCarList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.checkCarReducer.start - (this.props.checkCarReducer.size - 1));
        this.props.getCheckCarList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.checkCarReducer.start + (this.props.checkCarReducer.size - 1));
        this.props.getCheckCarList();
    };

    render() {
        const {checkCarReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">违停扫码管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">

                        {/* 查询条件：第一行 */}
                        <div>
                            {/* 查询条件：编号 */}
                            <Input s={4} label="编号" value={checkCarReducer.conditionNo} onChange={this.changeConditionNo}/>

                            {/* 查询条件：车牌号 */}
                            <Input s={4} label="车牌号" value={checkCarReducer.conditionPlateNum} onChange={this.changeConditionPlateNum}/>

                            {/* 查询条件：车主电话 */}
                            <Input s={4} label="车主电话" type='tel' value={checkCarReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                        </div>

                        {/* 查询条件：第二行 */}
                        <div>
                            {/* 查询条件：交警 */}
                            <Input s={4} label="交警" value={checkCarReducer.conditionPoliceNm} onChange={this.changeConditionPoliceNm}/>

                            {/* 查询条件：扫描时间(始) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="扫描时间(始)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={checkCarReducer.conditionStartDate} onChange={this.changeConditionStartDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>

                            {/* 查询条件：发送时间(终) */}
                            <div className="input-field col s4 custom-input-field">
                                <Input s={12} label="扫描时间(终)" type='date' options={sysConst.DATE_PICKER_OPTION}
                                       value={checkCarReducer.conditionEndDate} onChange={this.changeConditionEndDate} />
                                <span className="mdi data-icon mdi-table-large"/>
                            </div>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn margin-top40 query-btn" onClick={this.queryCheckCarList}>
                            <i className="mdi mdi-magnify"/>
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
                                <th>编号</th>
                                <th>车牌号</th>
                                <th className="ellipsis-td context-ellipsis">地址</th>
                                <th>车主电话</th>
                                <th>车主</th>
                                <th>交警</th>
                                <th className="center">扫码时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                checkCarReducer.checkCarArray.map(function (item) {
                                    return (
                                            <tr className="grey-text text-darken-1">
                                                <td>{item.id}</td>
                                                <td>{item.license_plate}</td>
                                                <td className="ellipsis-td context-ellipsis">{item.address}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.user_name}</td>
                                                <td>{item.supervise_name}</td>
                                                <td className="center">{formatUtil.getDateTime(item.created_on)}</td>
                                                <td className="center">{sysConst.CHECK_CAR_STATUS[item.status].label}</td>
                                                <td className="operation center">
                                                    <Link to={{pathname: '/check_car/'+ item.id}} >
                                                        <i className="mdi mdi-table-search light-blue-text"/>
                                                    </Link>
                                                </td>
                                            </tr>
                                    )
                                })
                            }
                            { checkCarReducer.checkCarArray.length === 0 &&
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
                            {checkCarReducer.start > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {checkCarReducer.dataSize >= checkCarReducer.size &&
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
        checkCarReducer: state.CheckCarReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCheckCarList: () => {
        dispatch(checkCarAction.getCheckCarList())
    },
    setStartNumber: (start) => {
        dispatch(CheckCarActionType.setStartNumber(start))
    },
    setConditionNo: (carNo) => {
        dispatch(CheckCarActionType.setConditionNo(carNo))
    },
    setConditionPlateNum: (plateNum) => {
        dispatch(CheckCarActionType.setConditionPlateNum(plateNum))
    },
    setConditionPhone: (phone) => {
        dispatch(CheckCarActionType.setConditionPhone(phone))
    },
    setConditionPoliceNm: (policeNm) => {
        dispatch(CheckCarActionType.setConditionPoliceNm(policeNm))
    },
    setConditionStartDate: (time) => {
        dispatch(CheckCarActionType.setConditionStartDate(time))
    },
    setConditionEndDate: (time) => {
        dispatch(CheckCarActionType.setConditionEndDate(time))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Message)

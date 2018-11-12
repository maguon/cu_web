import React from 'react';
import {connect} from 'react-redux';

class CarQRCodeModal extends React.Component {

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
        const {carQRCodeModalReducer, closeModal} = this.props;
        return (
            <div id="carQRCodeModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">车辆二维码</div>

                {/** Modal主体 */}
                <div className="modal-content white blue-font">

                    <div className="row margin-bottom0 margin-left10 margin-right10">
                        {/* 基本信息：车牌号 */}
                        <div className="input-field col s6 fz18">
                            {carQRCodeModalReducer.plateNum}
                        </div>
                        {/* 基本信息：车辆编号 */}
                        <div className="input-field col s6 right-align">
                            车辆编号：{carQRCodeModalReducer.carNo}
                        </div>
                    </div>

                    <div className="row divider margin-left10 margin-right10"/>

                    {/* 基本信息：二维码图案 */}
                    <div className="row center">
                        <canvas id="canvas"/>
                    </div>
                </div>

                {/** Modal固定底部：确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn confirm-btn" onClick={closeModal}>确定</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carQRCodeModalReducer: state.CarQRCodeModalReducer
    }
};

const mapDispatchToProps = () => ({
    closeModal: () => {
        $('#carQRCodeModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CarQRCodeModal)

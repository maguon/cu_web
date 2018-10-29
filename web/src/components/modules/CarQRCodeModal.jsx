import React from 'react';
import {connect} from 'react-redux';
import QRCode from "qrcode";

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

        QRCode.toCanvas(document.getElementById('canvas'), 'sample text', {width: 270}, function (error) {
            if (error) console.error(error);
            console.log('success!');
        });

//         QRCode.toDataURL('some text', { version: 2 }, function (err, url) {
//             console.log('sucess 1 is : ', url)
//             return url;
//         });
//
//         QRCode.toDataURL('I am a pony!')
//             .then(url => {
//                 console.log('sucess 2 is : ',url)
//             })
//             .catch(err => {
//                 console.error('err 3 is : ',err)
//             });
//
// // With async/await
//         const generateQR = async text => {
//             try {
//                 console.log(await QRCode.toDataURL(text))
//             } catch (err) {
//                 console.error(err)
//             }
//         }
    }

    /**
     * 生成 车辆二维码
     */
    generateQRCode = () => {
        console.log('generateQRCode')

        return QRCode.toDataURL('I am a pony!',{ version: 2 })
            .then(url => {
                console.error('url 3 is : ', url)
            })
            .catch(err => {
                console.error('err 3 is : ', err)
            });
    };

    render() {
        const {messageDetailReducer, closeModal} = this.props;

        return (
            <div>
                {/* 标题部分 */}
                <div id="carQRCodeModal" className="modal modal-fixed-footer row">

                    {/** Modal头部：Title */}
                    <div className="modal-title center-align white-text">消息详情</div>

                    {/** Modal主体 */}
                    <div className="modal-content white grey-text">

                        <canvas id="canvas"/>

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
        $('#carQRCodeModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CarQRCodeModal)

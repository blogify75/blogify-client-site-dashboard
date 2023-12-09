import modal from './Modal.module.css';


// eslint-disable-next-line react/prop-types
const Modal = ({turn = false, btn, status="Are you sure to delete this item: ", title, action}) => {
   
    return (
        <div className={`${modal.main} ${turn ? modal.block : modal.none}`}
        >
            <div className={`${modal.container} flex`}>
                <div className={`${modal.modal} `}>
                    <div className={`${modal.modalBtn} flex_end`}>
                        <i style={{cursor:'pointer'}} onClick={() => btn(false)} className="uil uil-times"></i>
                    </div>
                    <div className={`${modal.modal_detail} flex `}>
                        <div>
                            <h5>{status}:</h5>
                            <p>{title}</p>
                        </div>
                    </div>
                    <div  className={`${modal.modalBottom} flex_end `}>
                        <p style={{cursor:'pointer'}} onClick={action}>DELETE</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
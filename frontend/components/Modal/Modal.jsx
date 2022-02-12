import { cloneElement } from 'react'
import cls from './modal.module.css'


const Modal = ({children, show, onClose, ...props}) => {
  // add classes to content div and buttons div
  if (Array.isArray(children)) {
    var content = cloneElement(children[0], {
      className: [children[0].props.className, cls.modal_content].join(' ')
    })

    var buttons = cloneElement(children[1], {
      className: [children[1].props.className, cls.modal_buttons].join(' ')
    })
  }
  else {
    var content = cloneElement(children, {
      className: [children.props.className, cls.modal_content].join(' ')
    })
  }

  // check if onClose is function
  if (typeof onClose != 'function') {
    console.error('onClose must be a function')
  }

  return (
    <div
      className={[
        show
          ? cls.active
          : null,
        cls.modal_window
        ].join(' ')
      }
      onClick={e => onClose(false)}
    >
        <div className={cls.modal_wrapper}>
          <div 
            className={cls.modal_block}
            onClick={e => e.stopPropagation()}
          >
            {content}
            {buttons ? buttons : null}
          </div>
        </div>
    </div>
  )
}


export default Modal

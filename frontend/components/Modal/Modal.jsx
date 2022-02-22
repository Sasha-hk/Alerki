import { cloneElement } from 'react'
import cls from './modal.module.css'


const Modal = ({children, show, onClose, padding = true, ...props}) => {
  // add classes to content div and buttons div
  if (Array.isArray(children)) {
    if (padding && children[0]) {
      var content = cloneElement(children[0], {
        className: [children[0].props.className, cls.modal_content].join(' ')
      })
    }
    else {
      content = children[0]
    }

    if (children[1]) {
      var buttons = cloneElement(children[1], {
        className: [children[1].props.className, cls.modal_buttons].join(' ')
      })
    }

  }
  else if (padding) {
    var content = cloneElement(children, {
      className: [children.props.className, cls.modal_content].join(' ')
    })
  }
  else {
    content = children[0]
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
            <div className={cls.modal_content_scroll_wrapper}>
              {content}
            </div>
            {buttons ? buttons : null}
          </div>
        </div>
    </div>
  )
}


export default Modal

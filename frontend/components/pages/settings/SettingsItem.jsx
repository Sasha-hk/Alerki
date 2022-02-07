import Link from 'next/link'
import cls from './settings-item.module.css'


const SettingsItem = ({name, url, active = false}) => {
  return (
    <Link href={`/settings/${url}`}>
      <div 
        className={[
          cls.settings_item,
          active
            ? cls.active
            : null
        ].join(' ')}
      >
        <div className={cls.active_indicator}></div>

        <div className={cls.settings_block}>
          <span className="text-normal">{name}</span>
        </div>
      </div>
    </Link>
  )
}


export default SettingsItem

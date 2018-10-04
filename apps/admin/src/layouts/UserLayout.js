import React from 'react'
// import DocumentTitle from 'react-document-title'
import { Icon } from 'antd'
import GlobalFooter from 'ant-design-pro/lib/GlobalFooter'
import styles from './UserLayout.less'
import logo from '../assets/logo.svg'

const copyright = (
  <div>
    Copyright <Icon type="copyright" /> 2018 React-admin-blog
  </div>
)

class UserLayout extends React.PureComponent {
  // getPageTitle() {
  //   const { routerData, location } = this.props
  //   const { pathname } = location
  //   let title = 'React admin'
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - React admin`
  //   }
  //   return title
  // }
  render() {
    const { children } = this.props
    return (
      // <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>React admin</span>
            </div>
            <div className={styles.desc}>React + Antd + Koa2 + TypeScript</div>
          </div>
          {children}
        </div>
        <GlobalFooter copyright={copyright} />
      </div>
    )
  }
}

export default UserLayout

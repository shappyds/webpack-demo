import { hello } from './hello'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import '../../common'

const Index = () => {
  return (
    <div className="root-text">{hello()}</div>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
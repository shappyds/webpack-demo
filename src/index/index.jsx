import React from 'react'
import ReactDOM from 'react-dom'
import hello from './hello'
import './index.css'
import '../../common'

const Index = () => (
  <div className="root-text">{hello()}</div>
)

ReactDOM.render(<Index />, document.getElementById('root'))

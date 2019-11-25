import React from 'react'
import ReactDOM from 'react-dom'
import '../../common'

class Index extends React.Component {

  constructor() {
    super(...arguments)
    this.state = {
      Text: null
    }
  }

  dyImport() {
    import('./text').then(
      Text => {
        this.setState({
          Text: Text.default
        })
      } 
    )
  }

  render() {
    const { Text } = this.state
    return (
      <>
        {Text ? <Text/> : null}
        <div onClick={this.dyImport.bind(this)}>{'search'}</div>
      </>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('root'))
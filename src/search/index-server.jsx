import React from 'react'
import '../../common'

class Index extends React.Component {
  constructor(...args) {
    super(args)
    this.state = {
      Text: null
    }
    this.dyImport = this.dyImport.bind(this)
  }

  dyImport() {
    import('./text.jsx').then(
      (Text) => {
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
        {Text ? <Text /> : null}
        <button type="button" onClick={this.dyImport}>search</button>
      </>
    )
  }
}

export default <Index />

import PropTypes from 'prop-types'

export const ImageComponent = ({ url, name,  }) => (
  <div style={{
    border: '1px solid white',
    borderRadius: '5px',
    margin: '5px',
    overflow: 'hidden',
  }}>
    <img src={url} width={400}/>
    <p style={{
      textAlign: 'center',
    }}>{ name }</p>
  </div>
)
ImageComponent.displayName = 'ImageComponent'
ImageComponent.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
}

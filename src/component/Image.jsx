import PropTypes from 'prop-types'

export const ImageComponent = ({ url, name,  }) => (
  <div>
    <img src={url} width={400}/>
    <p>{ name }</p>
  </div>
)
ImageComponent.displayName = 'ImageComponent'
ImageComponent.propTypes = {
  url: PropTypes.string,
  label: PropTypes.string,
}

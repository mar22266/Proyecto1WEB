import './EmptyState.css'

const EmptyState = () => {
    return (
      <div className='styles'>
        <h2>No hay posts para mostrar</h2>
        <img
          src="src/assets/images/SC.jpg"
          alt="No hay información"
          className='imageStyles'
        ></img>
      </div>
    )
  }

export default EmptyState
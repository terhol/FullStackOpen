export const Message = ({ message, isError }) => (
  <div className="splash-container">
    <h1 className={isError ? 'splash-head-negative' : 'splash-head-positive'}>{message}</h1>
  </div>
)

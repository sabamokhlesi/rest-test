import './notFoundPage.scss';
import { useHistory } from 'react-router-dom';
function NotFound() {
  const history = useHistory();
  return (
    <div className="not-found">
          <div className="not-found-text">
            Oops! Couldn't Find This page
          </div>
          <div className="not-found-btn" onClick={()=>history.push('/transactions/1')}>Back To First Page</div>
      </div>
    
  );
}

export default NotFound;
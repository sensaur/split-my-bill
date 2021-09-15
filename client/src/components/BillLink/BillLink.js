import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

const BillLink = ({ id, name, createdAt }) => {
  const FadeInDown = styled.div`animation: 2s ${keyframes`${fadeInDown}`}`;

  return (
    <div>
      <FadeInDown>
        <Link to={`/bill/${id}`} style={{ textDecoration: 'none' }}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Название:
                {' '}
                {name}
              </h5>
              <hr />
              <h6 className="card-subtitle mb-2 text-muted">
                Дата:
                {' '}
                {createdAt.substring(0, 10)}
              </h6>
            </div>
          </div>
        </Link>
      </FadeInDown>
    </div>
  );
};

export default BillLink;

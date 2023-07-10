import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackLink from '../Components/base/BackLink';

const Launch = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <div className="container">
      <BackLink
        text="Go back"
        onClick={() => navigate(-1)}
      />

      <div>
        {JSON.stringify(params)}
      </div>
    </div>
  );
}

export default Launch;

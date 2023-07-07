import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackLink from '../Components/base/BackLink';

const Launch = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <BackLink
        text="Go back"
        onClick={() => navigate(-1)}
      />

      <div>
        {JSON.stringify(params)}
      </div>
    </>
  );
}

export default Launch;
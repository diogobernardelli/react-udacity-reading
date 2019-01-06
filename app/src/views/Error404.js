import React from 'react';
import PropTypes from 'prop-types';
import { NavTop } from '../components';
import { Link } from 'react-router-dom'

const Error404 = ({ location }) => (
    <div>
        <NavTop title="Oooooooops..."
            useToobar={false}
            handleChangeCategory={() => null}
            handleChangeSort={() => null} />
        <div>
            {/* <img className="not-found-image" src="https://i.ibb.co/jfC8306/404.jpg"></img> */}
            <img className="not-found-image" src="/404.jpg"></img>
            <Link to="/" className="back-home">Retornar para a página inicial</Link>
        </div>
    </div>
)

Error404.defaultProps = {
    location: {}
};

Error404.propTypes = {
    location: PropTypes.object.isRequired
};

export default Error404
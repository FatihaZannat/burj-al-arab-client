import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from '../App';

const Private = ({ children, ...rest }) => {
    const [loggedInUser, useLoggedInUser] = useContext(userContext)
    return (
            <Route
            {...rest}
            render={({ location }) =>
            loggedInUser.name ? (
                children
            ) : (
                <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
                />
            )
            }
        />
    );
};

export default Private;
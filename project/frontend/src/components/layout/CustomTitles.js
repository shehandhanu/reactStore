import React from 'react'
import { Helmet } from 'react-helmet'

const CustomTitles = ({ title }) => {
    return (
        <Helmet>

            <title>{`${title} - React Store`}</title>

        </Helmet>
    )
}

export default CustomTitles

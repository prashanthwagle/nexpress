import React from 'react'
import Head from 'next/head'
import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    justify-content: center;
`;

function Layout(props) {
    return (
        <Wrapper>
            <div style={{width:"80vw"}}>
                <Head>
                    <title>Yeti: Dashboard</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                {props.children}
            </div>
        </Wrapper>
    )
}

export default Layout

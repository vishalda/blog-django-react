import Base from '../components/Base';
import React from 'react';
import {HomePageSvg} from "../components/svg";

class Home extends React.Component{
    render(){
        return(
            <div>
                <Base />
                <HomePageSvg />
            </div>
        );
    }
};

export default Home;
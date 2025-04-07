import Layout from "../Components/Layout";
import React from "react";
import BudgetFeed from '../Components/BudgetComponents/BudgetFeed'



const HomePage =()=>{
    return(
        <Layout>
           <BudgetFeed/>
        </Layout>
    )
}

export default HomePage;
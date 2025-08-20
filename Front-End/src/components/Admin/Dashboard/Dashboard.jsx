import React from "react";
import FormComparisonChart from "../Dashboard/FormComparisonChart";
import TopAcademicFieldsTable from "./TopAcademicFieldsTable";

const Dashboard = () => {
  return (
    <div className=" min-h-full ">
      <FormComparisonChart />
      <TopAcademicFieldsTable />
    </div>
  );
};

export default Dashboard;

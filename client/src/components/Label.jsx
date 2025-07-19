import React from "react";
import { default as api } from '../store/apiSlice';

const Label = () => {
  const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
  let Transactions;

  

  if(isFetching){
      Transactions = <div>Fetching...</div>;
  }else if(isSuccess){
      Transactions = data.map((v, i) => <LabelComponent key={i} data={v}></LabelComponent>);
  }else if(isError){
      Transactions = <div>Error</div>
  }

return (
  <>
      {Transactions}
  </>
)
};

export default Label;

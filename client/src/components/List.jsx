import React from 'react';
import 'boxicons';
import { useGetLabelsQuery, useDeleteTransactionMutation } from '../store/apiSlice';

export default function List() {
  const { data, isFetching, isSuccess, isError, refetch } = useGetLabelsQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handlerClick = async (e) => {
    if (!e.target.dataset.id) return;
    await deleteTransaction({ _id: e.target.dataset.id });
    console.log("Deleted, refetching...");
    refetch(); 
  };

  console.log("Labels data:", data);

  let Transactions;
  if (isFetching) {
    Transactions = <div className='text-white'>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((v, i) => (
      <Transaction key={i} category={v} handler={handlerClick} />
    ));
  } else if (isError) {
    Transactions = <div className='text-white'>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className='py-4 font-bold text-xl text-white'>History</h1>
      {Transactions}
    </div>
  );
}

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className='px-3' onClick={handler}>
        <box-icon
          data-id={category._id ?? ''}
          color={category.color ?? "#e5e5e5"}
          size="15px"
          name="trash"
        ></box-icon>
      </button>
      <span className='block w-full'>{category.name ?? ''}</span>
    </div>
  );
}

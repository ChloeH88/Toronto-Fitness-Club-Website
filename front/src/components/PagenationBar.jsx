// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import SubscriptionBox from './subscriptions/SubscriptionBox';

function PagenationBar({handlePageClick, pageCount}) {
    return (
    <ReactPaginate className='flex'
        breakLabel="..."
        nextLabel={<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Next</button>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Previous</button>}
        renderOnZeroPageCount={null}
     />)
}

export default PagenationBar;
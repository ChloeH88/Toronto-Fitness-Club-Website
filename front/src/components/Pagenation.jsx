// For Pagenation
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import SubscriptionBox from './subscriptions/SubscriptionBox';
import PagenationBar from './PagenationBar';


function SubscriptionItems({ currentItems }) {
  return (
    <div className='flex'>
      {currentItems.map((item) => (
        <SubscriptionBox key={item.id}
        billingCycle={item.billing_cycle}
        price={item.price}
        />
      ))}
    </div>
  );
}

function PaginatedItems({ items, itemsPerPage, type }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  if (type === 'subscription') {
    return (
        <>
          <SubscriptionItems currentItems={currentItems} />
          <PagenationBar handlePageClick={handlePageClick} pageCount={pageCount} />
        </>
      );
  }
  
  
}

export default PaginatedItems;
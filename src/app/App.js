import React, {useState} from 'react';
import './App.css';
// import {mockData} from './testData';
import {TableRow} from './TableRow';

function App(appData) {
  let { data, isServer } = appData || {};
  // data = mockData;
  let newsArray = data.hits;
  const [firstRender, setfirstRender] = useState(false);
  const [newsData, setnewsData] = useState(newsArray || []);

  if (isServer ) {
    data = JSON.parse(data);
  }
  let ChartComponent = "";

  // handling the hide id locally
  const handleHideClick = () => {
      let hideList = localStorage.getItem('hideList');
      if (hideList) {
        hideList = hideList.split(',');
        if (firstRender) {
          debugger;
          const updatedData = newsData.filter(function(item) {
            return !hideList.includes(item.objectID); 
          });
          setnewsData(updatedData);
        } else {
          newsArray = newsArray.filter(function(item) {
            return !hideList.includes(item.objectID); 
          });
        }
     }
  }

  // Updating the vote count locally
  const voteUpdateLocal = () => {
    let voteCount = localStorage.getItem('voteCount');
    if (voteCount) {
      voteCount = JSON.parse(voteCount);
      newsArray = newsArray.map(item => {
        return {
          ...item,
          points: voteCount[item.objectID] ? voteCount[item.objectID] : item.points
        };
      });
    }
  }

  if (!isServer) {
     // Importing chart component on CSR
    ChartComponent = React.lazy(() => import('./Chart'));

    if (!firstRender) {
      handleHideClick();
      voteUpdateLocal();
      setnewsData(newsArray);
      setfirstRender(true);
    }
  }

  return (
    <div className="app">
    <table className="newsTable">
      <thead className="tableHeader">
        <tr>
          <td className="headerCell">Comments</td>
          <td className="headerCell">Vote Count</td>
          <td className="headerCell">UpVote</td>
          <td className="headerCell newsHeader">News Details</td>
        </tr>
      </thead>
      <tbody>
        {newsData.map((row)=> {
          return (
            <TableRow rowData={row} key={row.objectID} id={row.objectID} callHideItem={() => handleHideClick()}/>
          )
        })}
      </tbody>
    </table>
    <div className="prevNext">
      {!isServer && data.page ? 
      <span
        className="cursorPointer"
        onClick={() =>{ window.location.assign(`${data.page > 1 ? `page=${data.page - 1}` : '/'}`)}}>
        Previous
      </span> : null
      }
      {!isServer && data.pages > 2 && ' | '}
      {!isServer && data.nbPages - 1 > data.page ?
          <span
            className="cursorPointer"
            onClick={() =>{window.location.assign(`/?page=${data.page+1}`)}}>
            Next
          </span> :
        null
      }
    </div>
    <hr className="divSplit" />
    {!isServer &&
      <React.Suspense fallback={<div>Loading...</div>}>
        <ChartComponent newsArray={newsData} />
      </React.Suspense>
    }  
    <hr className="divSplit" />
    </div>
  );
}

export default App;

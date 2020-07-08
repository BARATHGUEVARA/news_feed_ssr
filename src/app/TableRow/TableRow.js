import React, {useState} from 'react';

export function TableRow(props) {
  const { rowData: row, id } = props;
  const [votes, setVotesCount] = useState(row.points);
  const author = row && row._highlightResult && row._highlightResult.author && row._highlightResult.author.value;

   // handling hide item click with localStorage
  const hideItem = () => {
    const hideList = localStorage.getItem('hideList');
    if (hideList) {
      localStorage.setItem('hideList', `${hideList},${id.toString()}`);
    } else {
      localStorage.setItem('hideList', `${id.toString()}`);
    }
  }

  // handling vote count click with localStorage  
  const upVoteHandle = () => {
    setVotesCount(votes+1);
    let voteCount = localStorage.getItem('voteCount');
    if (voteCount) {
      voteCount = JSON.parse(voteCount);
    } else {
      voteCount = {};
    }
    voteCount[id] = votes+1;
    localStorage.setItem('voteCount', JSON.stringify(voteCount));
  }
  
  return (
    <tr>
      <td className="commentsRow">{row.num_comments}</td>
      <td className="countRow">{votes}</td>
      <td className="upvoteRow">
      <div className="triangleTop" onClick={() => upVoteHandle() }/>
      </td>
      <td className="newsRow">
        {row.title}
        <span className="subText">
          {` by `}
          <span className="blackFont">
            {author}
          </span>
          <span>
            {` [ `}
              <span className="hideText" onClick={() => hideItem() }>hide</span>
            {` ] `}
          </span>
        </span>
      </td>
    </tr>
  );
}
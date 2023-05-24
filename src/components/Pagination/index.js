import "./index.css";

const Pagination = (props) => {
  const { data_length, getPage, previousPage, nextPage, page } = props;
  const frontStatus = data_length === 0 || page === 0;
  const nPages = parseInt(data_length / 10);
  const remaining = data_length - nPages * 10;
  const rPages = remaining === 0 ? 0 : 1;
  const lastStatus = data_length === 0 || page === nPages + rPages - 1;
  let k = [];
  for (let each = 0; each < nPages + rPages; each++) {
    k.push(each);
  }
  return (
    <div className="page-container">
      <button
        type="button"
        disabled={frontStatus}
        className={
          frontStatus === true ? "first-page" : "first-page navigate-buttons"
        }
        onClick={() => getPage(0)}
      >
        {"<<"}
      </button>
      <button
        type="button"
        disabled={frontStatus}
        className={
          frontStatus === true ? "cm-page" : "cm-page navigate-buttons"
        }
        onClick={previousPage}
      >
        {"<"}
      </button>
      <ul>
        {k.map((each) => (
          <li key={each}>
            <button
              type="button"
              className={page === each ? "active-number-page" : "number-page"}
              onClick={() => getPage(each)}
            >
              {each + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={lastStatus}
        className={
          lastStatus === true ? "cm-page " : "cm-page navigate-buttons"
        }
        onClick={() => nextPage(nPages)}
      >
        {">"}
      </button>
      <button
        type="button"
        disabled={lastStatus}
        className={
          lastStatus === true ? "last-page" : "last-page navigate-buttons"
        }
        onClick={() => getPage(nPages + rPages - 1)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;

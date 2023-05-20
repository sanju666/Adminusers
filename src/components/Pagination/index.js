import "./index.css";

const Pagination = (props) => {
  const { data_length, getPage, previousPage, nextPage } = props;
  const status = data_length === 0;
  const nPages = parseInt(data_length / 10);
  const remaining = data_length - nPages * 10;
  const rPages = remaining === 0 ? 0 : 1;
  let k = [];
  for (let each = 0; each < nPages + rPages; each++) {
    k.push(each);
  }
  return (
    <div className="page-container">
      <button
        type="button"
        disabled={status}
        className="first-page"
        onClick={() => getPage(0)}
      >
        {"<<"}
      </button>
      <button
        type="button"
        disabled={status}
        className="cm-page"
        onClick={previousPage}
      >
        {"<"}
      </button>
      <ul>
        {k.map((each) => (
          <li key={each}>
            <button
              type="button"
              className="number-page"
              onClick={() => getPage(each)}
            >
              {each + 1}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={status}
        className="cm-page"
        onClick={() => nextPage(nPages)}
      >
        {">"}
      </button>
      <button
        type="button"
        disabled={status}
        className="last-page"
        onClick={() => getPage(nPages + rPages - 1)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;

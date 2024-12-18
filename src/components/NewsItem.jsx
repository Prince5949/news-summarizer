import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  const summarise = async (article) => {
    const url =
      "https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer-url";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "c2c48aefdcmshed838b91ca90f63p117b77jsnafb38f7168b1",
        "x-rapidapi-host": "textanalysis-text-summarization.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        url: article,
        sentnum: "5",
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // Join the sentences array with line breaks
      const summary = result.sentences.join("\n\n");
      props.setSummary(summary);
      props.setShowDialog(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-3" style={{ zIndex: "10" }}>
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source} </span>
        </div>
        <img
          src={
            !imageUrl
              ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read Detailed
          </a>
          <button
            rel="noreferrer"
            onClick={() => summarise(newsUrl)}
            target="_blank"
            className="btn btn-sm btn-success mx-2"
          >
            Summarise
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;

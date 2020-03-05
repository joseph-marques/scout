import React from 'react';

function Appointment(props) {
  const formatDate = () => {
    const date = new Date(props.when);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);

    const [month, day, _] = formattedDate.replace(/,/g, '').split(' ');

    return (
      <div className="flex flex-col items-center pr-4 mt-2">
        <span className="font-serif text-4xl font-extrabold -mb-5">{day}</span>
        <span className="font-serif text-xl">{month}</span>
      </div>
    );
  };

  const renderComments = () => {
    const comments = props.comments || [];

    return comments.map(({ comment, author }, i) => {
      return (
        <div key={i} className="flex flex-col py-1 pl-2">
          <span className="text-sm text-black">{comment}</span>
          <span className="text-xs text-gray-700">{`${author.firstName} ${author.lastName}`}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex items-start w-full">
      {formatDate()}
      <div className="py-3 flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex flex-col items-start justify-between pb-3">
            <p className="text-black text-lg font-medium">{`${props.with.firstname} ${props.with.lastname}`}</p>
            <p className="text-md text-gray-700">{props.service.title}</p>
          </div>
          <div>
            {/* TODO */}
            {props.status === 'PAST' && (
              <button
                className="leading-none font-bold tracking-tight text-xs py-1 px-2 text-gray-700
            hover:text-black hover:border-black ml-3"
              >
                Review
              </button>
            )}
          </div>
        </div>
        {renderComments()}
        <form className="flex items-center content-center">
          <input
            className="bg-gray-200 text-sm px-2 rounded-md py-1 flex-auto"
            type="text"
          />
          <button
            type="submit"
            className="leading-none font-bold tracking-tight text-xs py-1 px-2 border-2 rounded-md text-gray-700 border-gray-700
            hover:text-black hover:border-black ml-3"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;

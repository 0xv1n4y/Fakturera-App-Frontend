import React from 'react';

const TermsContent = ({ data }) => {
  const paragraphs = data?.content?.split('\n\n') || [];

  return (
    <div className='w-full py-10 flex flex-col gap-6 justify-center items-center px-4 sm:px-10'>
      <h1 className="text-2xl font-bold text-center">{data?.title}</h1>

      <button className="bg-green-600 text-white font-bold text-md tracking-wide py-3 px-15 rounded-full cursor-pointer">
        {data?.buttontitle}
      </button>

      <div className="w-full max-w-3xl bg-white text-gray-700 rounded-2xl px-6 py-10 text-center shadow-md">
        {paragraphs.map((paragraph, index) => {
          const baseStyle = "mb-4";
          if (paragraph.startsWith("BY clicking Invoice Now"))
            return <p key={index} className={`font-semibold ${baseStyle}`}>{paragraph}</p>;
          if (paragraph.startsWith("You can use the program"))
            return <p key={index} className={`italic ${baseStyle}`}>{paragraph}</p>;
          if (paragraph.startsWith("Click on Invoice Now"))
            return <p key={index} className="font-semibold italic text-center mt-4">{paragraph}</p>;
          if (paragraph.startsWith("Have a great day!"))
            return <p key={index} className="text-right mt-4">{paragraph}</p>;
          return <p key={index} className={baseStyle}>{paragraph}</p>;
        })}
      </div>

      <button className="bg-green-600 text-white font-bold text-md tracking-wide py-3 px-15 rounded-full cursor-pointer">
        Close and Go Back
      </button>
    </div>
  );
};

export default TermsContent;

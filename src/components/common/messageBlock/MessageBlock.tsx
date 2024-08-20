import React from "react";

type MessageBlockProps = {
  message: string;
};

const MessageBlock = ({ message }: MessageBlockProps) => {
  return (
    <section className="mb-36 flex w-full items-center justify-center">
      <span className="max-w-[1055px] text-center text-5xl text-light-900">{message}</span>
    </section>
  );
};

export default MessageBlock;

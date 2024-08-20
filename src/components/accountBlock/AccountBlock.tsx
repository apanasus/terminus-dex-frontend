"use client";

import Image from "next/image";
import React from "react";

type AccountBlockProps = {};

const AccountBlock = (props: AccountBlockProps) => {
  return (
    <section className="flex w-full flex-col">
      <div className=" relative flex w-full items-center justify-start gap-4">
        <Image
          src="/static/images/account/default-avatar.png"
          alt=""
          width={88}
          height={88}
          className="rounded-[20px]"
          onError={(event) => {
            // @ts-ignore
            event.target.id = "/static/images/icons/128/unknown-token-128.png";
            // @ts-ignore
            event.target.srcset = "/static/images/icons/128/unknown-token-128.png";
          }}
        />
        <div className="flex h-[88px] flex-col justify-between">
          <div className="align-top text-[40px] font-bold leading-tight text-light-800">Username</div>
          <div>Socials</div>
        </div>
        <div className="absolute right-0 top-0">Badges</div>
      </div>
    </section>
  );
};

export default AccountBlock;
